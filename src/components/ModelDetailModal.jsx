import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { X, Cpu, Thermometer, Brain } from "lucide-react";

export default function ModelDetailModal({ model, isOpen, onClose }) {
  if (!model) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl bg-slate-900 border-slate-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl text-slate-100">{model.name}</DialogTitle>
          <DialogDescription className="text-slate-400">{model.description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="flex flex-wrap gap-2">
            {model.capabilities?.map(cap => <Badge key={cap} variant="secondary" className="bg-slate-700 text-slate-300">{cap}</Badge>)}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><p className="text-slate-400">Provider</p><p className="font-semibold text-slate-100">{model.provider}</p></div>
            <div><p className="text-slate-400">Version</p><p className="font-semibold text-slate-100">{model.version}</p></div>
            <div><p className="text-slate-400">Type</p><p className="font-semibold text-slate-100">{model.type}</p></div>
            <div><p className="text-slate-400">Status</p><p className="font-semibold text-slate-100">{model.status}</p></div>
          </div>
          <h4 className="font-semibold text-slate-200 border-t border-slate-700 pt-4">Parameters</h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center gap-2"><Cpu className="w-4 h-4 text-cyan-400" /><span className="text-slate-400">Context:</span><span className="text-slate-100">{model.parameters?.context_window}</span></div>
            <div className="flex items-center gap-2"><Thermometer className="w-4 h-4 text-cyan-400" /><span className="text-slate-400">Temp:</span><span className="text-slate-100">{model.parameters?.temperature}</span></div>
            <div className="flex items-center gap-2"><Brain className="w-4 h-4 text-cyan-400" /><span className="text-slate-400">Max Tokens:</span><span className="text-slate-100">{model.parameters?.max_tokens}</span></div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
