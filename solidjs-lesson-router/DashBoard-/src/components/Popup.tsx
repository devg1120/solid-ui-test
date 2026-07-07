import { Portal } from "solid-js/web";
import { X } from "lucide-solid";

const Popup = () => {
  return (
    <Portal>
      <div class="absolute top-0 left-0 h-screen w-screen flex items-center justify-center bg-[rgba(0,0,0,0.2)]">
        <div class="bg-gray-900 p-10 rounded-lg w-[500px]">
          <div class="flex justify-between mb-5 w-full text-white">
            <h2 class="text-3xl font-bold">Here Upload Your File</h2>
            <button class="float-right">
              <X />
            </button>
          </div>

          <label
            for="helper-text"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Title
          </label>
          <input
            type="text"
            id="helper-text"
            aria-describedby="helper-text-explanation"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Your Title"
          />

          <label
            class="block my-2 text-sm font-medium text-gray-900 dark:text-white"
            for="file_input"
          >
            Upload file
          </label>
          <input
            class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="file_input_help"
            id="file_input"
            type="file"
          />
          <p
            class="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="file_input_help"
          >
            SVG, PNG, JPG or GIF (MAX. 800x400px).
          </p>

          <button class="mt-5 bg-blue-500 text-white px-5 py-2 rounded-lg">
            Upload
          </button>
        </div>
      </div>
    </Portal>
  );
};

export default Popup;
