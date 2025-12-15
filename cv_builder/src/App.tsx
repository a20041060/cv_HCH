import React, { useState, useRef } from 'react'
import { CV, StyleSettings } from './types'
import Editor from './components/Editor'
import PreviewPane from './components/PreviewPane'

const initialCv: CV = {
  identity: {
    nameLines: ['Chi Hung,', 'Charles HO'],
    title: 'Assistant System Manager'
  },
  contact: [
    { label: 'Address', value: 'Kwai Chung, NT' },
    { label: 'Phone', value: '852-61894412' },
    { label: 'E-mail', value: 'a20041060@gmail.com' },
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
      'Familiar with ReactJS, React Native & NodeJS, hands-on experience in Python & Java Spring, eager to learn new knowledge, adapting technology fast. Recently practicing containerization and apps migration. Feel free to see my GitHub: https://github.com/a20041060'
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

// Form field components moved to child components

function App() {
  const [cv, setCv] = useState<CV>(initialCv)
  const [style, setStyle] = useState<StyleSettings>({ baseFontPx: 15, lineHeight: 1.75, contentPadding: 32, sectionTitleSize: 22, sidebarWidth: 300, pagePadding: 0 })
  const jsonRef = useRef<HTMLDivElement | null>(null)
  const iframeRef = useRef<HTMLIFrameElement | null>(null)

  const update = (path: (string | number)[], value: unknown) => {
    setCv((prev) => {
      const draft = structuredClone(prev)
      let ref: any = draft
      for (let i = 0; i < path.length - 1; i++) ref = ref[path[i] as any]
      ref[path[path.length - 1] as any] = value as any
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

  const loadJson = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const file = evt.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const data = JSON.parse(String(reader.result)) as CV
        setCv(data)
      } catch {}
    }
    reader.readAsText(file)
  }

  const handlePrint = () => {
    const mmToPx = (mm: number) => mm * 3.78
    const win = iframeRef.current?.contentWindow
    const doc = win?.document
    if (!doc) return
    const page = doc.querySelector('.page') as HTMLElement | null
    const inner = (doc.querySelector('.page-inner') as HTMLElement | null) || page
    if (!page || !inner) return
    const rect = inner.getBoundingClientRect()
    const h = inner.scrollHeight
    const targetWidthPx = mmToPx(210 - 8)
    const targetHeightPx = mmToPx(297 - 8)
    const ratioW = targetWidthPx / rect.width
    const ratioH = targetHeightPx / h
    const scale = Math.min(1, ratioW, ratioH)
    page.style.setProperty('--print-scale', String(scale))
    win!.focus()
    win!.print()
    setTimeout(() => page.style.removeProperty('--print-scale'), 500)
  }

  const onStyleChange = (next: Partial<StyleSettings>) => {
    setStyle(prev => ({ ...prev, ...next }))
  }

  return (
    <div className="app">
      <Editor
        cv={cv}
        update={update}
        style={style}
        onStyleChange={onStyleChange}
        onDownloadJson={downloadJson}
        onCopyJson={copyJson}
        onPrint={handlePrint}
        onLoadJson={loadJson}
      />

      <PreviewPane ref={iframeRef} cv={cv} style={style} />
    </div>
  )
}

// Preview utilities moved to utils/preview and used by PreviewPane

export default App
