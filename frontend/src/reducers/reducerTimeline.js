import initialStates  from "../stores/states";
console.log("in reducer timeline");
const ReducerTimeline = (state = initialStates.timeline, action) => {
  console.log("in ReducerTimeline func");
  switch (action.type) {
    case "ChangeFile":
      let fileValue = typeof action.value === undefined ? "" : action.value;
      return {
        ...state,
        file: fileValue
      };
    case "ChangeDesc":
      return {
        ...state,
        description: action.value
      };
    case "ChangeCategory":
      return {
        ...state,
        category: action.value
      };
    case "ChangeAddCategory":
      return {
        ...state,
        addCategory: action.value
      };
    case "UpdateArray":
      return {
        ...state,
        arr: action.value
      };
    case "UpdateCategoryArray":
      return {
        ...state,
        categoryArr: action.value
      };
    case "isTimeline":
      return {
        ...state,
        isTimeline: action.value
      };
    case "isSinglePost":
      return {
        ...state,
        isSinglePost: action.value
      };
    case "SinglePostObj":
      return {
        ...state,
        SinglePostObj: action.value
      };
    case "ChangeCategoryMsg":
      let msg = typeof action.value === "string" ? action.value : "";
      return {
        ...state,
        categoryMsg: msg
      };
    case "ChangeCommentArray":
      return {
        ...state,
        comments: action.value
      };
    case "ChangeComment":
      return {
        ...state,
        comment: action.value
      };
  }

  return state;
};
export default ReducerTimeline;
