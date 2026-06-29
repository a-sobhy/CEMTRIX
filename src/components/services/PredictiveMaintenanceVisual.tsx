import { Activity, AlertTriangle, ChevronDown, TrendingUp } from 'lucide-react';

export function PredictiveMaintenanceVisual() {
    return (
        <div className="rounded-xl bg-[#0a0f1d] border border-white/10 overflow-hidden shadow-2xl">
            {/* Top Header */}
            <div className="flex items-center justify-between px-4 py-3">
                <h4 className="text-sm font-bold text-white">Asset Health Overview</h4>
                <div className="flex gap-2">
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#021630]/40 border border-blue-200/10 text-[10px] text-gray-400">
                        Cement Plant 1 <ChevronDown className="w-3 h-3" />
                    </div>
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#021630]/40 border border-blue-200/10 text-[10px] text-gray-400">
                        Last 7 Days <ChevronDown className="w-3 h-3" />
                    </div>
                </div>
            </div>

            {/* Main Grid */}
            <div className="p-4 grid grid-cols-12 gap-3">

                {/* Top Stats */}
                <div className="col-span-3 p-3 rounded-lg bg-[#021630] border border-white/5">
                    <p className="text-[10px] text-gray-500 font-medium">Total Assets</p>
                    <div className="flex items-end justify-between mt-1">
                        <span className="text-2xl font-bold text-blue-500">128</span>
                        <Activity className="w-5 h-5 text-blue-500/50" />
                    </div>
                </div>
                <div className="col-span-3 p-3 rounded-lg bg-[#021630] border border-white/5">
                    <p className="text-[10px] text-gray-500 font-medium">Healthy</p>
                    <div className="flex items-end justify-between mt-1">
                        <span className="text-2xl font-bold text-green-500">82 <small className="text-[10px] text-gray-500 ml-1">64%</small></span>
                        <div className="w-8 h-4 bg-green-500/20 rounded-full flex items-center justify-center">
                            <div className="w-4 h-0.5 bg-green-500 animate-pulse" />
                        </div>
                    </div>
                </div>
                <div className="col-span-3 p-3 rounded-lg bg-[#021630] border border-white/5">
                    <p className="text-[10px] text-gray-500 font-medium">At Risk</p>
                    <div className="flex items-end justify-between mt-1">
                        <span className="text-2xl font-bold text-orange-500">28 <small className="text-[10px] text-gray-500 ml-1">22%</small></span>
                        <TrendingUp className="w-5 h-5 text-orange-500/50" />
                    </div>
                </div>
                <div className="col-span-3 p-3 rounded-lg bg-[#021630] border border-white/5">
                    <p className="text-[10px] text-gray-500 font-medium">Critical</p>
                    <div className="flex items-end justify-between mt-1">
                        <span className="text-2xl font-bold text-red-500">18 <small className="text-[10px] text-gray-500 ml-1">14%</small></span>
                        <AlertTriangle className="w-5 h-5 text-red-500/50" />
                    </div>
                </div>
                {/* stats screenshot */}
                <div className="col-span-12">
                    <img src="/assets/predictive-maitenance.png" alt="Predictive Maintenance Stats" className="w-full h-auto" />
                </div>

            </div>
        </div>
    );
}
