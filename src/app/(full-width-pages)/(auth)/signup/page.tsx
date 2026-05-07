import SignUpForm from "@/components/auth/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "EGAS CMS - Trang quản trị hệ thống EGAS ",
  description: "EGAS CMS - Trang quản trị hệ thống EGAS",
  // other metadata
};

export default function SignUp() {
  return <SignUpForm />;
}
