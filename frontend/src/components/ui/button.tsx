import React from "react";

type ButtonProps = {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  loading = false,
  children,
  className = "",
  disabled,
  ...props
}) => {
  const baseStyles =
    "rounded font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles =
    variant === "primary"
      ? "bg-primary text-white focus:ring-blue-500"
      : variant === "secondary"
      ? "bg-gray text-primary  focus:ring-gray-400"
      : variant === "danger"
      ? "bg-red-600 text-white focus:ring-red-500"
      : "";

  const sizeStyles =
    size === "sm"
      ? "px-3 py-1 text-base"
      : size === "lg"
      ? "px-3 py-6 text-lg"
      : "px-4 py-2 text-base";

  const combinedClasses =
    `${baseStyles} ${variantStyles} ${sizeStyles} ${className}`.trim();

  return (
    <button
      className={combinedClasses}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export { Button };
