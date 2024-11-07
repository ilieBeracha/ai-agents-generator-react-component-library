export default function BaseInput({
  label,
  placeholder,
  type,
  name,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-md font-medium text-gray-500 px-0.5"
      >
        {label}
      </label>
      <div className="mt-1">
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="block w-full rounded-lg border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md/6"
        />
      </div>
    </div>
  );
}
