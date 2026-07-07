import Alert from "./Alert";
import FilePreview from "../components/FilePreview";
import Progress from "./Progress";

const UploadForm = () => {
  return (
    <div class="flex flex-col items-center justify-center w-full h-full p-5">
      <div class="flex items-center justify-center w-5/6 h-5/6 mx-auto my-2 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <label
          for="dropzone-file"
          class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500 "
        >
          <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              class="w-8 h-8 mb-4 text-blue-600 dark:text-blue-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span class="font-semibold">Click to upload</span> or{" "}
              <strong class="text-blue-600">drag</strong> and{" "}
              <strong class="text-blue-600">drop</strong>
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input id="dropzone-file" type="file" class="hidden" />
        </label>
      </div>
      <FilePreview />
      <Alert />
      <button
        disabled
        class="w-1/4 p-2 mx-auto my-2 text-white bg-blue-600 rounded-lg dark:bg-blue-500 disabled:opacity-50"
      >
        Upload
      </button>
      <div class="w-3/4 mx-auto my-2">
        <Progress />
      </div>
    </div>
  );
};

export default UploadForm;
