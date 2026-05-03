import { Link } from "react-router-dom";

interface BottomWarningProps {
  label: string;
  buttonText: string;
  to: string;
}

export default function BottomWarning({
  label,
  buttonText,
  to,
}: BottomWarningProps) {
  return (
    <div className="text-sm text-center mt-4">
      {label}{" "}
      <Link className="underline font-medium" to={to}>
        {buttonText}
      </Link>
    </div>
  );
}
