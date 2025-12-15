import React from 'react'

function Education({ entries }) {
  return (
    <section className="education">
      <h2 className="section-title">Education</h2>
      {entries.map((e, i) => (
        <div className="edu" key={i}>
          <div className="edu-date">{e.date}</div>
          <div className="edu-details">
            <div className="edu-title">{e.title}</div>
            <div className="edu-school">{e.school}</div>
            {e.subs.map((s, j) => (
              <div className="edu-sub" key={j}>{s}</div>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}

export default Education
