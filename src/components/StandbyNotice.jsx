/**
 * Standby Notice Component
 * Displays warning that API calls are in standby mode
 */
import { AlertTriangle } from 'lucide-react'

export function StandbyNotice({ title = 'API Standby Mode' }) {
  return (
    <div className="flex items-start gap-3 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
      <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
      <div>
        <h3 className="font-semibold text-amber-300 text-sm">{title}</h3>
        <p className="text-amber-200/80 text-xs mt-1">
          All API calls are currently in <strong>STANDBY</strong> using mock data until system sync is complete.
          External API endpoints will be enabled once integration testing passes.
        </p>
      </div>
    </div>
  )
}

export default StandbyNotice
