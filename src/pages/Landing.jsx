// src/pages/Landing.jsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Rocket, Brain, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl"
      >
        <h1 className="text-5xl font-bold mb-4">
          TRS Learning System
        </h1>

        <p className="text-slate-300 text-lg mb-8">
          Workforce evolution powered by truth, trust, and real-time learning.
        </p>

        <div className="flex justify-center gap-6 mb-8 opacity-80">
          <Rocket className="w-10 h-10 text-lime-400" />
          <Brain className="w-10 h-10 text-blue-400" />
          <Users className="w-10 h-10 text-purple-400" />
        </div>

        <Button 
          className="bg-lime-500 hover:bg-lime-600 text-slate-900 px-6 py-3 text-lg rounded-xl"
          onClick={() => window.location.href = "/app"}
        >
          Enter App
        </Button>
      </motion.div>
    </div>
  );
}
