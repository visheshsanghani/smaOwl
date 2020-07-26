export default (state = [{ email: "vishesh@company.com", password: "company" }], action) => {
  switch (action.type) {
    case "CREATE_LOGIN":
      return [...state, action.payload.event];
    default:
      return state;
  }
};
