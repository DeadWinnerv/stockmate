export interface ILoginUser {
  login: String;
  password: String;
}
export interface IRegisterUser {
  firstName: String;
  lastName: String;
  phone?: Number;
  login: String;
  password: String;
  company: String;
  email?: String;
  _id: String;
}
