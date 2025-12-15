import React, { forwardRef } from 'react'
import { CV, StyleSettings } from '../types'
import { previewCss, renderPreview } from '../utils/preview'

type Props = { cv: CV, style: StyleSettings }

const PreviewPane = forwardRef<HTMLIFrameElement, Props>(function PreviewPane({ cv, style }, ref) {
  return (
    <div className="panel preview-pane">
      <iframe ref={ref} title="preview" srcDoc={`
        <!doctype html><html><head>
        <meta charset='utf-8'/>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
        <style>${previewCss(style)}</style>
        </head>
        <body>${renderPreview(cv)}
        <script>
        (function(){
          function mmToPx(mm){return mm*3.78}
          function compute(){
            var page=document.querySelector('.page');
            var inner=document.querySelector('.page-inner');
            if(!page||!inner) return;
            var rect=inner.getBoundingClientRect();
            var h=inner.scrollHeight;
            var targetW=page.clientWidth; // padding removed by clientWidth
            var targetH=page.clientHeight;
            var ratioW=targetW/rect.width;
            var ratioH=targetH/h;
            var scale=Math.min(1, ratioW, ratioH);
            page.style.setProperty('--preview-scale', String(scale));
          }
          window.addEventListener('load', function(){compute();});
          if (document.fonts && document.fonts.ready) {document.fonts.ready.then(function(){compute();});}
          setTimeout(compute, 200);
        })();
        </script>
        </body></html>
      `}/>
    </div>
  )
})

export default PreviewPane
