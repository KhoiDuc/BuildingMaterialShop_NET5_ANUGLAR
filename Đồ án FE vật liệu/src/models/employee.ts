export class EmployeeDTO{
  accessToken: string;
  refreshToken: string;
  employeeId: number;
  fullName: string;
  email: string;
  address: string;
  phoneNumber: string;
  passWord: string;
  gender: boolean;
  birthDay: string;
  roleId: string;
  isBlocked: boolean;
  role: {};
  checks: [];
  imports: [];
  refreshTokenEmployees: [];
}