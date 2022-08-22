// Types and Interfaces

type State = ReturnType<typeof store.getState>;
type Dispatch = typeof store.dispatch;
type Fetch = typeof store.fetch;

interface User {
  name?: string;
  email: string;
  password: string;
  password2?: string;
}

interface CustomError extends Error {
  response: {
    status: string;
    statusText: string;
    data: {
      errors: {
        forEach(arg0: (error: {msg: string}) => string);
        msg: string;
      };
    };
  };
}

interface Alert {
  alertType: string;
  id: string;
  msg: string;
}
