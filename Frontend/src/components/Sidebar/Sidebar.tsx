import {
  LayoutDashboard,
  Users,
  Calendar,
  MessageCircle,
  Wallet,
  Package,
  BarChart3,
  Settings,
} from "lucide-react";

export function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-[#655046] text-white p-6">
      <h1 className="text-3xl font-bold mb-10">
        Blér One
      </h1>

      <nav className="space-y-5">

        <div className="flex items-center gap-3 cursor-pointer">
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </div>

        <div className="flex items-center gap-3 cursor-pointer">
          <Users size={20} />
          <span>Clientes</span>
        </div>

        <div className="flex items-center gap-3 cursor-pointer">
          <Calendar size={20} />
          <span>Agenda</span>
        </div>

        <div className="flex items-center gap-3 cursor-pointer">
          <MessageCircle size={20} />
          <span>Conversas</span>
        </div>

        <div className="flex items-center gap-3 cursor-pointer">
          <Wallet size={20} />
          <span>Financeiro</span>
        </div>

        <div className="flex items-center gap-3 cursor-pointer">
          <Package size={20} />
          <span>Estoque</span>
        </div>

        <div className="flex items-center gap-3 cursor-pointer">
          <BarChart3 size={20} />
          <span>Relatórios</span>
        </div>

        <div className="flex items-center gap-3 cursor-pointer">
          <Settings size={20} />
          <span>Configurações</span>
        </div>

      </nav>
    </aside>
  );
}