import { templates } from "@/lib/templates";
import { motion } from "framer-motion";
import {
  GitBranch, ArrowRightLeft, GitFork, Boxes,
  RefreshCw, PieChart, Database, Map,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  GitBranch, ArrowRightLeft, GitFork, Boxes,
  RefreshCw, PieChart, Database, Map,
};

interface TemplateGalleryProps {
  onSelect: (code: string) => void;
}

const TemplateGallery = ({ onSelect }: TemplateGalleryProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {templates.map((t, i) => {
        const Icon = iconMap[t.icon] || GitBranch;
        return (
          <motion.button
            key={t.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => onSelect(t.code)}
            className="glass p-3 flex flex-col items-center gap-2 hover:border-primary/50 hover:glow-primary transition-all cursor-pointer group"
          >
            <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            <span className="text-xs font-medium text-foreground">{t.name}</span>
            <span className="text-[10px] text-muted-foreground">{t.category}</span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default TemplateGallery;
