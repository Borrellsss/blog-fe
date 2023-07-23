import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userRoleConverter'
})
export class UserRoleConverterPipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case "ROLE_USER":
        return "User";
      case "ROLE_MODERATOR":
        return "Moderator";
      case "ROLE_ADMIN":
        return "Admin";
      case "ROLE_SUPER_ADMIN":
        return "Super Admin";
      default:
        return "Unknown";
    }
  }
}
