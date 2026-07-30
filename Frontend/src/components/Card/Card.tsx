import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
};

export function Card({ children }: CardProps) {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        shadow-xl
        p-8
      "
    >
      {children}
    </div>
  );
}