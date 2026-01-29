interface InputProps {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
}

const Input = ({
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  label,
  required = false,
  disabled = false,
}: InputProps) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block mb-2 text-sm font-semibold text-gray-700">
          {label} {required && <span className="text-accent-600">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`w-full p-3 border-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent-500 ${
          error ? "border-accent-500" : "border-gray-300 focus:border-accent-500"
        } ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
        aria-label={label || placeholder}
        aria-invalid={!!error}
      />
      {error && <p className="text-accent-600 text-sm mt-1.5 flex items-center gap-1">{error}</p>}
    </div>
  );
};

export default Input;
