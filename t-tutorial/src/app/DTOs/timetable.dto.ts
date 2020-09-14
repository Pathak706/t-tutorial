import { Course } from './course.dto';

export interface Timetable {
    id?: number;
    course_id: number;
    start_time: string;
    end_time: string;
    faculty_id: number;
    get_course?: Course;
}

export interface TimetableRes {
    status: boolean;
    message: string;
    data: Timetable[];
}