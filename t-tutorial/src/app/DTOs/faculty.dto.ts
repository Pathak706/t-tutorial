export interface Faculty {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  password?: string;

}

export interface FacultyRes {
  status: boolean;
  message: string;
  data: Faculty[];
}
