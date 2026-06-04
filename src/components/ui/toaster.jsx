import React from 'react';
import { Toaster as SonnerToaster } from 'sonner';

export function Toaster({ ...props }) {
  return (
    <SonnerToaster
      position="top-right"
      theme="dark"
      className="toaster group font-mono"
      toastOptions={{
        classNames: {
          toast: "group toast bg-slate-900 text-slate-100 border border-slate-800 shadow-2xl rounded",
          description: "text-slate-400 text-xs",
          actionButton: "bg-cyan-500 text-slate-950 text-xs font-bold",
          cancelButton: "bg-slate-800 text-slate-400 text-xs"
        }
      }}
      {...props}
    />
  );
}

export default Toaster;