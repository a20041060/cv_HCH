import React from 'react'
import ArrayEditor from '../ArrayEditor'
import Field from '../Field'
import { CV, ContactItem } from '../../types'

export default function ContactEditor({ cv, update }: { cv: CV; update: (path: (string | number)[], value: unknown) => void }) {
  return (
    <ArrayEditor
      title="Contact"
      items={cv.contact}
      onAdd={() => update(['contact'], [...cv.contact, { label: '', value: '' }])}
      renderItem={(it: ContactItem, i: number) => (
        <div className="item" key={i}>
          <div className="row">
            <Field label="Label" value={it.label} onChange={(v) => {
              const list = [...cv.contact]; list[i] = { ...it, label: v }; update(['contact'], list)
            }} />
            <Field label="Value" value={it.value} onChange={(v) => {
              const list = [...cv.contact]; list[i] = { ...it, value: v }; update(['contact'], list)
            }} />
          </div>
          <div className="item-actions">
            <button className="btn ghost" onClick={() => {
              const list = cv.contact.filter((_, idx) => idx !== i); update(['contact'], list)
            }}>Remove</button>
          </div>
        </div>
      )}
    />
  )
}
