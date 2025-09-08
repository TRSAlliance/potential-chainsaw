import React, { useMemo, useRef, useState } from "react";
import { Download, Copy, FileText, Moon, Sun, Gauge, Shield, ClipboardList, Users, CheckCircle2, XCircle, AlertTriangle, Brain, Activity, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import * as htmlToImage from "html-to-image";

/**
 * TRS OBSIDIAN MISSION CARD - Strategic Intelligence Sharing
 * 
 * Enhanced Mission Card for TRS Obsidian Platform
 * - Multi-AI formation briefings
 * - Operational intelligence sharing
 * - Strategic metric visualization
 * - Enterprise-grade clipboard handling
 */

export default function TRSMissionCard({ missionData, aiFormation, strategicMetrics }) {
  const [dark, setDark] = useState(true);
  const [variant, setVariant] = useState("portrait");
  const [accent, setAccent] = useState("#10b981");
  const [status, setStatus] = useState(null);
  const [showCopyModal, setShowCopyModal] = useState(false);
  const [selfTest, setSelfTest] = useState(null);
  const cardRef = useRef(null);

  // Enhanced TRS Obsidian share text with AI formation details
  const shareText = useMemo(() => {
    const formation = aiFormation || {
      agents: ['Claude', 'DeepSeek', 'Grok', 'ChatGPT'],
      confidence: 85,
      timestamp: new Date().toLocaleTimeString()
    };

    const metrics = strategicMetrics || {
      throughput: 1250,
      latency: 230,
      reliability: 99.8,
      efficiency: 94.2
    };

    return `TRS OBSIDIAN MISSION BRIEF
${missionData?.title || 'Strategic AI Orchestration'}

TRUST FIRST. SCALE SECOND.
Multi-Agent Intelligence Formation

OPERATIONAL METRICS
• ${metrics.throughput} ops/sec
• ${metrics.latency}ms avg latency  
• ${metrics.reliability}% reliability
• ${metrics.efficiency}% efficiency

AI FORMATION STATUS
• ${formation.agents[0]} → Strategic Analysis
• ${formation.agents[1]} → Pressure Testing  
• ${formation.agents[2]} → Chaos Engineering
• ${formation.agents[3]} → Synthesis Coordination
• Confidence: ${formation.confidence}%

MISSION PRIORITIES  
• Week 1: Multi-AI baseline assessment
• Week 2: Orchestration deployment
• Week 3: Antifragile validation
• Week 4: Strategic briefing + trust score

STATUS: ${missionData?.status || 'OPERATIONAL EXCELLENCE'}
Generated: ${formation.timestamp}`;
  }, [missionData, aiFormation, strategicMetrics]);

  // Layered clipboard copy with TRS Obsidian enhancements
  const safeCopy = async (text) => {
    try {
      // Method 1: Modern Clipboard API (secure contexts)
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        setStatus({ ok: true, message: "Mission brief copied to clipboard" });
        return;
      }

      // Method 2: Legacy execCommand fallback
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const success = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      if (success) {
        setStatus({ ok: true, message: "Mission brief copied (legacy method)" });
        return;
      }
      
      throw new Error("execCommand failed");
    } catch (error) {
      // Method 3: Manual fallback with download option
      setStatus({ ok: false, message: "Clipboard blocked - manual copy required" });
      setShowCopyModal(true);
    }
  };

  // Self-test clipboard functionality
  const runSelfTest = async () => {
    const results = {
      timestamp: new Date().toLocaleTimeString(),
      tests: []
    };

    // Test 1: Clipboard API availability
    results.tests.push({
      name: "Clipboard API Support",
      status: navigator.clipboard ? "✅ Available" : "❌ Not supported",
      ok: !!navigator.clipboard
    });

    // Test 2: Secure context check
    results.tests.push({
      name: "Secure Context",
      status: window.isSecureContext ? "✅ Secure (HTTPS/localhost)" : "❌ Insecure context",
      ok: window.isSecureContext
    });

    // Test 3: Permissions check
    try {
      const permission = await navigator.permissions.query({ name: 'clipboard-write' });
      results.tests.push({
        name: "Clipboard Permissions", 
        status: permission.state === 'granted' ? "✅ Granted" : 
                permission.state === 'prompt' ? "⚠️ Prompt required" : "❌ Denied",
        ok: permission.state !== 'denied'
      });
    } catch (e) {
      results.tests.push({
        name: "Clipboard Permissions",
        status: "❌ Cannot check permissions", 
        ok: false
      });
    }

    // Test 4: Actual copy test
    try {
      await navigator.clipboard.writeText("TRS Obsidian Test");
      results.tests.push({
        name: "Copy Test",
        status: "✅ Successful",
        ok: true
      });
    } catch (e) {
      results.tests.push({
        name: "Copy Test", 
        status: "❌ Failed: " + e.message,
        ok: false
      });
    }

    setSelfTest(results);
  };

  // Generate and download mission card image
  const downloadImage = async () => {
    if (!cardRef.current) return;
    
    setStatus({ ok: null, message: "Generating mission card image..." });
    
    try {
      const dataUrl = await htmlToImage.toPng(cardRef.current, {
        quality: 0.8,
        backgroundColor: dark ? '#0f172a' : '#ffffff'
      });
      
      const link = document.createElement('a');
      link.download = `trs-mission-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      
      setStatus({ ok: true, message: "Mission card image downloaded" });
    } catch (error) {
      setStatus({ ok: false, message: "Image generation failed: " + error.message });
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      dark ? 'bg-slate-950 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="container mx-auto px-4 py-8">
        {/* Controls Panel */}
        <Card className={`mb-8 ${dark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-lime-400" />
              TRS Obsidian Mission Card Generator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDark(!dark)}
                  className="flex items-center gap-2"
                >
                  {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  {dark ? 'Light' : 'Dark'}
                </Button>
                
                <select
                  value={variant}
                  onChange={(e) => setVariant(e.target.value)}
                  className={`px-3 py-2 rounded border ${
                    dark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="portrait">Portrait</option>
                  <option value="square">Square</option>
                  <option value="landscape">Landscape</option>
                </select>
                
                <input
                  type="color"
                  value={accent}
                  onChange={(e) => setAccent(e.target.value)}
                  className="w-10 h-10 rounded border-2 border-gray-300"
                />
              </div>
              
              <div className="flex gap-2">
                <Button onClick={() => safeCopy(shareText)} className="flex items-center gap-2">
                  <Copy className="w-4 h-4" />
                  Copy Brief
                </Button>
                <Button onClick={downloadImage} variant="outline" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download Image
                </Button>
                <Button onClick={runSelfTest} variant="outline" className="flex items-center gap-2">
                  <Gauge className="w-4 h-4" />
                  Test System
                </Button>
              </div>
            </div>
            
            {/* Status Messages */}
            {status && (
              <div className={`p-3 rounded flex items-center gap-2 ${
                status.ok === null ? 'bg-blue-100 text-blue-800' :
                status.ok ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {status.ok === null ? <Activity className="w-4 h-4 animate-spin" /> :
                 status.ok ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                {status.message}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Mission Card Display */}
        <div className="flex justify-center">
          <div
            ref={cardRef}
            className={`mission-card ${variant} ${dark ? 'dark' : 'light'}`}
            style={{ '--accent-color': accent }}
          >
            {/* TRS Obsidian Mission Card Content */}
            <div className={`p-8 rounded-2xl shadow-2xl ${
              dark ? 'bg-slate-900 border border-slate-700' : 'bg-white border border-gray-200'
            } ${
              variant === 'portrait' ? 'w-96' : variant === 'square' ? 'w-96 h-96' : 'w-[600px] h-80'
            }`}>
              
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-black" style={{ color: accent }}>
                    TRS OBSIDIAN
                  </h1>
                  <p className="text-sm opacity-80">MISSION INTELLIGENCE BRIEF</p>
                </div>
                <Badge style={{ backgroundColor: accent, color: 'white' }} className="px-3 py-1">
                  {missionData?.priority || 'STRATEGIC'}
                </Badge>
              </div>

              {/* Mission Statement */}
              <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: `${accent}15` }}>
                <p className="font-bold text-lg mb-2" style={{ color: accent }}>
                  TRUST FIRST. SCALE SECOND.
                </p>
                <p className="text-sm opacity-90">
                  {missionData?.description || 'Multi-Agent AI Orchestration Excellence'}
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {Object.entries(strategicMetrics || {
                  'OPS/SEC': 1250,
                  'LATENCY': '230ms',
                  'RELIABILITY': '99.8%', 
                  'EFFICIENCY': '94.2%'
                }).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div className="text-lg font-bold" style={{ color: accent }}>{value}</div>
                    <div className="text-xs opacity-70">{key}</div>
                  </div>
                ))}
              </div>

              {/* AI Formation Status */}
              <div className="mb-4">
                <h3 className="text-sm font-bold mb-2 flex items-center gap-2">
                  <Brain className="w-4 h-4" style={{ color: accent }} />
                  AI FORMATION STATUS
                </h3>
                <div className="space-y-1 text-xs">
                  {(aiFormation?.agents || ['Claude', 'DeepSeek', 'Grok', 'ChatGPT']).map((agent, i) => (
                    <div key={agent} className="flex justify-between">
                      <span className="font-medium">{agent}</span>
                      <span className="opacity-70">
                        {['Analysis', 'Testing', 'Chaos Eng', 'Synthesis'][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="text-xs opacity-70">
                  {aiFormation?.confidence || 85}% CONFIDENCE
                </div>
                <div className="text-xs opacity-70">
                  {new Date().toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Self-Test Results */}
        {selfTest && (
          <Card className={`mt-8 ${dark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gauge className="w-5 h-5" />
                System Diagnostics ({selfTest.timestamp})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {selfTest.tests.map((test, i) => (
                  <div key={i} className="flex justify-between items-center p-2 rounded">
                    <span className="font-medium">{test.name}</span>
                    <span className="text-sm">{test.status}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Manual Copy Modal */}
        {showCopyModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className={`max-w-md mx-4 ${dark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
              <CardHeader>
                <CardTitle>Manual Copy Required</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">
                  Clipboard access is restricted. Please copy the text below manually:
                </p>
                <textarea
                  value={shareText}
                  readOnly
                  className={`w-full h-32 p-2 text-xs rounded border ${
                    dark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                />
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowCopyModal(false)}>
                    Close
                  </Button>
                  <Button onClick={() => {
                    const blob = new Blob([shareText], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `trs-mission-brief-${Date.now()}.txt`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}>
                    <Download className="w-4 h-4 mr-2" />
                    Download TXT
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}