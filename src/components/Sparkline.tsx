import { Area, AreaChart, ResponsiveContainer } from "recharts";

const data = [
  { v: 30 }, { v: 45 }, { v: 35 }, { v: 60 }, { v: 55 }, { v: 70 }, { v: 65 }, { v: 80 }, { v: 75 }, { v: 90 },
];

const Sparkline = ({ color = "hsl(199, 89%, 48%)" }: { color?: string }) => (
  <ResponsiveContainer width="100%" height={32}>
    <AreaChart data={data}>
      <defs>
        <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.3} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <Area type="monotone" dataKey="v" stroke={color} strokeWidth={1.5} fill="url(#sparkGrad)" dot={false} />
    </AreaChart>
  </ResponsiveContainer>
);

export default Sparkline;
