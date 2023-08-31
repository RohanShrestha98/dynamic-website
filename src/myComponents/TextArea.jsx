/* eslint-disable react/prop-types */

export default function TextArea({
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
      <textarea
        type={type}
        className={`w-full mt-1 px-3 py-2 rounded outline-none ${classes}`}
        placeholder={placeholder}
        {...register(registerName)}
      />
    </div>
  );
}
