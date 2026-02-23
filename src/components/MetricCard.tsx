import { useCountUp } from "@/hooks/use-animations";
import Sparkline from "./Sparkline";

interface MetricCardProps {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  trend?: { direction: "up" | "down"; value: string };
}

const MetricCard = ({ label, value, suffix = "", prefix = "", trend }: MetricCardProps) => {
  const { count, ref } = useCountUp(value);

  return (
    <div ref={ref} className="content-card accent-top-border rounded-md p-4">
      <div className="text-xs font-mono text-muted-foreground mb-2 uppercase tracking-wider">{label}</div>
      <div className="flex items-end justify-between mb-2">
        <span className="text-2xl font-semibold text-foreground font-mono">
          {prefix}{count.toLocaleString()}{suffix}
        </span>
        {trend && (
          <span className={`text-xs font-mono ${trend.direction === "up" ? "text-emerald-400" : "text-red-400"}`}>
            {trend.direction === "up" ? "▲" : "▼"} {trend.value}
          </span>
        )}
      </div>
      <Sparkline />
    </div>
  );
};

export default MetricCard;
