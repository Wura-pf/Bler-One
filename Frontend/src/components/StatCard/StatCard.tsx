import { Card } from "../Card";

type StatCardProps = {
  title: string;
  value: string;
};

export function StatCard({ title, value }: StatCardProps) {
  return (
    <Card>
      <h2 className="text-lg font-semibold text-[#655046]">
        {title}
      </h2>

      <p className="mt-4 text-4xl font-bold text-[#655046]">
        {value}
      </p>
    </Card>
  );
}