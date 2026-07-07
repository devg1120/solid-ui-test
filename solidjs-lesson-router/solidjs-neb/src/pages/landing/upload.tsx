import { Component, createSignal, Show, For } from "solid-js";
import { text } from "@constants/text";
import { API_ENDPOINTS, logger } from "@config/api.config";
import { ApiError } from "@utils/http";
import Container from "@components/Container";
import Button from "@components/Button";

interface HeaderData {
  name: string;
  value: string;
}

interface UploadResponse {
  code: number;
  status: string;
  message: string;
  data?: HeaderData[];
}

const Upload: Component = () => {
  const [fileName, setFileName] = createSignal("");
  const [selectedFile, setSelectedFile] = createSignal<File | null>(null);
  const [isDragging, setIsDragging] = createSignal(false);
  const [isLoading, setIsLoading] = createSignal(false);
  const [error, setError] = createSignal("");
  const [success, setSuccess] = createSignal<UploadResponse["data"] | null>(
    null,
  );

  const [errors, setErrors] = createSignal({
    fileName: "",
    file: "",
  });

  /**
   * Simple XOR encryption for web token
   * This matches the backend's decryptAuthVerify function
   */
  const generateWebToken = (): string => {
    const salt = import.meta.env.VITE_AUTH_SALT || "default-salt-key";
    const data = "WhatIsThisEvenDoingHereJustGoAway";

    const generateEncryptionKey = (salt: string): string => {
      let key = salt;
      while (key.length < 32) {
        key += salt;
      }
      return key.substring(0, 32);
    };

    const key = generateEncryptionKey(salt);

    let ciphertext = "";
    for (let i = 0; i < data.length; i++) {
      const charCode = data.charCodeAt(i);
      const keyCharCode = key.charCodeAt(i % key.length);
      const encryptedCharCode = (charCode ^ keyCharCode) + (i % 15);
      ciphertext += String.fromCharCode(encryptedCharCode);
    }

    const keyHash = btoa(
      Array.from(new TextEncoder().encode(key)).reduce(
        (acc, byte) => acc + byte,
        "",
      ),
    );
    return btoa(salt + ":" + keyHash.substring(0, 12) + ":" + ciphertext);
  };

  const validateForm = (): boolean => {
    const newErrors = {
      fileName: "",
      file: "",
    };

    if (!fileName().trim()) {
      newErrors.fileName = text.upload.fileNameError;
    }

    if (!selectedFile()) {
      newErrors.file = text.upload.fileError;
    } else if (!selectedFile()?.name.endsWith(".seb")) {
      newErrors.file = text.upload.fileTypeError;
    }

    setErrors(newErrors);
    return !newErrors.fileName && !newErrors.file;
  };

  const handleFileSelect = (file: File | null) => {
    if (file) {
      if (file.name.endsWith(".seb")) {
        setSelectedFile(file);
        setErrors((prev) => ({ ...prev, file: "" }));
      } else {
        setErrors((prev) => ({ ...prev, file: text.upload.fileTypeError }));
      }
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer?.files[0] || null;
    handleFileSelect(file);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setError("");
    setSuccess(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile()!);
      formData.append("file_name", fileName());

      const response = await fetch(
        `${API_ENDPOINTS.BASE_URL}/service/safe-exam-bypasser`,
        {
          method: "POST",
          headers: {
            "X-Web-Token": generateWebToken(),
          },
          body: formData,
        },
      );

      const result: UploadResponse = await response.json();

      if (result.code === 200 && result.data) {
        setSuccess(result.data);
      } else {
        setError(result.message || "An error occurred");
      }
    } catch (err) {
      logger.error("Upload error:", err);
      if (err instanceof ApiError) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Network error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Copy text to clipboard
   */
  const handleCopyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }
  };

  /**
   * Download result as JSON file with ModHeader format
   */
  const handleDownloadJson = () => {
    const data = success();
    if (!data) return;

    const formattedJsonData: {
      shortTitle: string;
      title: string;
      version: number;
      headers: Array<{
        enabled: boolean;
        name: string;
        value: string;
        appendMode?: boolean;
      }>;
    } = {
      shortTitle: "",
      title: "",
      version: 2,
      headers: [],
    };

    let downloadFileName = "result";

    data.forEach((item) => {
      const name = item.name.toLowerCase();

      if (name === "file-name") {
        downloadFileName = item.value;
        formattedJsonData.title = item.value;
        formattedJsonData.shortTitle = item.value.charAt(0).toUpperCase();
      } else {
        formattedJsonData.headers.push({
          enabled: false,
          name: item.name,
          value: item.value,
          ...(name !== "user-agent" && { appendMode: false }),
        });
      }
    });

    const blob = new Blob([JSON.stringify(formattedJsonData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = downloadFileName + ".json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setFileName("");
    setSelectedFile(null);
    setSuccess(null);
    setError("");
    setErrors({ fileName: "", file: "" });
  };

  return (
    <div class="min-h-screen py-20">
      <Container>
        <div class="max-w-xl mx-auto">
          <div class="text-center mb-10">
            <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              {text.upload.title}
            </h1>
            <div class="w-16 h-1 bg-primary-500 mx-auto rounded-full mb-4" />
            <p class="text-gray-500">{text.upload.subtitle}</p>
          </div>

          <Show when={success()}>
            <div class="card-base p-8">
              <div class="text-center mb-6">
                <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    class="w-8 h-8 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 class="text-2xl font-bold text-gray-900 mb-2">
                  {text.upload.successTitle}
                </h2>
                <p class="text-gray-500">{text.upload.successMessage}</p>
              </div>

              <div class="space-y-3 mb-6">
                <For each={success()}>
                  {(header) => (
                    <div class="bg-gray-50 rounded-xl p-4">
                      <div class="flex items-start justify-between gap-3">
                        <div class="flex-1 min-w-0">
                          <label class="block text-xs font-semibold text-primary-600 uppercase tracking-wider mb-1">
                            {header.name}
                          </label>
                          <p class="text-gray-900 text-sm break-all">
                            {header.value}
                          </p>
                        </div>
                        <button
                          onClick={() => handleCopyToClipboard(header.value)}
                          class="flex-shrink-0 p-2 text-gray-400 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-colors"
                          title="Copy to clipboard"
                        >
                          <svg
                            class="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </For>
              </div>

              <div class="space-y-3">
                <Button
                  onClick={handleDownloadJson}
                  variant="accent"
                  class="w-full !py-4"
                >
                  <svg
                    class="w-5 h-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  {text.upload.downloadBtn || "Download JSON for ModHeader"}
                </Button>
                <Button onClick={handleReset} variant="outline" class="w-full">
                  {text.upload.backBtn}
                </Button>
              </div>
            </div>
          </Show>

          {/* Upload Form */}
          <Show when={!success()}>
            <form onSubmit={handleSubmit} class="card-base p-8">
              {/* Error Alert */}
              <Show when={error()}>
                <div class="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <div class="flex items-center gap-3">
                    <svg
                      class="w-5 h-5 text-red-500 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p class="text-red-700 text-sm">{error()}</p>
                  </div>
                </div>
              </Show>

              <div class="mb-5">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  {text.upload.fileNameLabel}
                </label>
                <input
                  type="text"
                  value={fileName()}
                  onInput={(e) => {
                    setFileName(e.currentTarget.value);
                    setErrors((prev) => ({ ...prev, fileName: "" }));
                  }}
                  placeholder={text.upload.fileNamePlaceholder}
                  class={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                    errors().fileName
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200 bg-white"
                  }`}
                />
                <Show when={errors().fileName}>
                  <p class="mt-1.5 text-sm text-red-500">{errors().fileName}</p>
                </Show>
              </div>

              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  {text.upload.fileLabel}
                </label>
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  class={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
                    isDragging()
                      ? "border-primary-500 bg-primary-50"
                      : errors().file
                        ? "border-red-300 bg-red-50"
                        : "border-gray-200 bg-gray-50 hover:border-primary-300 hover:bg-primary-50/50"
                  }`}
                >
                  <input
                    type="file"
                    accept=".seb"
                    onChange={(e) =>
                      handleFileSelect(e.currentTarget.files?.[0] || null)
                    }
                    class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />

                  <Show when={!selectedFile()}>
                    <div class="space-y-3">
                      <div class="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto">
                        <svg
                          class="w-6 h-6 text-primary-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                          />
                        </svg>
                      </div>
                      <div>
                        <p class="text-gray-700 font-medium">
                          {text.upload.dragDropText}
                        </p>
                        <p class="text-gray-500 text-sm mt-1">
                          {text.upload.orText}
                        </p>
                      </div>
                      <span class="inline-block px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700">
                        {text.upload.chooseFile}
                      </span>
                      <div class="text-xs text-gray-400 space-y-1">
                        <p>{text.upload.supportedFormat}</p>
                        <p>{text.upload.maxFileSize}</p>
                      </div>
                    </div>
                  </Show>

                  <Show when={selectedFile()}>
                    <div class="flex items-center justify-center gap-3">
                      <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                        <svg
                          class="w-5 h-5 text-primary-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <div class="text-left">
                        <p class="text-gray-900 font-medium">
                          {selectedFile()?.name}
                        </p>
                        <p class="text-gray-500 text-sm">
                          {((selectedFile()?.size || 0) / 1024).toFixed(2)} KB
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFile(null);
                        }}
                        class="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <svg
                          class="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </Show>
                </div>
                <Show when={errors().file}>
                  <p class="mt-1.5 text-sm text-red-500">{errors().file}</p>
                </Show>
              </div>

              <Button
                type="submit"
                variant="accent"
                disabled={isLoading()}
                class="w-full !py-4"
              >
                <Show
                  when={isLoading()}
                  fallback={
                    <>
                      <svg
                        class="w-5 h-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                        />
                      </svg>
                      {text.upload.submitBtn}
                    </>
                  }
                >
                  <svg
                    class="animate-spin w-5 h-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    />
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  {text.upload.submitting}
                </Show>
              </Button>
            </form>
          </Show>
        </div>
      </Container>
    </div>
  );
};

export default Upload;
