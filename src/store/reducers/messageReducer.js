import * as types from "../contants";

export default (state = "", { type }) => {
  switch (type) {
    case types.SET_MESSAGE:
      return "The email was succesfully validated.";
    case types.RESET_MESSAGE:
      return "Every thing is reset now";
    default:
      return state;
  }
};
