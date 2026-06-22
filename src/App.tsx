import { useState } from "react";
import Dashboard from "@/components/Dashboard";
import Sidebar from "@/components/Sidebar";
import clsx from "clsx";

const SECTIONS = ["overview", "revenue", "orders", "users"] as const;
type Section = typeof SECTIONS[number];

export default function App() {
  const [darkMode,      setDarkMode]      = useState(false);
  const [activeSection, setActiveSection] = useState<Section>("overview");

  return (
    <div className={clsx("flex h-screen font-sans antialiased",
      darkMode ? "dark bg-gray-950 text-gray-100" : "bg-gray-50 text-gray-900"
    )}>
      <Sidebar
        sections={SECTIONS as unknown as Section[]}
        active={activeSection}
        onSelect={setActiveSection}
        darkMode={darkMode}
        onToggleDark={() => setDarkMode(d => !d)}
      />
      <main className="flex-1 overflow-y-auto p-6">
        <Dashboard section={activeSection} />
      </main>
    </div>
  );
}
