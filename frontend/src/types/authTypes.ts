
export interface UserType {
  id: string;
  name: string;
  email: string;
}

export interface LoginDataType {
  email: string;
  password: string;
}
export interface SignupDataType extends LoginDataType {
  name: string;
}

