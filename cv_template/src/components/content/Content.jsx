import React from 'react'
import Summary from './Summary.jsx'
import WorkHistory from './WorkHistory.jsx'
import Education from './Education.jsx'

function Content({ data }) {
  return (
    <main className="content">
      <Summary summary={data.summary} />
      <WorkHistory jobs={data.jobs} />
      <Education entries={data.education} />
    </main>
  )
}

export default Content
