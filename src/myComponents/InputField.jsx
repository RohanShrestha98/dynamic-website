/* eslint-disable react/prop-types */

export default function InputField({
  placeholder,
  registerName,
  label,
  classes,
  className,
  type,
  register,
}) {
  return (
    <div className={className}>
      <label>{label}</label>
      <input
        type={type}
        className={`w-full  mt-1 px-3 rounded outline-none ${classes}`}
        placeholder={placeholder}
        {...register(registerName)}
      />
    </div>
  );
}
