import React from 'react'
import { CV } from '../../data/cv'

function Summary({ summary }: { summary: CV['summary'] }) {
  return (
    <section className="summary">
      <div className="expected-salary">{summary.expectedSalary}</div>
      <p className="summary-text">{summary.text}</p>
    </section>
  )
}

export default Summary
