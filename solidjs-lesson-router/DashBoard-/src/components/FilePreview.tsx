import { X } from "lucide-solid";
import { FileImage } from "lucide-solid";

const FilePreview = () => {
  return (
    <div class="flex items-center gap-2 justify-between mt-5  mb-5 border rounded-md p-2 border-blue-400">
      <div class="flex items-center p-2 gap-2">
        <FileImage/>
        <div class="text-left">
          <h2>Black E-Learning.png</h2>
          <h2 class="text-[12px] text-gray-400">1.2MB</h2>
        </div>
      </div>
      <X class="text-red-500 cursor-pointer" />
    </div>
  );
};

export default FilePreview;
