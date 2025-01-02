import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

interface DashboardMetricProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  trend?: "up" | "down";
  trendValue?: string;
  chartData?: Array<{ value: number }>;
  chartColor?: string;
}

export function DashboardMetric({ 
  title, 
  value, 
  icon, 
  description,
  className,
  trend,
  trendValue,
  chartData = [],
  chartColor = "#1E40AF",
}: DashboardMetricProps) {
  return (
    <Card className={cn(
      "group relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg before:absolute before:left-0 before:top-0 before:h-full before:w-2 before:bg-gradient-to-b before:from-primary before:to-blue-600 before:opacity-0 before:transition-opacity hover:before:opacity-100",
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
          {title}
        </CardTitle>
        <div className="transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 text-primary">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2">
          <div className="text-2xl font-bold transition-all duration-300 group-hover:translate-x-1">
            {value}
          </div>
          {description && (
            <div className="text-xs text-muted-foreground dark:text-gray-300">
              {description}
            </div>
          )}
          {chartData.length > 0 && (
            <div className="h-16 mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} baseValue="dataMin">
                  <defs>
                    <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={chartColor} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={chartColor}
                    fill={`url(#gradient-${title})`}
                    strokeWidth={2}
                    dot={false}
                    animationDuration={1000}
                    baseLine={0}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}