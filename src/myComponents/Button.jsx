export default function Button({ title }) {
  const color = localStorage.getItem("textColor");
  const background = localStorage.getItem("backgroundColor");

  const style = {
    background: background ? background : "#000000",
    color: color ? color : "#ffffff",
    border: `1px solid ${background}`,
  };
  return (
    <button style={style} className="w-full rounded">
      {title}
    </button>
  );
}
