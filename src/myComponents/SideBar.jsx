import { useState } from "react";
import { Link } from "react-router-dom";

export default function SideBar() {
  const [pathname, setPathname] = useState(window.location.pathname);
  const color = localStorage.getItem("textColor");
  const background = localStorage.getItem("backgroundColor");

  const style = {
    color: color ? color : "#ffffff",
    background: background ? background : "#000000",
  };
  const activeStyle = {
    color: background ? background : "#000000",
    background: color ? color : "#ffffff",
  };
  const sidebar = [
    {
      id: 1,
      name: "Dashboard",
      link: "/",
    },
    {
      id: 2,
      name: "Add Products",
      link: "/add-product",
    },
    {
      id: 3,
      name: "Add User",
      link: "/add-user",
    },
    {
      id: 4,
      name: "Login",
      link: "/login",
    },
    {
      id: 10,
      name: "Settings",
      link: "/setting",
    },
  ];

  return (
    <div style={style} className="w-full h-[100vh]">
      {sidebar.map((nav) => {
        return (
          <Link key={nav.id} to={nav.link} className="">
            <p
              className="cursor-pointer border pl-4 py-2 mb-2"
              onClick={() => setPathname(nav.link)}
              style={pathname === nav.link ? activeStyle : {}}
            >
              {nav?.name}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
