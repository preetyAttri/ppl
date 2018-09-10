export const toggleAgree = () => {
  return {
    type: "ChangeAgree"
  };
};
export const ChangeUserNameMsg = value => {
  return {
    type: "ChangeUserNameMsg",
    value: value
  };
};
export const ChangePswMsg = value => {
  return {
    type: "ChangePswMsg",
    value: value
  };
};
export const ChangeConfirmPswMsg = value => {
  return {
    type: "ChangeConfirmPswMsg",
    value: value
  };
};
export const ChangeEmailMsg = value => {
  return {
    type: "ChangeEmailMsg",
    value: value
  };
};
export const ChangeFirstNameMsg = value => {
  return {
    type: "ChangeFirstNameMsg",
    value: value
  };
};
export const ChangeLastNameMsg = value => {
  return {
    type: "ChangeLastNameMsg",
    value: value
  };
};

export const inputChange = (stateName, value) => {
  return {
    type: stateName,
    value: value
  };
};
export const fileChange = value => {
  return {
    type: "ChangeFile",
    value: value
  };
};

export const descriptionChange = value => {
  return {
    type: "ChangeDesc",
    value: value
  };
};
export const categoryChange = value => {
  return {
    type: "ChangeCategory",
    value: value
  };
};
export const addCategoryChange = value => {
  return {
    type: "ChangeAddCategory",
    value: value
  };
};
export const arrUpdate = value => {
  return {
    type: "UpdateArray",
    value: value
  };
};
export const categoryArrUpdate = value => {
  return {
    type: "UpdateCategoryArray",
    value: value
  };
};
export const isTimeline = value => {
  return {
    type: "isTimeline",
    value: value
  };
};
export const isSinglePost = value => {
  return {
    type: "isSinglePost",
    value: value
  };
};
export const SinglePostObj = value => {
  return {
    type: "SinglePostObj",
    value: value
  };
};
export const ChangeCategoryMsg = value => {
    return {
      type: "ChangeCategoryMsg",
      value: value
    };
  };
export const ChangeCommentArray = value => {
    return {
      type: "ChangeCommentArray",
      value: value
    };
  };
  export const ChangeComment = value => {
      return {
        type: "ChangeComment",
        value: value
      };
    };