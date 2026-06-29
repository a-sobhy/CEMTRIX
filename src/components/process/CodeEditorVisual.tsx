import { FileText, Search, GitBranch, Puzzle } from 'lucide-react';

const codeLines = [
  { text: 'class AutomationTrigger:', color: 'text-purple-400' },
  { text: '    def __init__(self, threshold):', color: 'text-blue-400' },
  { text: '        self.threshold = threshold', color: 'text-gray-300' },
  { text: '        self.status = "inactive"', color: 'text-gray-300' },
  { text: '', color: '' },
  { text: '    def check_trigger(self, value):', color: 'text-blue-400' },
  { text: '        if value > self.threshold:', color: 'text-pink-400' },
  { text: '            self.status = "active"', color: 'text-gray-300' },
  { text: '            return "Automation triggered!"', color: 'text-green-400' },
  { text: '        else:', color: 'text-pink-400' },
  { text: '            return "No action taken."', color: 'text-green-400' },
  { text: '', color: '' },
  { text: '    def get_status(self):', color: 'text-blue-400' },
  { text: '        return f"Status: {self.status}"', color: 'text-green-400' },
  { text: '', color: '' },
  { text: '    def reset(self):', color: 'text-blue-400' },
  { text: '        self.status = "inactive"', color: 'text-gray-300' },
  { text: '        return "System reset."', color: 'text-green-400' },
];

export function CodeEditorVisual() {
  const loopedLines = [...codeLines, ...codeLines];

  return (
    <div className="mt-6 rounded-2xl bg-black/80 border border-white/10 overflow-hidden">
      {/* Editor header */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10 bg-black/40">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="px-3 py-0.5 rounded bg-white/5 text-[10px] text-gray-500">automation.py</div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="flex flex-col items-center gap-3 px-3 py-4 border-r border-white/5 bg-black/40">
          <FileText className="w-3.5 h-3.5 text-gray-600" />
          <Search className="w-3.5 h-3.5 text-gray-600" />
          <GitBranch className="w-3.5 h-3.5 text-gray-600" />
          <Puzzle className="w-3.5 h-3.5 text-gray-600" />
        </div>

        {/* Code area with scroll */}
        <div className="flex-1 relative h-[180px] overflow-hidden">
          <div className="scroll-code">
            {loopedLines.map((line, i) => (
              <div key={i} className="flex items-center gap-3 px-3 py-0.5 font-mono text-[11px] leading-relaxed whitespace-pre">
                <span className="text-gray-700 w-4 text-right select-none">{(i % codeLines.length) + 1}</span>
                <span className={line.color || 'text-gray-300'}>{line.text || '\u00A0'}</span>
              </div>
            ))}
          </div>
          {/* Top/bottom fade */}
          <div className="absolute top-0 left-0 right-0 h-8 bg-linear-to-b from-black/80 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-linear-to-t from-black/80 to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
