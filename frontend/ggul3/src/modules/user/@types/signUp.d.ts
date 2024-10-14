declare module '@types' {
  export interface UserSignUpForm {
    email: string;
    nickname: string;
    password: string;
  }

  interface VerifyEmail {
    email: string;
    number: string;
  }

  interface SignUp {
    email: string;
    nickname: string;
    password: string;
  }
}
