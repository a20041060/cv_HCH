import React, { useRef } from 'react'
import Page from './components/Page'
import { cv, CV } from './data/cv'

function App() {
  const pageRef = useRef<HTMLDivElement>(null)

  const handlePrint = () => {
    const mmToPx = (mm: number) => mm * 3.78
    const node = pageRef.current
    if (!node) return
    const targetWidthPx = mmToPx(210 - 8)
    const targetHeightPx = mmToPx(297 - 8)
    const rect = node.getBoundingClientRect()
    const h = node.scrollHeight
    const ratioW = targetWidthPx / rect.width
    const ratioH = targetHeightPx / h
    const scale = Math.min(1, ratioW, ratioH)
    node.style.setProperty('--print-scale', String(scale))
    window.print()
    node.style.removeProperty('--print-scale')
  }

  return (
    <div className="app">
      <button className="print-btn" onClick={handlePrint}>Print PDF</button>
      <Page innerRef={pageRef} data={cv as CV} />
    </div>
  )
}

export default App
