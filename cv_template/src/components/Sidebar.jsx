import React from 'react'

function Bar({ label, level }) {
  return (
    <div className="bar">
      <span className="bar-label">{label}</span>
      <div className="bar-track">
        <div className="bar-fill" style={{ width: `${level}%` }} />
      </div>
    </div>
  )
}

function Contact({ items }) {
  return (
    <div className="sidebar-section">
      <div className="sidebar-title">Contact</div>
      {items.map((it, i) => (
        <div className="contact-item" key={i}>
          <div className="contact-label">{it.label}</div>
          <div className="contact-value">{it.value}</div>
        </div>
      ))}
    </div>
  )
}

function Skills({ items }) {
  return (
    <div className="sidebar-section">
      <div className="sidebar-title">Skills</div>
      {items.map((s, i) => (
        <Bar key={i} label={s.label} level={s.level} />
      ))}
    </div>
  )
}

function Software({ items }) {
  return (
    <div className="sidebar-section">
      <div className="sidebar-title">Software</div>
      {items.map((s, i) => (
        <Bar key={i} label={s.label} level={s.level} />
      ))}
    </div>
  )
}

function Sidebar({ data }) {
  return (
    <aside className="sidebar">
      <div className="identity">
        <div className="name">{data.identity.nameLines[0]}<br/>{data.identity.nameLines[1]}</div>
        <div className="title">{data.identity.title}</div>
      </div>

      <Contact items={data.contact} />

      <Skills items={data.skills} />

      <Software items={data.software} />
    </aside>
  )
}

export default Sidebar
