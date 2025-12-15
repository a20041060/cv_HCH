import React from 'react'
import Sidebar from './Sidebar.jsx'
import Content from './content/Content.jsx'

function Page({ innerRef, data }) {
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
