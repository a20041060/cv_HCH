import React from 'react'
import Sidebar from './Sidebar'
import Content from './content/Content'
import { CV } from '../data/cv'

type Props = {
  innerRef: React.RefObject<HTMLDivElement>
  data: CV
}

function Page({ innerRef, data }: Props) {
  return (
    <div className="page" ref={innerRef}>
      <div className="page-inner">
        <Sidebar data={data} />
        <Content data={data} />
      </div>
    </div>
  )
}

export default Page
