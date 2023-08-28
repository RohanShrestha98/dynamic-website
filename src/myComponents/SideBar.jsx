import { Link } from "react-router-dom";

export default function SideBar() {
  const color = localStorage.getItem("textColor");
  const background = localStorage.getItem("backgroundColor");

  const style = {
    background: background ? background : "#000000",
    color: color ? color : "#ffffff",
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
      name: "Settings",
      link: "/setting",
    },
  ];
  return (
    <div style={style} className="w-[20%] h-[100vh]">
      {sidebar.map((nav) => {
        return (
          <Link key={nav.id} to={nav.link}>
            <p className="cursor-pointer">{nav?.name}</p>
          </Link>
        );
      })}
    </div>
  );
}
