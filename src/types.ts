export type Person = {
  _id: string;
  name: string;
  email: string;
};

export type Task = {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  persons: Person[];
};
