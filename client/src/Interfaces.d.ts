// Types and Interfaces

interface User {
  name?: string;
  email: string;
  password: string;
  password2?: string;
}

interface CustomError extends Error {
  response: {
    data: string;
  };
}
