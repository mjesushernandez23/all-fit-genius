export interface UserProps {
  name: string;
  email: string;
  password: string;
  role: number;
}

export interface ResponseLogin {
  token: string;
  user: Omit<UserProps, 'password'>;
}
