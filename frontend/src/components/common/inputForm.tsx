import React from "react";

type InputFormProps = {
  label: string;
  id: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const InputForm: React.FC<InputFormProps> = ({
  label,
  id,
  className = "",
  ...inputProps
}) => {
  return (
    <div className="grid w-full items-center gap-1.5">
      <label
        htmlFor={id}
        className="text-white font-medium"
      >
        {label}
      </label>
      <input
        id={id}
        className={`border border-white px-2 py-2 rounded text-black outline-none ${className}`}
        {...inputProps}
      />
    </div>
  );
};
