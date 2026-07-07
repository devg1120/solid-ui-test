export enum UserStatus {
  Active = 0,
  Inactive,
  Banned,
}

export type User = {
  username: string;
  email: string;
  status: UserStatus;
};

export const emptyUser: User = {
  username: "",
  email: "",
  status: 1,
};

export const defaultUser: User = {
  username: "very1fake",
  email: "very1fake@example.com",
  status: 0,
};
