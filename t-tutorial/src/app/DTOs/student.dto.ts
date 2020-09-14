export interface Student {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
}

export interface StudentRes {
  status: boolean;
  message: string;
  data: Student[];
}
