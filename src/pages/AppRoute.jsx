import React, { useState } from "react";
import LearningProgressHub from "@/LearningProgressHub.jsx";
import SystemOverview from "@/SystemOverview.jsx";
import ActiveAgents from "@/ActiveAgents.jsx";
import InventoryDashboard from "@/InventoryDashboard.jsx";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function AppRoute() {
  const [view, setView] = useState("overview");

  const renderView = () => {
    switch (view) {
      case "learning": return <LearningProgressHub />;
      case "agents": return <ActiveAgents />;
      case "inventory": return <InventoryDashboard />;
      default: return <SystemOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <nav className="flex gap-4 mb-6">
        <Button onClick={() => setView("overview")}>Overview</Button>
        <Button onClick={() => setView("learning")}>Learning</Button>
        <Button onClick={() => setView("agents")}>Agents</Button>
        <Button onClick={() => setView("inventory")}>Inventory</Button>
      </nav>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {renderView()}
      </motion.div>
    </div>
  );
}
