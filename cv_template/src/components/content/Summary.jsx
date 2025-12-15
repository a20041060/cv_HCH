import React from 'react'

function Summary({ summary }) {
  return (
    <section className="summary">
      <div className="expected-salary">{summary.expectedSalary}</div>
      <p className="summary-text">{summary.text}</p>
    </section>
  )
}

export default Summary
