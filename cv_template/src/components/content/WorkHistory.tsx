import React from 'react'
import Job from './Job'
import { CV } from '../../data/cv'

function WorkHistory({ jobs }: { jobs: CV['jobs'] }) {
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
