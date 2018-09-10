import initialStates from "../stores/states";
console.log("in reducerLogin");
const ReducerLogin = (state = initialStates.login, action) => {
  console.log("in reducerLogin func");
  let msg;
  switch (action.type) {
    case "ChangePswMsg":
      msg = typeof action.value === "string" ? action.value : "";
      return {
        ...state,
        pswMsg: msg
      };
    case "ChangeEmailMsg":
      msg = typeof action.value === "string" ? action.value : "";
      return {
        ...state,
        emailMsg: msg
      };
    case "psw":
      return {
        ...state,
        psw: action.value
      };
    case "email":
      return {
        ...state,
        email: action.value
      };
  }
  return state;
};
export default ReducerLogin;
