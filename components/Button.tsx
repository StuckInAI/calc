interface ButtonProps {
  label: string
  onClick: () => void
  className?: string
  ariaLabel?: string
}

export default function Button({ label, onClick, className = '', ariaLabel }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        ${className}
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
      `}
      aria-label={ariaLabel || label}
    >
      {label}
    </button>
  )
}