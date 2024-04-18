import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/user/schemas/user.schema';

export const ROLES_KEY = 'roles';

//User must have one of the roles to access the route
export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
