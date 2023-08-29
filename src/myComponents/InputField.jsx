/* eslint-disable react/prop-types */

export default function InputField({
  placeholder,
  registerName,
  label,
  type,
  register,
}) {
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
