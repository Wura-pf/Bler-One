import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input(props: InputProps) {
  return (
    <input
      className="
        w-full
        rounded-xl
        border
        border-gray-300
        px-4
        py-3
        outline-none
        transition-all
        duration-200
        focus:border-[#655046]
        focus:ring-2
        focus:ring-[#655046]/20
      "
      {...props}
    />
  );
}