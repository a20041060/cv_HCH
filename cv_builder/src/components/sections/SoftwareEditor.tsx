import React from 'react'
import ArrayEditor from '../ArrayEditor'
import Field from '../Field'
import { CV, BarItem } from '../../types'

export default function SoftwareEditor({ cv, update }: { cv: CV; update: (path: (string | number)[], value: unknown) => void }) {
  return (
    <ArrayEditor
      title="Software"
      items={cv.software}
      onAdd={() => update(['software'], [...cv.software, { label: '', level: 50 }])}
      renderItem={(it: BarItem, i: number) => (
        <div className="item" key={i}>
          <div className="row">
            <Field label="Label" value={it.label} onChange={(v) => {
              const list = [...cv.software]; list[i] = { ...it, label: v }; update(['software'], list)
            }} />
            <div className="input">
              <label>Level (0-100)</label>
              <input type="number" min="0" max="100" value={it.level} onChange={(e) => {
                const list = [...cv.software]; list[i] = { ...it, level: Number(e.target.value) }; update(['software'], list)
              }} />
            </div>
          </div>
          <div className="item-actions">
            <button className="btn ghost" onClick={() => {
              const list = cv.software.filter((_, idx) => idx !== i); update(['software'], list)
            }}>Remove</button>
          </div>
        </div>
      )}
    />
  )
}
