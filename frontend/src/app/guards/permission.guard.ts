import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot
} from '@angular/router';
import { Permissions } from 'picsur-shared/dist/dto/permissions';
import { isPermissionsArray } from 'picsur-shared/dist/util/permissions';
import { PermissionService } from '../api/permission.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionGuard implements CanActivate {
  constructor(private permissionService: PermissionService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const requiredPermissions: Permissions = route.data['permissions'];
    if (!isPermissionsArray(requiredPermissions)) {
      throw new Error(
        `PermissionGuard: route data 'permissions' must be an array of Permission values`
      );
    }

    const ourPermissions = this.permissionService.snapshot;

    const isOk = requiredPermissions.every((permission) =>
      ourPermissions.includes(permission)
    );

    console.log(
      `PermissionGuard: requiredPermissions=${requiredPermissions} ourPermissions=${ourPermissions} isOk=${isOk}`
    );

    return isOk;
  }
}
