import clsx from "clsx";
import { LayoutDashboard, TrendingUp, ShoppingCart, Users, Moon, Sun } from "lucide-react";

const ICON_MAP: Record<string, any> = {
  overview: LayoutDashboard,
  revenue:  TrendingUp,
  orders:   ShoppingCart,
  users:    Users,
};

interface Props {
  sections:     string[];
  active:       string;
  onSelect:     (s: any) => void;
  darkMode:     boolean;
  onToggleDark: () => void;
}

export default function Sidebar({ sections, active, onSelect, darkMode, onToggleDark }: Props) {
  return (
    <aside className="w-56 shrink-0 flex flex-col border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 py-6 px-3 gap-1">
      <div className="px-3 mb-4">
        <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">AidenAI</span>
        <p className="text-xs text-gray-400 mt-0.5">Analytics Platform</p>
      </div>
      {sections.map(s => {
        const Icon = ICON_MAP[s] ?? LayoutDashboard;
        return (
          <button
            key={s}
            onClick={() => onSelect(s)}
            className={clsx(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              active === s
                ? "bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            )}
          >
            <Icon size={16}/>{s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        );
      })}
      <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
        <button onClick={onToggleDark}
          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-200">
          {darkMode ? <Sun size={15}/> : <Moon size={15}/>}
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </aside>
  );
}
