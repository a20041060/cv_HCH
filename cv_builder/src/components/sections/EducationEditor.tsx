import React from 'react'
import ArrayEditor from '../ArrayEditor'
import Field from '../Field'
import { CV, EducationEntry } from '../../types'

export default function EducationEditor({ cv, update }: { cv: CV; update: (path: (string | number)[], value: unknown) => void }) {
  return (
    <ArrayEditor
      title="Education"
      items={cv.education}
      onAdd={() => update(['education'], [...cv.education, { date: '', title: '', school: '', subs: [''] }])}
      renderItem={(e: EducationEntry, i: number) => (
        <div className="item" key={i}>
          <div className="row">
            <Field label="Date" value={e.date} onChange={(v) => {
              const list = [...cv.education]; list[i] = { ...e, date: v }; update(['education'], list)
            }} />
            <Field label="Title" value={e.title} onChange={(v) => {
              const list = [...cv.education]; list[i] = { ...e, title: v }; update(['education'], list)
            }} />
          </div>
          <Field label="School" value={e.school} onChange={(v) => {
            const list = [...cv.education]; list[i] = { ...e, school: v }; update(['education'], list)
          }} />
          <div className="items">
            {e.subs.map((s, j) => (
              <div className="row" key={j}>
                <Field label={`Line ${j+1}`} value={s} onChange={(v) => {
                  const list = [...cv.education]; const subs = [...e.subs]; subs[j] = v; list[i] = { ...e, subs }; update(['education'], list)
                }} />
                <div className="input">
                  <label>Actions</label>
                  <div className="item-actions">
                    <button className="btn ghost" onClick={() => {
                      const list = [...cv.education]; const subs = e.subs.filter((_, idx) => idx !== j); list[i] = { ...e, subs }; update(['education'], list)
                    }}>Remove</button>
                    <button className="btn ghost" onClick={() => {
                      const list = [...cv.education]; const subs = [...e.subs, '']; list[i] = { ...e, subs }; update(['education'], list)
                    }}>Add Line</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="item-actions">
            <button className="btn ghost" onClick={() => {
              const list = cv.education.filter((_, idx) => idx !== i); update(['education'], list)
            }}>Remove Entry</button>
          </div>
        </div>
      )}
    />
  )
}
