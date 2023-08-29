import { useForm } from "react-hook-form";

export default function InputField({ placeholder, registerName, label, type }) {
  const { register } = useForm();
  const background = localStorage.getItem("backgroundColor");

  const style = {
    border: `1px solid ${background}`,
    outline: "none",
  };
  return (
    <div>
      <label htmlFor="">{label}</label>
      <input
        type={type}
        style={style}
        className="w-full"
        placeholder={placeholder}
        {...register(registerName)}
      />
    </div>
  );
}
