import { Outlet } from "react-router-dom";
import SideBar from "../myComponents/SideBar";

export default function AdminPannelLayout() {
  return (
    <div className="flex gap-4">
      <SideBar />
      <Outlet />
    </div>
  );
}
