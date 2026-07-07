import SideNav from "../components/SideNav";
import SubHeader from "./SubHeader";
import Popup from "../components/Popup";
import Cards from "../components/Cards";

const Favorites = () => {
  return (
    <div class="bg-gray-900 w-screen min-h-screen">
      <SideNav>
        <SubHeader />
        {/* <Popup /> */}
        <div class="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 place-items-center">
          <Cards />
          <Cards />
          <Cards />
          <Cards />
          <Cards />
          <Cards />
        </div>
      </SideNav>
    </div>
  );
};

export default Favorites;
