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

export type Student = {
  role: 'student';
  email: string;
  course: string;
  gender: string;
  firstName: string;
  middleName: string;
  lastName: string;
  sections: Section[];
  subjects: Subject[];
  studentId: string;
  yearLevel: string;
};
