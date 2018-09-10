import initialStates from "../stores/states";
console.log("in reducerRegister");
const ReducerRegister = (state = initialStates.register, action) => {
  console.log("in reducerRegister func");
  let msg;
  switch (action.type) {
    case "ChangeAgree":
      console.log(state.isAgree);
      return {
        ...state,
        isAgree: !state.isAgree
      };
    case "ChangeUserNameMsg":
      msg = typeof action.value === "string" ? action.value : "";
      return {
        ...state,
        userNameMsg: msg
      };
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
    case "ChangeFirstNameMsg":
      msg = typeof action.value === "string" ? action.value : "";
      return {
        ...state,
        firstNameMsg: msg
      };
    case "ChangeLastNameMsg":
      msg = typeof action.value === "string" ? action.value : "";
      return {
        ...state,
        lastNameMsg: msg
      };
    case "username":
      return {
        ...state,
        username: action.value
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
    case "firstName":
      return {
        ...state,
        firstName: action.value
      };
    case "lastName":
      return {
        ...state,
        lastName: action.value
      };
  }
  return state;
};
export default ReducerRegister;
