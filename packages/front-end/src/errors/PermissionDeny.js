class PermissionDeny extends Error {
  constructor(permission, message) {
    super(message);
    this.permission = permission;
    this.message = message;
  }
}

export default PermissionDeny;
