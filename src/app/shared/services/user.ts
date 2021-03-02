// Current interface for our user roles
export interface Roles{
  baseUser: boolean;
  adminUser: boolean;
}


// Current interface for our user data
export interface User {
  userID: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
  roles: Roles;
}
