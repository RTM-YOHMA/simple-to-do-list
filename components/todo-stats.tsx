interface TodoStatsProps {
  stats: {
    total: number
    active: number
    completed: number
  }
}

export default function TodoStats({ stats }: TodoStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-3 mb-8">
      <div className="bg-slate-800 border border-slate-700/50 rounded-xl p-4 text-center">
        <p className="text-slate-400 text-sm font-medium">Total</p>
        <p className="text-2xl md:text-3xl font-bold text-white">{stats.total}</p>
      </div>
      <div className="bg-blue-500/20 border border-blue-500/50 rounded-xl p-4 text-center">
        <p className="text-blue-300 text-sm font-medium">Active</p>
        <p className="text-2xl md:text-3xl font-bold text-blue-400">{stats.active}</p>
      </div>
      <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-4 text-center">
        <p className="text-green-300 text-sm font-medium">Completed</p>
        <p className="text-2xl md:text-3xl font-bold text-green-400">{stats.completed}</p>
      </div>
    </div>
  )
}
