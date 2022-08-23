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

interface Experience {
  _id: string;
  company: string;
  title: string;
  from: Date;
  to: Date;
  location?: string;
  description?: string;
}

interface Education {
  _id: string;
  school: string;
  degree: string;
  from: Date;
  to: Date;
  fieldOfStudy?: string;
  description?: string;
}

interface Profile {
  user: {_id: string; name: string; avatar: string};
  status: string;
  company: string;
  location: string;
  skills: string[];
  website?: string;
  social?: string[];
  bio?: string;
}

interface Repo {
  description: string;
  name: string;
  id: string;
  html_url: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
}
