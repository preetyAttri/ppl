import initialStates from "../stores/states";
console.log("in reducer Reset");
const ReducerReset = (state = initialStates.reset, action) => {
  console.log("in reducerReset func");
  let msg;
  switch (action.type) {
    case "ChangePswMsg":
      msg = typeof action.value === "string" ? action.value : "";
      return {
        ...state,
        pswMsg: msg
      };
    case "ChangeConfirmPswMsg":
      msg = typeof action.value === "string" ? action.value : "";
      return {
        ...state,
        confirmPswMsg: msg
      };
    case "psw":
      return {
        ...state,
        psw: action.value
      };
    case "psw1":
      return {
        ...state,
        psw1: action.value
      };
  }
  return state;
};
export default ReducerReset;
