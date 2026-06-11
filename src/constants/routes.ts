export const routes = {
  home: "/",
  ask_question: "/ask-question",
  signIn: "/sign-in",
  signUp: "/sign-up",
  question_details: (id: string) => `/question-details/${id}`,
  edit_question: (id: string) => `/edit-question/${id}`,
  edit_user: (id: string) => `/user/${id}`,
  user_info: (id: string) => `/user/info/${id}`,
  tags_info: (id: string) => `/tags/${id}`,
};
