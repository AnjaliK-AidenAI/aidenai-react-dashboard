import clsx from "clsx";
import { LucideIcon, TrendingDown, TrendingUp } from "lucide-react";

interface Props {
  title:  string;
  value:  string;
  change: number;
  Icon:   LucideIcon;
}

export default function MetricCard({ title, value, change, Icon }: Props) {
  const up = change >= 0;
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 flex gap-4 items-start">
      <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-900/40 text-indigo-500">
        <Icon size={22}/>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{title}</p>
        <p className="text-2xl font-bold mt-0.5">{value}</p>
        <span className={clsx("inline-flex items-center gap-1 text-xs font-medium mt-1",
          up ? "text-emerald-500" : "text-red-400")}>
          {up ? <TrendingUp size={13}/> : <TrendingDown size={13}/>}
          {up ? "+" : ""}{change}% vs last month
        </span>
      </div>
    </div>
  );
}
