type HeaderProps = {
  title: string;
  subtitle?: string;
};

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-[#655046]">
        {title}
      </h1>

      {subtitle && (
        <p className="mt-2 text-[#8A7467]">
          {subtitle}
        </p>
      )}
    </div>
  );
}