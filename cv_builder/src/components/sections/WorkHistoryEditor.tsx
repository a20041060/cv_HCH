import React from 'react'
import ArrayEditor from '../ArrayEditor'
import Field from '../Field'
import { CV, Job } from '../../types'

export default function WorkHistoryEditor({ cv, update }: { cv: CV; update: (path: (string | number)[], value: unknown) => void }) {
  return (
    <ArrayEditor
      title="Work History"
      items={cv.jobs}
      onAdd={() => update(['jobs'], [...cv.jobs, { dates: '', title: '', company: '', bullets: [''] }])}
      renderItem={(job: Job, i: number) => (
        <div className="item" key={i}>
          <div className="row">
            <Field label="Dates" value={job.dates} onChange={(v) => {
              const list = [...cv.jobs]; list[i] = { ...job, dates: v }; update(['jobs'], list)
            }} />
            <Field label="Title" value={job.title} onChange={(v) => {
              const list = [...cv.jobs]; list[i] = { ...job, title: v }; update(['jobs'], list)
            }} />
          </div>
          <Field label="Company" value={job.company} onChange={(v) => {
            const list = [...cv.jobs]; list[i] = { ...job, company: v }; update(['jobs'], list)
          }} />
          <div className="items">
            {job.bullets.map((b, j) => (
              <div className="row" key={j}>
                <Field label={`Bullet ${j+1}`} value={b} onChange={(v) => {
                  const list = [...cv.jobs]; const jb = [...job.bullets]; jb[j] = v; list[i] = { ...job, bullets: jb }; update(['jobs'], list)
                }} />
                <div className="input">
                  <label>Actions</label>
                  <div className="item-actions">
                    <button className="btn ghost" onClick={() => {
                      const list = [...cv.jobs]; const jb = job.bullets.filter((_, idx) => idx !== j); list[i] = { ...job, bullets: jb }; update(['jobs'], list)
                    }}>Remove</button>
                    <button className="btn ghost" onClick={() => {
                      const list = [...cv.jobs]; const jb = [...job.bullets, '']; list[i] = { ...job, bullets: jb }; update(['jobs'], list)
                    }}>Add Bullet</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="item-actions">
            <button className="btn ghost" onClick={() => {
              const list = cv.jobs.filter((_, idx) => idx !== i); update(['jobs'], list)
            }}>Remove Job</button>
          </div>
        </div>
      )}
    />
  )
}
