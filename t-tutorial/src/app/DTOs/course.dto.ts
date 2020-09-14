export interface Course {
  id?: number;
  course_name: string;
  course_subject: string;
  course_batch: string;
}

export interface CourseRes {
    status:  boolean;
    message: string;
    data: Course[];
}