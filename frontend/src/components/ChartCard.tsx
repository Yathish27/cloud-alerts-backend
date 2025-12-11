interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function ChartCard({ title, children, className = '' }: ChartCardProps) {
  return (
    <div className={`bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 shadow-lg ${className}`}>
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
        <span className="h-1 w-1 bg-blue-500 rounded-full mr-2"></span>
        {title}
      </h3>
      {children}
    </div>
  );
}

