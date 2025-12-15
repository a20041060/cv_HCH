import React from 'react'
import ArrayEditor from '../ArrayEditor'
import Field from '../Field'
import { CV, BarItem } from '../../types'

export default function SkillsEditor({ cv, update }: { cv: CV; update: (path: (string | number)[], value: unknown) => void }) {
  return (
    <ArrayEditor
      title="Skills"
      items={cv.skills}
      onAdd={() => update(['skills'], [...cv.skills, { label: '', level: 50 }])}
      renderItem={(it: BarItem, i: number) => (
        <div className="item" key={i}>
          <div className="row">
            <Field label="Label" value={it.label} onChange={(v) => {
              const list = [...cv.skills]; list[i] = { ...it, label: v }; update(['skills'], list)
            }} />
            <div className="input">
              <label>Level (0-100)</label>
              <input type="number" min="0" max="100" value={it.level} onChange={(e) => {
                const list = [...cv.skills]; list[i] = { ...it, level: Number(e.target.value) }; update(['skills'], list)
              }} />
            </div>
          </div>
          <div className="item-actions">
            <button className="btn ghost" onClick={() => {
              const list = cv.skills.filter((_, idx) => idx !== i); update(['skills'], list)
            }}>Remove</button>
          </div>
        </div>
      )}
    />
  )
}
