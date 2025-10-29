// src/pages/AppDashboard.jsx
import { Link } from "react-router-dom";
import { BookOpen, Newspaper, Brain, Rocket } from "lucide-react";

export default function AppDashboard() {
  return (
    <div className="min-h-screen bg-slate-900 text-white px-6 py-16">
      
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6">

        <Link to="/learning" className="p-6 bg-slate-800 rounded-xl hover:bg-slate-700 transition">
          <BookOpen className="w-10 h-10 text-lime-400 mb-3" />
          <h3 className="text-xl font-bold">Learning Hub</h3>
          <p className="text-slate-400 text-sm">Progress, skills, modules.</p>
        </Link>

        <Link to="/news" className="p-6 bg-slate-800 rounded-xl hover:bg-slate-700 transition">
          <Newspaper className="w-10 h-10 text-blue-400 mb-3" />
          <h3 className="text-xl font-bold">News & World</h3>
          <p className="text-slate-400 text-sm">Global/local verified stories.</p>
        </Link>

        <Link to="/ai" className="p-6 bg-slate-800 rounded-xl hover:bg-slate-700 transition">
          <Brain className="w-10 h-10 text-purple-400 mb-3" />
          <h3 className="text-xl font-bold">AI Command Hub</h3>
          <p className="text-slate-400 text-sm">Agents, workflows, metrics.</p>
        </Link>

        <Link to="/systems" className="p-6 bg-slate-800 rounded-xl hover:bg-slate-700 transition">
          <Rocket className="w-10 h-10 text-orange-400 mb-3" />
          <h3 className="text-xl font-bold">System Panels</h3>
          <p className="text-slate-400 text-sm">Security, command, integrations.</p>
        </Link>

      </div>
    </div>
  );
}
