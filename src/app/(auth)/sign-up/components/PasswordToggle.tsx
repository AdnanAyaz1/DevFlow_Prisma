import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { useState } from "react";

interface PasswordToggleProps {
  togglePasswordType: (fieldName: string) => void;
  fieldName: string;
}

const PasswordToggle = ({
  togglePasswordType,
  fieldName,
}: PasswordToggleProps) => {
  const [showIcon, setShowIcon] = useState(false);
  const handleClick = () => {
    setShowIcon(!showIcon);
    togglePasswordType(fieldName);
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
    >
      {showIcon ? (
        <EyeIcon className="size-5" />
      ) : (
        <EyeClosedIcon className="size-5" />
      )}
    </button>
  );
};

export default PasswordToggle;
