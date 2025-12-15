import { CV, StyleSettings } from '../types'

export function previewCss(style?: StyleSettings): string {
  const s = style || { baseFontPx: 15, lineHeight: 1.75, contentPadding: 32, sectionTitleSize: 22, sidebarWidth: 300, pagePadding: 0 }
  return `
  :root { --blue:#0f4b79; --border:#d8e0ea; --text:#1b1f23; --muted:#58616a; --white:#ffffff; --fs-base:${s.baseFontPx}px; --lh-body:${s.lineHeight}; --content-pad:${s.contentPadding}px; --fs-section:${s.sectionTitleSize}px; --sidebar-w:${s.sidebarWidth}px; --page-pad:${s.pagePadding}px; }
  *{box-sizing:border-box}
  html,body{min-height:100%}
  body{margin:0;overflow:auto;background:#f6f8fb;font-family:Inter,Montserrat,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif;font-size:var(--fs-base)}
  .page{margin:0;background:#fff;width:210mm;height:297mm;padding:var(--page-pad, 0);box-shadow:0 6px 24px rgba(0,0,0,.08);overflow:hidden;box-sizing:border-box}
  .page-inner{display:grid;grid-template-columns:var(--sidebar-w) 1fr;transform-origin:top left;transform:scale(var(--preview-scale,1));width:calc(100% / var(--preview-scale,1));height:calc(100% / var(--preview-scale,1))}
  .sidebar{background:var(--blue);color:#fff;padding:28px 22px}
  .identity .name{font-size:calc(var(--fs-base) + 15px);font-weight:800;line-height:1.25}
  .identity .title{margin-top:6px;font-size:calc(var(--fs-base) + 0px);opacity:.9}
  .sidebar-section{margin-top:24px}
  .sidebar-title{font-weight:700;letter-spacing:.2px;border-bottom:2px solid rgba(255,255,255,.3);padding-bottom:6px;margin-bottom:12px}
  .contact-item{margin:8px 0}
  .contact-label{font-size:12px;opacity:.8}
  .contact-value{font-size:13px}
  .bar{margin-bottom:10px}
  .bar-label{display:block;font-size:13px;margin-bottom:6px}
  .bar-track{width:100%;height:8px;background:rgba(255,255,255,.25);border-radius:999px}
  .bar-fill{height:100%;background:#6ec1ff;border-radius:999px}
  .software-item{display:flex;justify-content:space-between;font-size:13px;margin:6px 0}
  .content{padding:var(--content-pad) var(--content-pad)}
  .expected-salary{font-weight:700;margin-bottom:10px}
  .summary-text{font-size:calc(var(--fs-base));color:var(--muted);line-height:var(--lh-body)}
  .section-title{color:var(--blue);font-size:var(--fs-section);font-weight:800;border-bottom:2px solid var(--border);padding-bottom:10px;margin:28px 0 18px}
  .job{display:grid;grid-template-columns:160px 1fr;gap:16px;padding:14px 0;border-bottom:1px solid var(--border)}
  .job-dates{color:var(--muted);font-size:calc(var(--fs-base) - 1px)}
  .job-title{font-weight:700}
  .job-company{font-size:calc(var(--fs-base));color:var(--muted);margin-bottom:10px}
  .job ul{margin:0;padding-left:18px}
  .job li{margin:8px 0;line-height:var(--lh-body)}
  .edu{display:grid;grid-template-columns:120px 1fr;gap:16px;padding:14px 0}
  .edu-date{color:var(--muted);font-size:calc(var(--fs-base) - 1px)}
  .edu-title{font-weight:700}
  .edu-school{font-size:calc(var(--fs-base));color:var(--muted);margin-bottom:8px}
  @page{size:A4;margin:0}
  @media print{
    body{background:#fff}
    .page{width:210mm;height:297mm;padding:var(--page-pad, 0);margin:0;box-shadow:none;box-sizing:border-box;overflow:hidden}
    .page-inner{transform-origin:top left;transform:scale(var(--print-scale,1));width:calc(100% / var(--print-scale,1));height:calc(100% / var(--print-scale,1))}
    .identity .name{font-size:calc(var(--fs-base) + 15px)}
    .identity .title{font-size:calc(var(--fs-base) + 0px)}
    .content{padding:var(--content-pad) calc(var(--content-pad) - 2px)}
    .summary-text{font-size:calc(var(--fs-base));line-height:var(--lh-body)}
    .section-title{font-size:var(--fs-section);margin:28px 0 18px;padding-bottom:10px}
    .job{grid-template-columns:160px 1fr;gap:16px;padding:14px 0}
    .job-dates{font-size:calc(var(--fs-base) - 1px)}
    .job-company{font-size:calc(var(--fs-base));margin-bottom:10px}
    .job li{margin:8px 0;line-height:var(--lh-body)}
    .edu{grid-template-columns:120px 1fr;gap:16px;padding:14px 0}
    .edu-date{font-size:calc(var(--fs-base) - 1px)}
    .edu-school{font-size:calc(var(--fs-base));margin-bottom:8px}
    .page,.page-inner,.sidebar,.content,.job,.edu{page-break-inside:avoid}
    *{-webkit-print-color-adjust:exact;print-color-adjust:exact}
  }
  `
}

export function renderPreview(data: CV): string {
  const sidebar = `
    <aside class="sidebar">
      <div class="identity">
        <div class="name">${escapeHtml(data.identity.nameLines[0])}<br/>${escapeHtml(data.identity.nameLines[1])}</div>
        <div class="title">${escapeHtml(data.identity.title)}</div>
      </div>
      <div class="sidebar-section">
        <div class="sidebar-title">Contact</div>
        ${data.contact.map(c => `
          <div class="contact-item">
            <div class="contact-label">${escapeHtml(c.label)}</div>
            <div class="contact-value">${escapeHtml(c.value)}</div>
          </div>
        `).join('')}
      </div>
      <div class="sidebar-section">
        <div class="sidebar-title">Skills</div>
        ${data.skills.map(s => barHtml(s.label, s.level)).join('')}
      </div>
      <div class="sidebar-section">
        <div class="sidebar-title">Software</div>
        ${data.software.map(s => barHtml(s.label, s.level)).join('')}
      </div>
    </aside>
  `
  const work = data.jobs.map(j => `
    <div class="job">
      <div class="job-dates">${escapeHtml(j.dates)}</div>
      <div class="job-details">
        <div class="job-title">${escapeHtml(j.title)}</div>
        <div class="job-company">${escapeHtml(j.company)}</div>
        <ul>${j.bullets.map(b => `<li>${escapeHtml(b)}</li>`).join('')}</ul>
      </div>
    </div>
  `).join('')
  const edu = data.education.map(e => `
    <div class="edu">
      <div class="edu-date">${escapeHtml(e.date)}</div>
      <div class="edu-details">
        <div class="edu-title">${escapeHtml(e.title)}</div>
        <div class="edu-school">${escapeHtml(e.school)}</div>
        ${e.subs.map(s => `<div class="edu-sub">${escapeHtml(s)}</div>`).join('')}
      </div>
    </div>
  `).join('')

  return `
    <div class="page">
      <div class="page-inner">
        ${sidebar}
        <main class="content">
          <section class="summary">
            <div class="expected-salary">${escapeHtml(data.summary.expectedSalary)}</div>
            <p class="summary-text">${escapeHtml(data.summary.text)}</p>
          </section>
          <section class="work-history">
            <h2 class="section-title">Work History</h2>
            ${work}
          </section>
          <section class="education">
            <h2 class="section-title">Education</h2>
            ${edu}
          </section>
        </main>
      </div>
    </div>
  `
}

function barHtml(label: string, level: number): string {
  return `
    <div class="bar">
      <span class="bar-label">${escapeHtml(label)}</span>
      <div class="bar-track">
        <div class="bar-fill" style="width:${Number(level)||0}%"></div>
      </div>
    </div>
  `
}

export function escapeHtml(str: string | number | undefined): string {
  return String(str ?? '').replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[s] as string))
}
