interface ButtonProps {
  label: string;
  onClick: () => void;
  colSpan?: number;
  isOperator?: boolean;
  isFunction?: boolean;
  isEquals?: boolean;
  isZero?: boolean;
}

export default function Button({
  label,
  onClick,
  colSpan = 1,
  isOperator = false,
  isFunction = false,
  isEquals = false,
  isZero = false,
}: ButtonProps) {
  const baseClasses = "h-16 rounded-lg font-medium text-lg transition-all duration-200 active:scale-95 flex items-center justify-center";
  
  let colorClasses = "";
  if (isFunction) {
    colorClasses = "bg-gray-100 hover:bg-gray-200 text-gray-800 active:bg-gray-300";
  } else if (isOperator) {
    colorClasses = "bg-blue-500 hover:bg-blue-600 text-white active:bg-blue-700";
  } else if (isEquals) {
    colorClasses = "bg-green-500 hover:bg-green-600 text-white active:bg-green-700";
  } else {
    colorClasses = "bg-gray-50 hover:bg-gray-100 text-gray-800 active:bg-gray-200";
  }
  
  const colSpanClass = colSpan === 2 ? "col-span-2" : "";
  
  return (
    <button
      className={`${baseClasses} ${colorClasses} ${colSpanClass}`}
      onClick={onClick}
      aria-label={label === '×' ? 'multiply' : label === '÷' ? 'divide' : label}
    >
      {label}
    </button>
  );
}
