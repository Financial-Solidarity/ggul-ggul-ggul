// import { create } from 'zustand';

// interface LoginState {
//   email: string;
//   password: string;
//   displayErrorMessage: {
//     email: string;
//   };
//   ERRORS: {
//     EMAIL: string;
//   };
//   setEmail: (email: string) => void;
//   setPassword: (password: string) => void;
//   validateEmail: () => void;
// }

// export const useLoginStore = create<LoginState>((set, get) => ({
//   email: 'khj745700@naver.com',
//   password: 'test1test1',
//   displayErrorMessage: {
//     email: '',
//   },
//   ERRORS: {
//     EMAIL: '올바르지 않은 이메일 형식입니다.',
//   },

//   validateEmail: () => {
//     const { email } = get();

//     if (email && !/\S+@\S+\.\S+/.test(email)) {
//       set({
//         displayErrorMessage: {
//           ...get().displayErrorMessage,
//           email: get().ERRORS.EMAIL,
//         },
//       });
//     } else {
//       set({
//         displayErrorMessage: { ...get().displayErrorMessage, email: '' },
//       });
//     }
//   },

//   setEmail: (email: string) => {
//     set({ email });
//   },

//   setPassword: (password: string) => {
//     set({ password });
//   },
// }));
