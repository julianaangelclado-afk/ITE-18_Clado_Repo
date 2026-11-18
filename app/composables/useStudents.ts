// Sample data. Auto-imported anywhere in the app as useStudents().
export interface Student {
  id: string
  name: string
  course: string
  year: number
  gpa: number
  email: string
  motto: string
}

export const useStudents = (): Student[] => [
  {
    id: 'AA-2024-001',
    name: 'Eleanor Whitmore',
    course: 'Literature & History',
    year: 3,
    gpa: 3.92,
    email: 'e.whitmore@ashford.edu',
    motto: 'Read widely, speak plainly.'
  },
  {
    id: 'AA-2024-014',
    name: 'Theodore Blackwood',
    course: 'Civil Engineering',
    year: 2,
    gpa: 3.67,
    email: 't.blackwood@ashford.edu',
    motto: 'Build it to last a century.'
  },
  {
    id: 'AA-2024-027',
    name: 'Margaret Ashcroft',
    course: 'Economics',
    year: 4,
    gpa: 3.85,
    email: 'm.ashcroft@ashford.edu',
    motto: 'Patience compounds.'
  },
  {
    id: 'AA-2025-032',
    name: 'Julian Hargrove',
    course: 'Architecture',
    year: 1,
    gpa: 3.54,
    email: 'j.hargrove@ashford.edu',
    motto: 'Every line has a reason.'
  },
  {
    id: 'AA-2023-045',
    name: 'Beatrice Lancaster',
    course: 'Biology',
    year: 3,
    gpa: 3.78,
    email: 'b.lancaster@ashford.edu',
    motto: 'Observe first, conclude later.'
  },
  {
    id: 'AA-2025-051',
    name: 'Alistair Penhallow',
    course: 'Philosophy',
    year: 1,
    gpa: 3.61,
    email: 'a.penhallow@ashford.edu',
    motto: 'Question gently.'
  }
]
