import React, { useRef } from 'react'
import Page from './components/Page.jsx'
import { cv } from './data/cv.js'

function App() {
  const pageRef = useRef(null)
  const handlePrint = () => {
    const mmToPx = (mm) => mm * 3.78
    const targetWidthPx = mmToPx(210 - 8)
    const targetHeightPx = mmToPx(297 - 8)
    const rect = pageRef.current.getBoundingClientRect()
    const h = pageRef.current.scrollHeight
    const ratioW = targetWidthPx / rect.width
    const ratioH = targetHeightPx / h
    const scale = Math.min(1, ratioW, ratioH)
    pageRef.current.style.setProperty('--print-scale', String(scale))
    window.print()
    pageRef.current.style.removeProperty('--print-scale')
  }

  return (
    <div className="app">
      <button className="print-btn" onClick={handlePrint}>Print PDF</button>
      <Page innerRef={pageRef} data={cv} />
    </div>
  )
}

export default App
