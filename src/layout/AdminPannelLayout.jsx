import { Outlet } from "react-router-dom";
import SideBar from "../myComponents/SideBar";

export default function AdminPannelLayout() {
  return (
    <div className="flex gap-4">
      <div className="w-[20%]">
        <SideBar />
      </div>
      <div className="w-[80%]">
        <Outlet />
      </div>
    </div>
  );
}
