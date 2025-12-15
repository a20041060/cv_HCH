import React, { useState, useRef } from 'react'

const initialCv = {
  identity: {
    nameLines: ['Chi Hung,', 'Charles HO'],
    title: 'Assistant System Manager'
  },
  contact: [
    { label: 'Address', value: 'Kwai Chung, NT' },
    { label: 'Phone', value: '852-61894412' },
    { label: 'E-mail', value: 'c20041060@gmail.com' },
    { label: 'LinkedIn', value: 'www.linkedin.com/in/chi-hung-charles-ho-14a281160' }
  ],
  skills: [
    { label: 'React.js & React Native', level: 95 },
    { label: 'Java & Spring Boot', level: 85 },
    { label: 'Angular.js', level: 75 },
    { label: 'NodeJS', level: 80 },
    { label: 'Python', level: 70 },
    { label: 'Virtualization Technologies', level: 75 },
    { label: 'Git', level: 90 },
    { label: 'Docker & OpenShift', level: 85 },
    { label: 'Database Administration', level: 70 }
  ],
  software: [
    { label: 'Jira', level: 90 },
    { label: 'Oracle Developer', level: 90 },
    { label: 'MSSQL', level: 80 },
    { label: 'GitHub/GitLab', level: 80 },
    { label: 'Openshift', level: 90 },
    { label: 'Toad', level: 80 }
  ],
  summary: {
    expectedSalary: 'Expected Salary: $ 60,000/Month',
    text:
      'Familiar with ReactJS, React Native & NodeJS, hands-on experience in Python & Java Spring, eager to learn new knowledge, adapting technology fast. Recently practicing containerization and apps migration. Feel free to see my GitHub: https://github.com/c20041060'
  },
  jobs: [
    {
      dates: '2023-10 - Current',
      title: 'Assistant System Manager',
      company: 'VTC, Hong Kong',
      bullets: [
        'Revamp Java(Spring)-based / PHP-based backend systems and enhance Angular/ React frontend applications',
        'Implemented Microservices Migration on Cloud (Openshift) and pipeline of CI/CD using Jenkinsfile and Docker',
        'Automate routine tasks on RedHat hosts with Shell Scripts',
        'Database schema review and table restructure by performing SQL script and command'
      ]
    },
    {
      dates: '2022-06 - 2023-09',
      title: 'Analyst Programmer',
      company: 'Varmeego Limited, Hong Kong, Hong Kong',
      bullets: [
        'Revamp Retail Apps (React Native) with over 100K downloads while maintaining the performance of existing version (Native Java)'
      ]
    },
    {
      dates: '2019-10 - 2022-12',
      title: 'Programmer/Mechanical Engineer',
      company: 'New World CAD/CAM Development Ltd., New Territories, HKSAR',
      bullets: [
        'Developed custom Web or App applications including e-commences, Gov. internal system and process automation',
        'Artificial Intelligent Robotic Cleaning and Disinfection System - i-Cleaner',
        'Third International Exhibition of Inventions of Geneva 2022 - Silver Medals',
        'Skill set: NodeJS, NestJS, React, MSSQL, TypeScript, Python, Java, Docker, GraphQL'
      ]
    },
    {
      dates: '2019-01 - 2019-10',
      title: 'Graduate Trainee',
      company: 'HKT',
      bullets: [
        'Provided Infra services for clients',
        'Improved and expanded IoT platforms using JavaScript to develop rich User Interfaces'
      ]
    }
  ],
  education: [
    {
      date: '2025-01',
      title: 'Master of Science: Information Technology',
      school: 'The Hong Kong Polytechnic University - Hung Hom',
      subs: [
        'Graduate',
        'Awardee of Targeted Taught Postgraduate Programmes Fellowships Scheme, 2022 from University Grants Committee (UGC)'
      ]
    }
  ]
}

function Field({ label, value, onChange, type = 'text' }) {
  return (
    <div className="input">
      <label>{label}</label>
      {type === 'textarea' ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={4}/>
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </div>
  )
}

function ArrayEditor({ title, items, renderItem, onAdd }) {
  return (
    <div className="items">
      <h2>{title}</h2>
      {items.map(renderItem)}
      <button className="btn ghost" onClick={onAdd}>Add</button>
    </div>
  )
}

function App() {
  const [cv, setCv] = useState(initialCv)
  const jsonRef = useRef(null)
  const iframeRef = useRef(null)

  const update = (path, value) => {
    setCv((prev) => {
      const draft = structuredClone(prev)
      let ref = draft
      for (let i = 0; i < path.length - 1; i++) ref = ref[path[i]]
      ref[path[path.length - 1]] = value
      return draft
    })
  }

  const downloadJson = () => {
    const blob = new Blob([JSON.stringify(cv, null, 2)], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'cv.json'
    a.click()
    URL.revokeObjectURL(a.href)
  }

  const copyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(cv, null, 2))
  }

  const loadJson = (evt) => {
    const file = evt.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result)
        setCv(data)
      } catch {}
    }
    reader.readAsText(file)
  }

  const handlePrint = () => {
    const mmToPx = (mm) => mm * 3.78
    const win = iframeRef.current?.contentWindow
    const doc = win?.document
    if (!doc) return
    const page = doc.querySelector('.page')
    const inner = doc.querySelector('.page-inner') || page
    const rect = inner.getBoundingClientRect()
    const h = inner.scrollHeight
    const targetWidthPx = mmToPx(210)
    const targetHeightPx = mmToPx(297)
    const ratioW = targetWidthPx / rect.width
    const ratioH = targetHeightPx / h
    const scale = Math.min(1, ratioW, ratioH)
    page.style.setProperty('--print-scale', String(scale))
    win.focus()
    win.print()
    setTimeout(() => page.style.removeProperty('--print-scale'), 500)
  }

  return (
    <div className="app">
      <div className="panel form">
        <h2>Identity</h2>
        <div className="row">
          <Field label="Name Line 1" value={cv.identity.nameLines[0]} onChange={(v) => update(['identity', 'nameLines', 0], v)} />
          <Field label="Name Line 2" value={cv.identity.nameLines[1]} onChange={(v) => update(['identity', 'nameLines', 1], v)} />
        </div>
        <Field label="Title" value={cv.identity.title} onChange={(v) => update(['identity', 'title'], v)} />

        <ArrayEditor
          title="Contact"
          items={cv.contact}
          onAdd={() => update(['contact'], [...cv.contact, { label: '', value: '' }])}
          renderItem={(it, i) => (
            <div className="item" key={i}>
              <div className="row">
                <Field label="Label" value={it.label} onChange={(v) => {
                  const list = [...cv.contact]; list[i] = { ...it, label: v }; update(['contact'], list)
                }} />
                <Field label="Value" value={it.value} onChange={(v) => {
                  const list = [...cv.contact]; list[i] = { ...it, value: v }; update(['contact'], list)
                }} />
              </div>
              <div className="item-actions">
                <button className="btn ghost" onClick={() => {
                  const list = cv.contact.filter((_, idx) => idx !== i); update(['contact'], list)
                }}>Remove</button>
              </div>
            </div>
          )}
        />

        <ArrayEditor
          title="Skills"
          items={cv.skills}
          onAdd={() => update(['skills'], [...cv.skills, { label: '', level: 50 }])}
          renderItem={(it, i) => (
            <div className="item" key={i}>
              <div className="row">
                <Field label="Label" value={it.label} onChange={(v) => {
                  const list = [...cv.skills]; list[i] = { ...it, label: v }; update(['skills'], list)
                }} />
                <div className="input">
                  <label>Level (0-100)</label>
                  <input type="number" min="0" max="100" value={it.level} onChange={(e) => {
                    const list = [...cv.skills]; list[i] = { ...it, level: Number(e.target.value) }; update(['skills'], list)
                  }} />
                </div>
              </div>
              <div className="item-actions">
                <button className="btn ghost" onClick={() => {
                  const list = cv.skills.filter((_, idx) => idx !== i); update(['skills'], list)
                }}>Remove</button>
              </div>
            </div>
          )}
        />

        <ArrayEditor
          title="Software"
          items={cv.software}
          onAdd={() => update(['software'], [...cv.software, { label: '', level: 50 }])}
          renderItem={(it, i) => (
            <div className="item" key={i}>
              <div className="row">
                <Field label="Label" value={it.label} onChange={(v) => {
                  const list = [...cv.software]; list[i] = { ...it, label: v }; update(['software'], list)
                }} />
                <div className="input">
                  <label>Level (0-100)</label>
                  <input type="number" min="0" max="100" value={it.level} onChange={(e) => {
                    const list = [...cv.software]; list[i] = { ...it, level: Number(e.target.value) }; update(['software'], list)
                  }} />
                </div>
              </div>
              <div className="item-actions">
                <button className="btn ghost" onClick={() => {
                  const list = cv.software.filter((_, idx) => idx !== i); update(['software'], list)
                }}>Remove</button>
              </div>
            </div>
          )}
        />

        <h2>Summary</h2>
        <Field label="Expected Salary" value={cv.summary.expectedSalary} onChange={(v) => update(['summary', 'expectedSalary'], v)} />
        <Field label="Summary Text" type="textarea" value={cv.summary.text} onChange={(v) => update(['summary', 'text'], v)} />

        <ArrayEditor
          title="Work History"
          items={cv.jobs}
          onAdd={() => update(['jobs'], [...cv.jobs, { dates: '', title: '', company: '', bullets: [''] }])}
          renderItem={(job, i) => (
            <div className="item" key={i}>
              <div className="row">
                <Field label="Dates" value={job.dates} onChange={(v) => {
                  const list = [...cv.jobs]; list[i] = { ...job, dates: v }; update(['jobs'], list)
                }} />
                <Field label="Title" value={job.title} onChange={(v) => {
                  const list = [...cv.jobs]; list[i] = { ...job, title: v }; update(['jobs'], list)
                }} />
              </div>
              <Field label="Company" value={job.company} onChange={(v) => {
                const list = [...cv.jobs]; list[i] = { ...job, company: v }; update(['jobs'], list)
              }} />
              <div className="items">
                {job.bullets.map((b, j) => (
                  <div className="row" key={j}>
                    <Field label={`Bullet ${j+1}`} value={b} onChange={(v) => {
                      const list = [...cv.jobs]; const jb = [...job.bullets]; jb[j] = v; list[i] = { ...job, bullets: jb }; update(['jobs'], list)
                    }} />
                    <div className="input">
                      <label>Actions</label>
                      <div className="item-actions">
                        <button className="btn ghost" onClick={() => {
                          const list = [...cv.jobs]; const jb = job.bullets.filter((_, idx) => idx !== j); list[i] = { ...job, bullets: jb }; update(['jobs'], list)
                        }}>Remove</button>
                        <button className="btn ghost" onClick={() => {
                          const list = [...cv.jobs]; const jb = [...job.bullets, '']; list[i] = { ...job, bullets: jb }; update(['jobs'], list)
                        }}>Add Bullet</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="item-actions">
                <button className="btn ghost" onClick={() => {
                  const list = cv.jobs.filter((_, idx) => idx !== i); update(['jobs'], list)
                }}>Remove Job</button>
              </div>
            </div>
          )}
        />

        <ArrayEditor
          title="Education"
          items={cv.education}
          onAdd={() => update(['education'], [...cv.education, { date: '', title: '', school: '', subs: [''] }])}
          renderItem={(e, i) => (
            <div className="item" key={i}>
              <div className="row">
                <Field label="Date" value={e.date} onChange={(v) => {
                  const list = [...cv.education]; list[i] = { ...e, date: v }; update(['education'], list)
                }} />
                <Field label="Title" value={e.title} onChange={(v) => {
                  const list = [...cv.education]; list[i] = { ...e, title: v }; update(['education'], list)
                }} />
              </div>
              <Field label="School" value={e.school} onChange={(v) => {
                const list = [...cv.education]; list[i] = { ...e, school: v }; update(['education'], list)
              }} />
              <div className="items">
                {e.subs.map((s, j) => (
                  <div className="row" key={j}>
                    <Field label={`Line ${j+1}`} value={s} onChange={(v) => {
                      const list = [...cv.education]; const subs = [...e.subs]; subs[j] = v; list[i] = { ...e, subs }; update(['education'], list)
                    }} />
                    <div className="input">
                      <label>Actions</label>
                      <div className="item-actions">
                        <button className="btn ghost" onClick={() => {
                          const list = [...cv.education]; const subs = e.subs.filter((_, idx) => idx !== j); list[i] = { ...e, subs }; update(['education'], list)
                        }}>Remove</button>
                        <button className="btn ghost" onClick={() => {
                          const list = [...cv.education]; const subs = [...e.subs, '']; list[i] = { ...e, subs }; update(['education'], list)
                        }}>Add Line</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="item-actions">
                <button className="btn ghost" onClick={() => {
                  const list = cv.education.filter((_, idx) => idx !== i); update(['education'], list)
                }}>Remove Entry</button>
              </div>
            </div>
          )}
        />

        <div className="toolbar">
          <button className="btn primary" onClick={downloadJson}>Download JSON</button>
          <button className="btn ghost" onClick={copyJson}>Copy JSON</button>
          <button className="btn primary" onClick={handlePrint}>Print PDF</button>
          <input type="file" accept="application/json" onChange={loadJson} />
        </div>
      </div>

      <div className="panel preview-pane">
        <iframe ref={iframeRef} title="preview" srcDoc={`
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
    </div>
  )
}

function previewCss() {
  return `
  :root { --blue:#0f4b79; --border:#d8e0ea; --text:#1b1f23; --muted:#58616a; --white:#ffffff; }
  *{box-sizing:border-box}
  html,body{min-height:100%}
  body{margin:0;overflow:auto;background:#f6f8fb;font-family:Inter,Montserrat,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif;}
  .page{margin:0;background:#fff;width:100%;min-height:100vh;box-shadow:0 6px 24px rgba(0,0,0,.08)}
  .page-inner{display:grid;grid-template-columns:300px 1fr}
  .sidebar{background:var(--blue);color:#fff;padding:28px 22px}
  .identity .name{font-size:28px;font-weight:800;line-height:1.2}
  .identity .title{margin-top:6px;font-size:14px;opacity:.9}
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
  .content{padding:28px 30px}
  .expected-salary{font-weight:700;margin-bottom:8px}
  .summary-text{font-size:14px;color:var(--muted);line-height:1.6}
  .section-title{color:var(--blue);font-size:20px;font-weight:800;border-bottom:2px solid var(--border);padding-bottom:8px;margin:24px 0 16px}
  .job{display:grid;grid-template-columns:160px 1fr;gap:16px;padding:12px 0;border-bottom:1px solid var(--border)}
  .job-dates{color:var(--muted);font-size:13px}
  .job-title{font-weight:700}
  .job-company{font-size:14px;color:var(--muted);margin-bottom:8px}
  .job ul{margin:0;padding-left:18px}
  .job li{margin:6px 0}
  .edu{display:grid;grid-template-columns:120px 1fr;gap:16px;padding:12px 0}
  .edu-date{color:var(--muted);font-size:13px}
  .edu-title{font-weight:700}
  .edu-school{font-size:14px;color:var(--muted);margin-bottom:6px}
  @page{size:A4;margin:0}
  @media print{
    body{background:#fff}
    .page{width:210mm;height:297mm;padding:0;box-sizing:border-box;overflow:hidden}
    .page-inner{transform-origin:top left;transform:scale(var(--print-scale,1));width:calc(100% / var(--print-scale,1));height:calc(100% / var(--print-scale,1))}
    .page,.page-inner,.sidebar,.content,.job,.edu{page-break-inside:avoid}
    *{-webkit-print-color-adjust:exact;print-color-adjust:exact}
  }
  `
}

function renderPreview(data) {
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

function barHtml(label, level) {
  return `
    <div class="bar">
      <span class="bar-label">${escapeHtml(label)}</span>
      <div class="bar-track">
        <div class="bar-fill" style="width:${Number(level)||0}%"></div>
      </div>
    </div>
  `
}

function escapeHtml(str) {
  return String(str || '').replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]))
}

export default App
