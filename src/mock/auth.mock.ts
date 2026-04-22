import { AuthUser, UserRole } from "@/types/auth";

type MockAccount = AuthUser & {
  password: string;
};

export const MOCK_ACCOUNTS: MockAccount[] = [
  {
    username: "nhan_vien",
    password: "123456",
    role: "nhan_vien",
    displayName: "Nhân viên",
    employeeCode: "NV-001",
    avatarUrl: "/images/user/user-01.jpg",
  },
  {
    username: "ca_truong",
    password: "123456",
    role: "ca_truong",
    displayName: "Ca truong",
    employeeCode: "CT-001",
    avatarUrl: "/images/user/user-01.jpg",
  },
  {
    username: "cua_hang_truong",
    password: "123456",
    role: "cua_hang_truong",
    displayName: "Cua hang truong",
    employeeCode: "CHT-001",
    avatarUrl: "/images/user/owner.jpg",
  },
];

export const ROLE_LABELS: Record<UserRole, string> = {
  nhan_vien: "Nhân viên",
  ca_truong: "Ca trưởng",
  cua_hang_truong: "Cửa hàng trưởng",
};

export const validateMockLogin = (username: string, password: string): AuthUser | null => {
  const account = MOCK_ACCOUNTS.find(
    (item) => item.username === username.trim() && item.password === password
  );

  if (!account) return null;

  return {
    username: account.username,
    displayName: account.displayName,
    role: account.role,
    employeeCode: account.employeeCode,
    avatarUrl: account.avatarUrl,
  };
};
