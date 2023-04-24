export interface ILoginUser {
  login: String;
  password: String;
}
export interface IRegisterUser {
  login: String;
  password: String;
  firstName: String;
  lastName: String;
  company: String;
  phone?: Number;
  email?: String;
  _id: String;
}
