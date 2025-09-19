"use client";
export default function TextInput({
  label,
  name,
  isRequired = true,
  type = "text",
  register,
  errors,
  className = "sm:col-span-2",
  defaultValue = "",
}) {
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="block  text-sm font-medium leading-6 text-gray-900 mb-2"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          type={type}
          {...register(name, { required: isRequired })}
          name={name}
          id={name}
          defaultValue={defaultValue}
          autoComplete={name}
          className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          placeholder={`Type ${label}`}
        />
        {errors[`${name}`] && (
          <span className="text-sm text-red-600">{label} is required</span>
        )}
      </div>
    </div>
  );
}
