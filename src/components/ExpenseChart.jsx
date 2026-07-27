import { useSelector } from "react-redux";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { BarChart3 } from "lucide-react";

const PEACH_COLORS = ["#f97316", "#ff7f50", "#fb923c", "#fdba74", "#c2410c"];

export default function ExpenseChart() {
  const subscriptions = useSelector((state) => state.subscriptions.items) || [];
  const isYearly = useSelector((state) => state.ui?.isYearlyView);
  const currency = useSelector((state) => state.ui?.currency) || {
    symbol: "$",
    multiplier: 1,
  };

  if (subscriptions.length === 0) return null;

  const categoryData = subscriptions.reduce((acc, sub) => {
    const cost = (isYearly ? sub.cost * 12 : sub.cost) * currency.multiplier;
    const existingCategory = acc.find((item) => item.name === sub.category);

    if (existingCategory) {
      existingCategory.value += cost;
    } else {
      acc.push({ name: sub.category, value: cost });
    }
    return acc;
  }, []);

  return (
    <div className="glass-card p-6 border-white/10 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl pointer-events-none" />

      <h2 className="text-base font-bold text-white mb-6 flex items-center gap-2.5">
        <BarChart3 size={18} className="text-[#ff7f50]" />
        Spending by Category
      </h2>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={85}
              paddingAngle={6}
              dataKey="value"
              stroke="none"
            >
              {categoryData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={PEACH_COLORS[index % PEACH_COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value) => `${currency.symbol}${value.toFixed(2)}`}
              contentStyle={{
                backgroundColor: "rgba(11, 10, 9, 0.9)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "16px",
                color: "#fff",
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5)",
              }}
              itemStyle={{ color: "#fff", fontWeight: 600 }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              wrapperStyle={{ color: "#a3a3a3", fontSize: "12px" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
