import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toPng } from "html-to-image";
import { Image, FileCode, Share2, LayoutGrid, Zap, X, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import MermaidEditor from "@/components/MermaidEditor";
import DiagramPreview from "@/components/DiagramPreview";
import TemplateGallery from "@/components/TemplateGallery";
import { useTheme } from "@/hooks/use-theme";
import { toast } from "sonner";

const DEFAULT_CODE = `graph TD
    A[Start Project] --> B{Choose Tool}
    B -->|Free| C[QuickDiagram]
    C --> D[Export PNG]
    C --> E[Export SVG]
    B -->|Paid| F[Other Tools]
    D --> G[Ship It!]
    E --> G`;

const Index = () => {
  const [code, setCode] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const shared = params.get("code");
    return shared ? decodeURIComponent(shared) : DEFAULT_CODE;
  });
  const [showTemplates, setShowTemplates] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();

  const downloadPNG = useCallback(async () => {
    if (!previewRef.current) return;
    try {
      const url = await toPng(previewRef.current, {
        backgroundColor: "#16181d",
        pixelRatio: 2,
      });
      const a = document.createElement("a");
      a.href = url;
      a.download = "diagram.png";
      a.click();
      toast.success("PNG downloaded!");
    } catch {
      toast.error("Failed to export PNG");
    }
  }, []);

  const downloadSVG = useCallback(() => {
    const svg = previewRef.current?.querySelector("svg");
    if (!svg) return toast.error("No diagram to export");
    const blob = new Blob([svg.outerHTML], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "diagram.svg";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("SVG downloaded!");
  }, []);

  const shareLink = useCallback(() => {
    const encoded = encodeURIComponent(code);
    const url = `${window.location.origin}?code=${encoded}`;
    navigator.clipboard.writeText(url);
    toast.success("Share link copied!");
  }, [code]);

  return (
    <div className="min-h-screen grid-bg">
      {/* Ambient glow */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-6 flex flex-col gap-5 min-h-screen">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-4 justify-between items-center"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">QuickDiagram</h1>
              <p className="text-xs text-muted-foreground">Mermaid to PNG & SVG — instantly</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="gap-1.5"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowTemplates(!showTemplates)}
              className="gap-1.5"
            >
              <LayoutGrid className="w-4 h-4" />
              Templates
            </Button>
            <Button variant="glow" size="sm" onClick={downloadPNG} className="gap-1.5">
              <Image className="w-4 h-4" />
              PNG
            </Button>
            <Button variant="outline" size="sm" onClick={downloadSVG} className="gap-1.5">
              <FileCode className="w-4 h-4" />
              SVG
            </Button>
            <Button variant="ghost" size="sm" onClick={shareLink} className="gap-1.5">
              <Share2 className="w-4 h-4" />
              Share
            </Button>
          </div>
        </motion.header>

        {/* Templates */}
        <AnimatePresence>
          {showTemplates && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="glass p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-foreground">Quick Start Templates</h3>
                  <button onClick={() => setShowTemplates(false)} className="text-muted-foreground hover:text-foreground">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <TemplateGallery
                  onSelect={(c) => {
                    setCode(c);
                    setShowTemplates(false);
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Editor + Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-0"
        >
          <div className="glass overflow-hidden flex flex-col min-h-[400px] lg:min-h-0">
            <MermaidEditor value={code} onChange={setCode} />
          </div>
          <div className="glass overflow-hidden flex flex-col min-h-[400px] lg:min-h-0">
            <DiagramPreview code={code} containerRef={previewRef} theme={theme} />
          </div>
        </motion.div>

        {/* Footer */}
        <footer className="text-center py-3">
          <p className="text-xs text-muted-foreground">
            Free & open — no login required — built for developers
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
