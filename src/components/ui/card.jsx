import React from "react";

export function Card({ className = "", ...props }) {
  return (
    <div
      className={`bg-slate-900 border border-slate-800 shadow-xl transition-all duration-200 hover:border-slate-700 rounded ${className}`}
      {...props}
    />
  );
}

export function CardHeader({ className = "", ...props }) {
  return <div className={`p-6 flex flex-col space-y-1.5 ${className}`} {...props} />;
}

export function CardTitle({ className = "", ...props }) {
  return <h3 className={`font-black tracking-wide leading-none ${className}`} {...props} />;
}

export function CardDescription({ className = "", ...props }) {
  return <p className={`text-slate-400 text-sm ${className}`} {...props} />;
}

export function CardContent({ className = "", ...props }) {
  return <div className={`p-6 pt-0 ${className}`} {...props} />;
}