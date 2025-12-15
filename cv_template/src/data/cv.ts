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

export const cv: CV = {
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
      company: 'Varmeego Limited, Hong Kong, HKSAR',
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
      date: '2022-09 - 2025-01',
      title: 'Master of Science: Information Technology',
      school: 'The Hong Kong Polytechnic University - Hung Hom',
      subs: [
        'Graduate',
        'Awardee of Targeted Taught Postgraduate Programmes Fellowships Scheme, 2022 from University Grants Committee (UGC)'
      ]
    }
    
  ]
}
