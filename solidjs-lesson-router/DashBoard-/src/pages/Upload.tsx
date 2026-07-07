import SideNav from "../components/SideNav";
import UploadForm from "../components/UploadForm";

const Upload = () => {
  return (
    <div class="bg-gray-900 w-screen h-screen">
      <SideNav>
        <div class="flex flex-col justify-center items-center mt-10">
          <div>
            {" "}
            <div class="p-5 px-8 md:px-28">
              <h2 class="text-[20px] text-center m-5">
                Start <strong class="text-blue-600">Uploading</strong>
                {"  "}
                File and <strong class="text-blue-600">Share</strong> it
              </h2>
            </div>
          </div>
          <UploadForm />
        </div>
      </SideNav>
    </div>
  );
};

export default Upload;
