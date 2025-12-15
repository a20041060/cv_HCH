import React from 'react'
import { StyleSettings } from '../../types'

export default function StyleControls({ style, onChange }: { style: StyleSettings, onChange: (next: Partial<StyleSettings>) => void }) {
  return (
    <div>
      <h2>Style</h2>
      <div className="input">
        <label>Base Font Size ({style.baseFontPx}px)</label>
        <input type="range" min={12} max={18} step={1} value={style.baseFontPx} onChange={e => onChange({ baseFontPx: Number(e.target.value) })} />
      </div>
      <div className="input">
        <label>Line Height ({style.lineHeight.toFixed(2)})</label>
        <input type="range" min={1.4} max={2.2} step={0.05} value={style.lineHeight} onChange={e => onChange({ lineHeight: Number(e.target.value) })} />
      </div>
      <div className="input">
        <label>Content Padding ({style.contentPadding}px)</label>
        <input type="range" min={16} max={48} step={1} value={style.contentPadding} onChange={e => onChange({ contentPadding: Number(e.target.value) })} />
      </div>
      <div className="input">
        <label>Section Title Size ({style.sectionTitleSize}px)</label>
        <input type="range" min={18} max={28} step={1} value={style.sectionTitleSize} onChange={e => onChange({ sectionTitleSize: Number(e.target.value) })} />
      </div>
      <div className="input">
        <label>Sidebar Width ({style.sidebarWidth}px)</label>
        <input type="range" min={280} max={360} step={2} value={style.sidebarWidth} onChange={e => onChange({ sidebarWidth: Number(e.target.value) })} />
      </div>
      <div className="input">
        <label>Page Padding (print) ({style.pagePadding}px)</label>
        <input type="range" min={0} max={12} step={1} value={style.pagePadding} onChange={e => onChange({ pagePadding: Number(e.target.value) })} />
      </div>
    </div>
  )
}
