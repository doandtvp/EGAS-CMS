export type UserRole = "nhan_vien" | "ca_truong" | "cua_hang_truong";

export interface AuthUser {
  username: string;
  displayName: string;
  role: UserRole;
  employeeCode: string;
  avatarUrl?: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}
