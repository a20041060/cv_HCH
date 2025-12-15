import React from 'react'
import Summary from './Summary'
import WorkHistory from './WorkHistory'
import Education from './Education'
import { CV } from '../../data/cv'

function Content({ data }: { data: CV }) {
  return (
    <main className="content">
      <Summary summary={data.summary} />
      <WorkHistory jobs={data.jobs} />
      <Education entries={data.education} />
    </main>
  )
}

export default Content
