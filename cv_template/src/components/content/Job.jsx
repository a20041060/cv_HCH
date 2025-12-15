import React from 'react'

function Job({ job }) {
  return (
    <div className="job">
      <div className="job-dates">{job.dates}</div>
      <div className="job-details">
        <div className="job-title">{job.title}</div>
        <div className="job-company">{job.company}</div>
        <ul>
          {job.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Job
