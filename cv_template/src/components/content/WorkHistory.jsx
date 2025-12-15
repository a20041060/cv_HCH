import React from 'react'
import Job from './Job.jsx'

function WorkHistory({ jobs }) {
  return (
    <section className="work-history">
      <h2 className="section-title">Work History</h2>
      {jobs.map((job, i) => (
        <Job key={i} job={job} />
      ))}
    </section>
  )
}

export default WorkHistory
