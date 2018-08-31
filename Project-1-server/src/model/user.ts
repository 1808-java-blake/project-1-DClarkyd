import { Reimbursement } from "./reimbursement";

export class User {
  usersId = 0
  username = ''
  password = ''
  firstName = ''
  lastName = ''
  email = ''
  roleId = 0

  constructor(usersId?: number, username?: string, password?: string, firstName?: string, lastName?: string, email?: string, roleId?: number) {
    usersId && (this.usersId = usersId)
    username && (this.username = username)
    password && (this.password = password)
    firstName &&(this.firstName = firstName)
    lastName && (this.lastName = lastName)
    email && (this.email = email)
    roleId && (this.roleId = roleId);
  }
}