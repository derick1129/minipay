interface InputBoxProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}

export default function InputBox({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
}: InputBoxProps) {
  return (
    <div className="py-2">
      <label className="block mb-2 text-sm font-medium">{label}</label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-black"
      />
    </div>
  );
}
