export default (state = [{ email: "vishesh@smaOwl.com", password: "smaOwl" }], action) => {
  switch (action.type) {
    case "CREATE_LOGIN":
      return [...state, action.payload.event];
    default:
      return state;
  }
};
