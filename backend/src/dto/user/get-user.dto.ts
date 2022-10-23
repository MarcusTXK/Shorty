import { Role } from 'src/models/user.model';

export class GetUserDto {
  email: string;
  role: Role;
}
