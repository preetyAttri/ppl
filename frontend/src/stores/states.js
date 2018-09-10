let states = {
  register: {
    username: "",
    psw: "",
    email: "",
    firstName: "",
    lastName: "",
    userNameMsg: "",
    pswMsg: "",
    emailMsg: "",
    firstNameMsg: "",
    lastNameMsg: "",
    isAgree: false
  },
  login: {
    psw: "",
    email: "",
    pswMsg: "",
    emailMsg: ""
  },
  forget: {
    email: "",
    emailMsg: ""
  },
  reset: {
    psw: "",
    psw1: "",
    pswMsg: "",
    confirmPswMsg: ""
  },
  timeline: {
    file: null,
    description: "",
    category: "",
    arr: [],
    addCategory: "",
    categoryArr: [],
    isTimeline: true,
    isSinglePost: false,
    check_like: false,
    SinglePostObj: "",
    categoryMsg: "",
    comments: [],
    comment: ""
  }
};
export default states;
