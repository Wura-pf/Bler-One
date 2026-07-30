import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Header, Button, StatCard } from "../../components";
import { MainLayout } from "../../layouts/MainLayout";
import { dashboardService } from "../../services/dashboardService";

type Stat = {
  title: string;
  value: string;
};

export function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState<Stat[]>([]);

  function handleLogout() {
    navigate("/");
  }

  useEffect(() => {
    async function loadStats() {
      const data = await dashboardService.getStats();
      setStats(data);
    }

    loadStats();
  }, []);

  return (
    <MainLayout>
      <div className="flex items-start justify-between mb-8">
        <Header
          title="Bem-vinda ao Blér One 👋"
          subtitle="Seu sistema inteligente para salões."
        />

        <div className="w-32">
          <Button
            variant="secondary"
            onClick={handleLogout}
          >
            Sair
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
          />
        ))}
      </div>
    </MainLayout>
  );
}