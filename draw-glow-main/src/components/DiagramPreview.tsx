import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { AlertTriangle } from "lucide-react";

interface DiagramPreviewProps {
  code: string;
  containerRef?: React.RefObject<HTMLDivElement>;
  theme?: "light" | "dark";
}

const DiagramPreview = ({ code, containerRef, theme = "dark" }: DiagramPreviewProps) => {
  const outputRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: theme === "dark" ? "dark" : "default",
      themeVariables: theme === "dark"
        ? {
            darkMode: true,
            background: "#16181d",
            primaryColor: "#22d3a0",
            primaryTextColor: "#e8ecf2",
            primaryBorderColor: "#2a2e38",
            lineColor: "#8b5cf6",
            secondaryColor: "#1e2028",
            tertiaryColor: "#1e2028",
          }
        : {
            darkMode: false,
            background: "#fafbfd",
            primaryColor: "#10b981",
            primaryTextColor: "#1a1c23",
            primaryBorderColor: "#d1d5db",
            lineColor: "#7c3aed",
            secondaryColor: "#f1f5f9",
            tertiaryColor: "#f1f5f9",
          },
      fontFamily: "Space Grotesk, sans-serif",
    });
  }, [theme]);

  useEffect(() => {
    const render = async () => {
      if (!outputRef.current || !code.trim()) {
        setError(null);
        if (outputRef.current) outputRef.current.innerHTML = "";
        return;
      }

      try {
        const id = "mermaid-" + Date.now();
        const { svg } = await mermaid.render(id, code);
        if (outputRef.current) {
          outputRef.current.innerHTML = svg;
          setError(null);
        }
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : "Invalid syntax";
        setError(msg);
        if (outputRef.current) outputRef.current.innerHTML = "";
      } finally {
        document.querySelectorAll('[id^="dmermaid-"]').forEach(el => el.remove());
        document.querySelectorAll('.error-icon').forEach(el => el.remove());
      }
    };

    const timer = setTimeout(render, 300);
    return () => clearTimeout(timer);
  }, [code, theme]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/50">
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
        <span className="text-xs text-muted-foreground font-mono">live preview</span>
      </div>
      <div
        ref={containerRef}
        className="flex-1 flex items-center justify-center p-6 overflow-auto min-h-0"
      >
        {error ? (
          <div className="flex flex-col items-center gap-3 text-center px-4">
            <AlertTriangle className="w-8 h-8 text-destructive" />
            <p className="text-sm text-destructive/80 max-w-sm font-mono">{error}</p>
          </div>
        ) : !code.trim() ? (
          <p className="text-muted-foreground text-sm">Start typing to see your diagram</p>
        ) : (
          <div ref={outputRef} className="w-full flex justify-center [&_svg]:max-w-full" />
        )}
      </div>
    </div>
  );
};

export default DiagramPreview;
