import React from 'react'
import Field from '../Field'
import { CV } from '../../types'

export default function IdentityEditor({ cv, update }: { cv: CV; update: (path: (string | number)[], value: unknown) => void }) {
  return (
    <>
      <h2>Identity</h2>
      <div className="row">
        <Field label="Name Line 1" value={cv.identity.nameLines[0]} onChange={(v) => update(['identity', 'nameLines', 0], v)} />
        <Field label="Name Line 2" value={cv.identity.nameLines[1]} onChange={(v) => update(['identity', 'nameLines', 1], v)} />
      </div>
      <Field label="Title" value={cv.identity.title} onChange={(v) => update(['identity', 'title'], v)} />
    </>
  )
}
