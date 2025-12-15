export type BarItem = { label: string; level: number }
export type ContactItem = { label: string; value: string }
export type Job = { dates: string; title: string; company: string; bullets: string[] }
export type EducationEntry = { date: string; title: string; school: string; subs: string[] }

export type CV = {
  identity: { nameLines: [string, string]; title: string }
  contact: ContactItem[]
  skills: BarItem[]
  software: BarItem[]
  summary: { expectedSalary: string; text: string }
  jobs: Job[]
  education: EducationEntry[]
}
