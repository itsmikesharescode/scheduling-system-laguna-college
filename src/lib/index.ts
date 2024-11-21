export const adminRoutes = [
  {
    url: '/admin',
    name: 'Dashboard'
  },
  {
    url: '/admin/teachers',
    name: 'Teachers'
  },
  {
    url: '/admin/students',
    name: 'Students'
  },
  {
    url: '/admin/reports',
    name: 'Reports'
  }
];

export const studentRoutes = [
  {
    url: '/student',
    name: 'Schedule'
  },
  {
    url: '/student/reports',
    name: 'Reports'
  },
  {
    url: '/student/account',
    name: 'Account'
  }
];

//metadatas
export const curriculum = [
  {
    course: 'BSCS',
    subjects: [
      {
        yearLevel: 'First Year',
        firstSemester: [
          { code: 'GE 101', description: 'Purposive Communication (3 units)' },
          { code: 'GE 102', description: 'Readings in Philippine History (3 units)' },
          { code: 'GE 103', description: 'Mathematics in the Modern World (3 units)' },
          { code: 'ITE 101', description: 'Introduction to Computing (lec/lab) (3 units)' },
          { code: 'ITE 102', description: 'Computer Programming 1 (lec/lab) (3 units)' },
          { code: 'FIL 111', description: 'Komunikasyon sa Akademikong Filipino (3 units)' },
          { code: 'NSTP 111', description: 'NSTP: Civic Welfare Training Service 1 (3 units)' },
          { code: 'PE 111', description: 'Individual/Dual Sports 1 (2 units)' }
        ],
        secondSemester: [
          { code: 'GE 104', description: 'Art Appreciation (3 units)' },
          { code: 'FIL 112', description: 'Pagbasa at Pagsulat Tungo sa Pananaliksik (3 units)' },
          { code: 'ITE 103', description: 'Computer Programming 2 (lec/lab) (3 units)' },
          { code: 'ITE 104', description: 'Data Structures and Algorithms (lec/lab) (3 units)' },
          { code: 'ITE 101', description: 'Discrete Structures 1 (3 units)' },
          { code: 'ITE 105', description: 'Web Development (3 units)' },
          { code: 'NSTP 112', description: 'NSTP: Civic Welfare Training Service 2 (3 units)' },
          { code: 'PE 112', description: 'Individual/Dual Sports 2 (2 units)' }
        ]
      },
      {
        yearLevel: 'Second Year',
        firstSemester: [
          { code: 'GE 105', description: 'Understanding the Self (3 units)' },
          { code: 'GE 106', description: 'Information Management (lec/lab) (3 units)' },
          {
            code: 'ITE 106',
            description: 'Application Dev and Emerging Technologies (lec/lab) (3 units)'
          },
          { code: 'ITE 107', description: 'Digital Logic Design (3 units)' },
          { code: 'ITE 202', description: 'Discrete Structures 2 (3 units)' },
          { code: 'ACCTG 111', description: 'Fundamentals of Accounting (3 units)' },
          { code: 'PE 113', description: 'Group Sports 1 (2 units)' }
        ],
        secondSemester: [
          { code: 'ITE 203', description: 'Analysis and Design of Algorithms (lec/lab) (3 units)' },
          { code: 'ITE 204', description: 'Object Oriented Programming (lec/lab) (3 units)' },
          {
            code: 'ITE 205',
            description: 'Computer Organization and Architecture (lec, lab) (3 units)'
          },
          { code: 'GE 108', description: 'Science, Technology, and Society (3 units)' },
          { code: 'ITE 206', description: 'Social Issues and Professional Practice (3 units)' },
          { code: 'MATH 211', description: 'Statistics and Probabilities (3 units)' },
          { code: 'PE 114', description: 'Group Sports 2 (2 units)' }
        ]
      },
      {
        yearLevel: 'Third Year',
        firstSemester: [
          { code: 'ITE P301', description: 'Automata Theory and Formal Languages (3 units)' },
          {
            code: 'ITE P302',
            description: 'Data Communication and Networking 1 (lec/lab) (3 units)'
          },
          { code: 'ITE P303', description: 'Software Engineering (lec/lab) (3 units)' },
          { code: 'ITE P304', description: 'Human Computer Interaction (3 units)' },
          { code: 'FL 111', description: 'Basic Nihongo (3 units)' },
          { code: 'ITE P305', description: 'Operating Systems (3 units)' }
        ],
        secondSemester: [
          { code: 'ITE P306', description: 'Programming Languages (lec/lab) (3 units)' },
          { code: 'ITE P307', description: 'Graphics and Visual Computing (lec/lab) (3 units)' },
          { code: 'RES 311', description: 'Methods of Research in Computing (3 units)' },
          { code: 'GE 107', description: 'Contemporary World (3 units)' },
          { code: 'SOCS 112', description: 'Personal Development (3 units)' },
          { code: 'FL 112', description: 'Advanced Nihongo (3 units)' }
        ],
        summer: [
          { code: 'ITE P401', description: 'Practicum 1 (3 units)' },
          { code: 'CS ELEC 1', description: 'Elective 1 (3 units)' }
        ]
      },
      {
        yearLevel: 'Fourth Year',
        firstSemester: [
          { code: 'ITE P402', description: 'Natural Language (lec/lab) (3 units)' },
          { code: 'ITE P403', description: 'Thesis Writing 1 (3 units)' },
          { code: 'GE 109', description: 'Life and Works of Rizal (3 units)' },
          { code: 'ITE P405', description: 'Information Assurance and Security (3 units)' },
          { code: 'CS ELEC 2', description: 'CS Elective 2 (3 units)' }
        ],
        secondSemester: [
          { code: 'ITE P404', description: 'Thesis Writing 2 (3 units)' },
          { code: 'ENG 300', description: 'World Literature (3 units)' },
          { code: 'CS ELEC 3', description: 'Elective 3 (3 units)' }
        ]
      }
    ]
  },

  {
    course: 'BSIT',
    subjects: [
      {
        yearLevel: 'First Year',
        firstSemester: [
          { code: 'GE 101', description: 'Purposive Communication (3 units)' },
          { code: 'GE 102', description: 'Readings in Philippine History (3 units)' },
          { code: 'GE 103', description: 'Mathematics in the Modern World (3 units)' },
          { code: 'ITE C100', description: 'Introduction to Computing (lec/lab) (3 units)' },
          { code: 'ITE C102', description: 'Computer Programming 1 (lec/lab) (3 units)' },
          { code: 'FIL 111', description: 'Komunikasyon sa Akademikong Filipino (3 units)' },
          { code: 'NSTP 111', description: 'NSTP: Civic Welfare Training Service 1 (3 units)' },
          { code: 'PE 111', description: 'Individual/Dual Sports 1 (2 units)' }
        ],
        secondSemester: [
          { code: 'GE 104', description: 'Art Appreciation (3 units)' },
          { code: 'FIL 112', description: 'Pagbasa at Pagsulat Tungo sa Pananaliksik (3 units)' },
          { code: 'ITE C103', description: 'Computer Programming 2 (lec/lab) (3 units)' },
          { code: 'ITE C104', description: 'Data Structures and Algorithms (lec/lab) (3 units)' },
          { code: 'ITE C101', description: 'Discrete Structures 1 (3 units)' },
          { code: 'ITE C105', description: 'Web Development (3 units)' },
          { code: 'NSTP 112', description: 'NSTP: Civic Welfare Training Service 2 (3 units)' },
          { code: 'PE 112', description: 'Individual/Dual Sports 2 (2 units)' }
        ]
      },
      {
        yearLevel: 'Second Year',
        firstSemester: [
          { code: 'GE 105', description: 'Understanding the Self (3 units)' },
          { code: 'Ethics', description: '(3 units)' },
          { code: 'ITE 106', description: 'Information Management (lec/lab) (3 units)' },
          {
            code: 'ITE 108',
            description: 'Application Dev and Emerging Technologies/Platform Technologies (3 units)'
          },
          { code: 'ACCTG 111', description: 'Fundamentals of Accounting (3 units)' },
          { code: 'PE 113', description: 'Group Sports 1 (2 units)' }
        ],
        secondSemester: [
          { code: 'ITE ELEC 1', description: 'Human Computer Interaction (3 units)' },
          { code: 'GE 108', description: 'Science, Technology, and Society (3 units)' },
          { code: 'ITE 109', description: 'Social Issues and Professional Practice (3 units)' },
          { code: 'MATH 211', description: 'Statistics and Probabilities (3 units)' },
          { code: 'PE 114', description: 'Group Sports 2 (2 units)' }
        ]
      },
      {
        yearLevel: 'Third Year',
        firstSemester: [
          {
            code: 'ITE P106',
            description: 'Software Programming and Technologies (lec/lab) (3 units)'
          },
          {
            code: 'ITE 1107',
            description: 'Data Communication and Networking 1 (lec/lab) (3 units)'
          },
          { code: 'RES 311', description: 'Methods of Research in Computing (3 units)' },
          { code: 'FL 111', description: 'Basic Nihongo (3 units)' },
          { code: 'ITE P108', description: 'Systems Analysis and Design (3 units)' },
          { code: 'Operating Systems', description: '(3 units)' }
        ],
        summer: [
          { code: 'ITE P117', description: 'Practicum 1 (3 units)' },
          { code: 'ITE P112', description: 'Networking 2 (lec/lab) (3 units)' }
        ],
        secondSemester: [
          {
            code: 'ITE P110',
            description: 'Systems Integration and Architecture (lec/lab) (3 units)'
          },
          { code: 'ITE ELEC 2', description: 'Elective 2 (3 units)' },
          { code: 'GE 109', description: 'Life and Works of Rizal (3 units)' },
          { code: 'FL 112', description: 'Advanced Nihongo (3 units)' },
          {
            code: 'ITE P111',
            description: 'Fund. of Data Warehousing & Data Mining (lec/lab) (3 units)'
          },
          { code: 'GE 107', description: 'Contemporary World (3 units)' },
          { code: 'SOCSCI 111', description: 'Personal Development (3 units)' }
        ]
      },
      {
        yearLevel: 'Fourth Year',
        firstSemester: [
          { code: 'ITE P113', description: 'Information Assurance and Security 1 (3 units)' },
          { code: 'ITE P114', description: 'Capstone Project and Research 1 (3 units)' },
          { code: 'ITE ELEC 3', description: 'Elective 3 (3 units)' },
          { code: 'ITE ELEC 4', description: 'Elective 4 (3 units)' },
          { code: 'ITE P118', description: 'Practicum 2 (3 units)' }
        ],
        secondSemester: [
          { code: 'ITE P115', description: 'Capstone Project and Research 2 (3 units)' },
          { code: 'ITE P116', description: 'Systems Administration and Maintenance (3 units)' },
          { code: 'ENG 300', description: 'World Literature (3 units)' }
        ]
      }
    ]
  }
];

// Flatten the curriculum data
export const allSubjects = Array.from(
  new Set(
    curriculum
      .flatMap((courseData) =>
        courseData.subjects.flatMap((yearData) => {
          return [
            ...yearData.firstSemester,
            ...yearData.secondSemester,
            ...(yearData.summer || [])
          ];
        })
      )
      .map((subject) => `${subject.code} - ${subject.description}`)
  )
).map((subjectString) => ({
  label: subjectString,
  value: subjectString
}));

export const days = [
  { value: 'Monday', label: 'Monday' },
  { value: 'Tuesday', label: 'Tuesday' },
  { value: 'Wednesday', label: 'Wednesday' },
  { value: 'Thursday', label: 'Thursday' },
  { value: 'Friday', label: 'Friday' },
  { value: 'Saturday', label: 'Saturday' },
  { value: 'Sunday', label: 'Sunday' }
];

export const timeSlots = (() => {
  const slots = [];
  const startHour = 7; // 7 AM
  const endHour = 22; // 10 PM

  for (let hour = startHour; hour <= endHour; hour++) {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour;

    // Add hour slot
    const timeStr = `${displayHour}:00 ${period}`;
    slots.push({ value: timeStr, label: timeStr });

    // Add half-hour slot
    if (hour !== endHour) {
      const halfTimeStr = `${displayHour}:30 ${period}`;
      slots.push({ value: halfTimeStr, label: halfTimeStr });
    }
  }

  return slots;
})();
