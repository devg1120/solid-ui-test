import { Component, createSignal, Show } from "solid-js";
import { text } from "@constants/text";
import { API_ENDPOINTS, logger } from "@config/api.config";
import { ApiError, fetchWithTimeout } from "@utils/http";
import Container from "@components/Container";
import Button from "@components/Button";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  image?: string;
  server?: string;
}

interface ApiResponse {
  code: number;
  status: string;
  message: string;
  errors?: FormErrors;
}

const Contact: Component = () => {
  const [formData, setFormData] = createSignal<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = createSignal<FormErrors>({});
  const [submitted, setSubmitted] = createSignal(false);
  const [isSubmitting, setIsSubmitting] = createSignal(false);
  const [successMessage, setSuccessMessage] = createSignal("");

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validate = (): boolean => {
    const data = formData();
    const newErrors: FormErrors = {};

    if (!data.name.trim()) {
      newErrors.name = text.contact.nameError;
    }

    if (!data.email.trim()) {
      newErrors.email = text.contact.emailError;
    } else if (!validateEmail(data.email)) {
      newErrors.email = text.contact.emailInvalid;
    }

    if (!data.message.trim()) {
      newErrors.message = text.contact.messageError;
    } else if (data.message.trim().length < 10) {
      newErrors.message = text.contact.messageMinLength;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const data = formData();

      const response = await fetchWithTimeout(
        `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.CONTACT}`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
          retries: 2,
          retryDelay: 1000,
        },
      );

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new ApiError(
          "Server returned invalid response. Please check if the API is running correctly.",
          response.status,
        );
      }

      const result: ApiResponse = await response.json();

      if (response.ok && result.code === 200) {
        setSuccessMessage(result.message);
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          message: "",
        });

        const fileInput = document.getElementById("image") as HTMLInputElement;
        if (fileInput) fileInput.value = "";

        setTimeout(() => {
          setSubmitted(false);
          setSuccessMessage("");
        }, 5000);
      } else {
        if (result.errors) {
          setErrors(result.errors);
        } else {
          setErrors({
            server:
              result.message || "Failed to send message. Please try again.",
          });
        }
      }
    } catch (err) {
      logger.error("Error submitting contact form:", err);

      if (err instanceof ApiError) {
        setErrors({
          server:
            err.statusCode === 500
              ? "Server error. Please make sure the backend API is running at " +
                API_ENDPOINTS.BASE_URL
              : err.message,
        });
      } else if (err instanceof Error && err.message.includes("JSON")) {
        setErrors({
          server:
            "Invalid response from server. Please check if the API endpoint is correct: " +
            API_ENDPOINTS.CONTACT,
        });
      } else {
        setErrors({
          server: "Failed to send message. Please try again later.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (field: keyof FormData, value: string | File | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors()[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div>
      <section class="py-16 bg-gradient-to-br from-gray-50 via-white to-primary-50/30">
        <Container>
          <div class="max-w-3xl mx-auto text-center">
            <div class="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full mb-4">
              <svg
                class="w-4 h-4 text-primary-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span class="text-xs font-semibold text-primary-600 uppercase tracking-wider">
                Contact Us
              </span>
            </div>
            <h1 class="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              {text.contact.title}
            </h1>
            <p class="text-lg text-gray-500">{text.contact.subtitle}</p>
          </div>
        </Container>
      </section>

      <section class="py-12 bg-white">
        <Container>
          <div class="max-w-2xl mx-auto">
            <Show when={submitted()}>
              <div class="mb-6 p-5 bg-green-50 border border-green-200 rounded-xl">
                <div class="flex items-start gap-3">
                  <svg
                    class="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <h3 class="text-base font-semibold text-green-900 mb-1">
                      Success!
                    </h3>
                    <p class="text-green-700 text-sm">{successMessage()}</p>
                  </div>
                </div>
              </div>
            </Show>

            <Show when={errors().server}>
              <div class="mb-6 p-5 bg-red-50 border border-red-200 rounded-xl">
                <div class="flex items-start gap-3">
                  <svg
                    class="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5"
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
                  <div>
                    <h3 class="text-base font-semibold text-red-900 mb-1">
                      Error
                    </h3>
                    <p class="text-red-700 text-sm">{errors().server}</p>
                  </div>
                </div>
              </div>
            </Show>

            <div class="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">
                {text.contact.formTitle}
              </h2>

              <form onSubmit={handleSubmit} noValidate class="space-y-5">
                <div>
                  <label
                    for="name"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    {text.contact.nameLabel} <span class="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData().name}
                    onInput={(e) => updateField("name", e.currentTarget.value)}
                    class={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors
                      ${errors().name ? "border-red-300 bg-red-50" : "border-gray-300 focus:border-primary-500"}`}
                    placeholder={text.contact.namePlaceholder}
                    disabled={isSubmitting()}
                  />
                  <Show when={errors().name}>
                    <p class="mt-1.5 text-sm text-red-600">{errors().name}</p>
                  </Show>
                </div>

                <div>
                  <label
                    for="email"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    {text.contact.emailLabel}{" "}
                    <span class="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData().email}
                    onInput={(e) => updateField("email", e.currentTarget.value)}
                    class={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors
                      ${errors().email ? "border-red-300 bg-red-50" : "border-gray-300 focus:border-primary-500"}`}
                    placeholder={text.contact.emailPlaceholder}
                    disabled={isSubmitting()}
                  />
                  <Show when={errors().email}>
                    <p class="mt-1.5 text-sm text-red-600">{errors().email}</p>
                  </Show>
                </div>

                <div>
                  <label
                    for="message"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    {text.contact.messageLabel}{" "}
                    <span class="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formData().message}
                    onInput={(e) =>
                      updateField("message", e.currentTarget.value)
                    }
                    class={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors resize-none
                      ${errors().message ? "border-red-300 bg-red-50" : "border-gray-300 focus:border-primary-500"}`}
                    placeholder={text.contact.messagePlaceholder}
                    disabled={isSubmitting()}
                  />
                  <Show when={errors().message}>
                    <p class="mt-1.5 text-sm text-red-600">
                      {errors().message}
                    </p>
                  </Show>
                  <p class="mt-1.5 text-xs text-gray-500">
                    Minimum 10 characters
                  </p>
                </div>

                <div class="pt-2">
                  <Button
                    type="submit"
                    variant="accent"
                    class="w-full !py-3 !text-base !font-semibold"
                    disabled={isSubmitting()}
                  >
                    <Show
                      when={isSubmitting()}
                      fallback={
                        <>
                          {text.contact.submitBtn}
                          <svg
                            class="ml-2 w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </>
                      }
                    >
                      <svg
                        class="animate-spin w-5 h-5"
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
                      <span class="ml-2">{text.contact.submitting}</span>
                    </Show>
                  </Button>
                </div>
              </form>
            </div>

            <div class="grid md:grid-cols-2 gap-5 mt-8">
              <div class="p-5 bg-gray-50 rounded-xl border border-gray-100">
                <div class="flex items-start gap-3">
                  <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
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
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-base font-semibold text-gray-900 mb-1">
                      Response Time
                    </h3>
                    <p class="text-gray-600 text-sm">
                      We typically respond within 24 hours
                    </p>
                  </div>
                </div>
              </div>

              <div class="p-5 bg-gray-50 rounded-xl border border-gray-100">
                <div class="flex items-start gap-3">
                  <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
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
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-base font-semibold text-gray-900 mb-1">
                      Your Privacy
                    </h3>
                    <p class="text-gray-600 text-sm">
                      Information is secure and never shared
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Contact;
