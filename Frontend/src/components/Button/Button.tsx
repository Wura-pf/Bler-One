import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary";
};

export function Button({
  children,
  variant = "primary",
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-[#655046] hover:bg-[#4E3D35] text-white",
    secondary:
      "bg-white border border-[#655046] text-[#655046] hover:bg-[#F5F2EE]",
  };

  return (
    <button
      className={`
        ${variants[variant]}
        w-full
        rounded-xl
        px-5
        py-3
        font-semibold
        transition-all
        duration-200
      `}
      {...props}
    >
      {children}
    </button>
  );
}