
export const newLogin = (event) => {
    return {
      type: "NEW_LOGIN",
      payload: {
        event: event,
      },
    };
  };
  
  export const logOut = () => {
    return {
      type: "LOG_OUT"
    };
  };
  
  export const createLogin = (event) => {
    return {
      type: "CREATE_LOGIN",
      payload: {
        event: event
      }
    }
  }