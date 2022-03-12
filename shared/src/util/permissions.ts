import { isArray, isEnum, isString } from 'class-validator';
import { Permissions, PermissionsList } from '../dto/permissions';

export function isPermissionsArray(value: any): value is Permissions {
  if (!isArray(value)) return false;
  if (!value.every((item: unknown) => isString(item))) return false;
  if (!value.every((item: string) => isEnum(item, PermissionsList)))
    return false;
  return true;
}
