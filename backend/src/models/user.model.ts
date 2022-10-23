export class User {
  email: string;
  password?: string;
  role?: Role;
}

export enum Role {
  Free = 'FREE',
  Premium = 'PREMIUM',
}
