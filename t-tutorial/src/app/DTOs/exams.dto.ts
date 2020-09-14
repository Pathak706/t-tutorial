import { Course } from "./course.dto";

enum isDone {
  ture = 1,
  false = 0,
}
export interface Exams {
  id?: number;
  course_id: number;
  get_exam_course: Course;
  faculty_id: number;
  questions: string;
  option_1: string;
  option_2: string;
  option_3: string;
  option_4: string;
  correct_option: string;
  is_done: isDone;
  exam_set: number;
}

export interface ExamsRes {
  status: boolean;
  message: string;
  data: Exams[];
}
