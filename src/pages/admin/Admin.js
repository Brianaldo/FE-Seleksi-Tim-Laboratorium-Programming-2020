import { FaPiggyBank } from "react-icons/fa";

import SideBar from "../../Components/SideBar";

export default function Admin() {
  return (
    <>
      <SideBar />
      <div className="w-screen h-screen pl-16 flex flex-col justify-center items-center">
        <FaPiggyBank className="text-[250px] md:text-[300px] text-center text-tertiary-400" />
        <h1 className="text-primary font-bold text-2xl md:text-3xl m-5 md:m-10">
          ini adalah landing page
        </h1>
      </div>
    </>
  );
}
