interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "danger" | "secondary" | "success";
  disabled?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
  size = "md",
}: ButtonProps) => {
  const baseStyles = "rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary-700 to-primary-900 text-white hover:from-primary-800 hover:to-primary-900 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
    danger: "bg-gradient-to-r from-accent-500 to-accent-600 text-white hover:from-accent-600 hover:to-accent-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 shadow-md hover:shadow-lg",
    success: "bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
