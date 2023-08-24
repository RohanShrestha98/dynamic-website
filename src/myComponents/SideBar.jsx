import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function SideBar() {
  const [color, setColor] = useState("");
  const [background, setBackground] = useState("");

  const localStorageColor = localStorage.getItem("textColor");
  const localStorageBackgroundColor = localStorage.getItem("backgroundColor");

  useEffect(() => {
    const color = localStorage.getItem("textColor");
    const background = localStorage.getItem("backgroundColor");
    setColor(color);
    setBackground(background);
  }, [localStorageColor, localStorageBackgroundColor]);

  const style = {
    background: background,
    color: color,
  };
  const sidebar = [
    {
      id: 1,
      name: "Dashboard",
      link: "/",
    },
    {
      id: 1,
      name: "Add Products",
      link: "/add-product",
    },
    {
      id: 1,
      name: "Settings",
      link: "/setting",
    },
  ];
  return (
    <div style={style} className="w-[20%] h-[100vh]">
      {sidebar.map((nav) => {
        return (
          <Link key={nav.id} to={nav.link}>
            <p className="cursor-pointer">{nav.name}</p>
          </Link>
        );
      })}
    </div>
  );
}
