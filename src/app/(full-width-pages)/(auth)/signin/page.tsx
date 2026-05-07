import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "EGAS CMS - Trang quản trị hệ thống EGAS ",
  description: "EGAS CMS - Trang quản trị hệ thống EGAS",
};

export default function SignIn() {
  return <SignInForm />;
}
