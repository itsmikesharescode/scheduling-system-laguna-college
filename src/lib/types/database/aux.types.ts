type Schedule = {
  id: string;
  day: string;
  endTime: string;
  startTime: string;
};

type Section = {
  id: string;
  value: string;
};

type Subject = {
  id: string;
  name: string;
  schedules: Schedule[];
};

export type StudentType = {
  role: 'student';
  email: string;
  course: string;
  gender: string;
  fullName: string;
  sections: Section[];
  subjects: Subject[];
  studentId: string;
  yearLevel: string;
};
