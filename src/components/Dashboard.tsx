import { useQuery } from "@tanstack/react-query";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import MetricCard from "./MetricCard";
import { TrendingUp, Users, ShoppingCart, DollarSign, AlertTriangle } from "lucide-react";

const COLORS = ["#6366f1", "#22d3ee", "#f59e0b", "#10b981", "#f43f5e"];

async function fetchMetrics() {
  return {
    kpis: [
      { title: "Total Revenue",   value: "$284,390", change: +12.5, icon: "dollar"   },
      { title: "Active Users",    value: "48,291",   change: +8.2,  icon: "users"    },
      { title: "Total Orders",    value: "12,093",   change: +3.7,  icon: "cart"     },
      { title: "Avg Order Value", value: "$23.50",   change: -1.1,  icon: "trending" },
    ],
    monthly: [
      { month: "Jan", revenue: 42000, orders: 1200 },
      { month: "Feb", revenue: 38000, orders:  980 },
      { month: "Mar", revenue: 55000, orders: 1450 },
      { month: "Apr", revenue: 61000, orders: 1800 },
      { month: "May", revenue: 48000, orders: 1300 },
      { month: "Jun", revenue: 72000, orders: 2100 },
      { month: "Jul", revenue: 81000, orders: 2380 },
    ],
    categories: [
      { name: "Electronics", value: 42 },
      { name: "Clothing",    value: 28 },
      { name: "Food",        value: 18 },
      { name: "Books",       value: 12 },
    ],
  };
}

const ICON_MAP = { dollar: DollarSign, users: Users, cart: ShoppingCart, trending: TrendingUp };

export default function Dashboard({ section }: { section: string }) {
  const { data, isLoading, isError } = useQuery({ queryKey: ["metrics"], queryFn: fetchMetrics });

  if (isLoading) return <div className="flex items-center justify-center h-64 text-gray-400">Loading...</div>;
  if (isError)   return <div className="flex items-center gap-2 text-red-500 p-4"><AlertTriangle size={18}/> Failed to load metrics</div>;
  if (!data)     return null;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold capitalize">{section}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {data.kpis.map(k => (
          <MetricCard
            key={k.title}
            title={k.title}
            value={k.value}
            change={k.change}
            Icon={ICON_MAP[k.icon as keyof typeof ICON_MAP]}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="font-semibold mb-4">Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={data.monthly}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb"/>
              <XAxis dataKey="month" tick={{ fontSize: 12 }}/>
              <YAxis tick={{ fontSize: 12 }} tickFormatter={v => `$${(v/1000).toFixed(0)}k`}/>
              <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, "Revenue"]}/>
              <Area type="monotone" dataKey="revenue" stroke="#6366f1" fill="url(#revGrad)" strokeWidth={2}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="font-semibold mb-4">Sales by Category</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={data.categories} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                {data.categories.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]}/>)}
              </Pie>
              <Legend/>
              <Tooltip/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="font-semibold mb-4">Monthly Orders</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data.monthly}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb"/>
            <XAxis dataKey="month" tick={{ fontSize: 12 }}/>
            <YAxis tick={{ fontSize: 12 }}/>
            <Tooltip/>
            <Bar dataKey="orders" fill="#22d3ee" radius={[4,4,0,0]}/>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
