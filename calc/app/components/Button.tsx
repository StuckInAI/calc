import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  type?: 'number' | 'operator' | 'function';
}

const Button: React.FC<ButtonProps> = ({ label, onClick, type = 'number' }) => {
  const baseClasses = "w-full h-16 flex items-center justify-center rounded-lg text-2xl font-semibold transition duration-200";
  let typeClasses = "";
  
  switch (type) {
    case 'number':
      typeClasses = "bg-gray-200 hover:bg-gray-300 text-gray-800";
      break;
    case 'operator':
      typeClasses = "bg-blue-500 hover:bg-blue-600 text-white";
      break;
    case 'function':
      typeClasses = "bg-red-500 hover:bg-red-600 text-white";
      break;
    default:
      typeClasses = "bg-gray-200 hover:bg-gray-300";
  }

  return (
    <button
      className={`${baseClasses} ${typeClasses}`}
      onClick={onClick}
      aria-label={label}
    >
      {label}
    </button>
  );
};

export default Button;