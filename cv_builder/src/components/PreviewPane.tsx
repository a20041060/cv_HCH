import React, { forwardRef } from 'react'
import { CV } from '../types'
import { previewCss, renderPreview } from '../utils/preview'

type Props = { cv: CV }

const PreviewPane = forwardRef<HTMLIFrameElement, Props>(function PreviewPane({ cv }, ref) {
  return (
    <div className="panel preview-pane">
      <iframe ref={ref} title="preview" srcDoc={`
        <!doctype html><html><head>
        <meta charset='utf-8'/>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
        <style>${previewCss()}</style>
        </head>
        <body>${renderPreview(cv)}</body></html>
      `}/>
    </div>
  )
})

export default PreviewPane
