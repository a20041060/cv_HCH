import React from 'react'
import { CV } from '../types'
import IdentityEditor from './sections/IdentityEditor'
import ContactEditor from './sections/ContactEditor'
import SkillsEditor from './sections/SkillsEditor'
import SoftwareEditor from './sections/SoftwareEditor'
import WorkHistoryEditor from './sections/WorkHistoryEditor'
import EducationEditor from './sections/EducationEditor'

export default function Editor({ cv, update, onDownloadJson, onCopyJson, onPrint, onLoadJson }: {
  cv: CV;
  update: (path: (string | number)[], value: unknown) => void;
  onDownloadJson: () => void;
  onCopyJson: () => void;
  onPrint: () => void;
  onLoadJson: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="panel form">
      <IdentityEditor cv={cv} update={update} />
      <ContactEditor cv={cv} update={update} />
      <SkillsEditor cv={cv} update={update} />
      <SoftwareEditor cv={cv} update={update} />
      <h2>Summary</h2>
      <div className="input"><label>Expected Salary</label><input value={cv.summary.expectedSalary} onChange={e => update(['summary','expectedSalary'], e.target.value)} /></div>
      <div className="input"><label>Summary Text</label><textarea value={cv.summary.text} onChange={e => update(['summary','text'], e.target.value)} rows={4} /></div>
      <WorkHistoryEditor cv={cv} update={update} />
      <EducationEditor cv={cv} update={update} />
      <div className="toolbar">
        <button className="btn primary" onClick={onDownloadJson}>Download JSON</button>
        <button className="btn ghost" onClick={onCopyJson}>Copy JSON</button>
        <button className="btn primary" onClick={onPrint}>Print PDF</button>
        <input type="file" accept="application/json" onChange={onLoadJson} />
      </div>
    </div>
  )
}
