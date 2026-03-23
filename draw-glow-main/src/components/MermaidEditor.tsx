import { useRef, useEffect } from "react";

interface MermaidEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const MermaidEditor = ({ value, onChange }: MermaidEditorProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const newValue = value.substring(0, start) + "    " + value.substring(end);
      onChange(newValue);
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 4;
      }, 0);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/50">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-destructive/60" />
          <div className="w-3 h-3 rounded-full bg-primary/40" />
          <div className="w-3 h-3 rounded-full bg-primary/60" />
        </div>
        <span className="text-xs text-muted-foreground font-mono ml-2">diagram.mmd</span>
      </div>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 w-full bg-transparent p-4 font-mono text-sm text-foreground resize-none focus:outline-none placeholder:text-muted-foreground leading-relaxed"
        placeholder="Enter your Mermaid code here..."
        spellCheck={false}
      />
    </div>
  );
};

export default MermaidEditor;
