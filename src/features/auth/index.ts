export interface SignupCredentials {
  name: string;
  password: string;
  email?: string;
}

export interface LoginCredentials {
  name: string;
  password: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
}
export interface SignUpAndLogin {
  _id: string;
  email: string;
  name: string;
  token: string;
}
