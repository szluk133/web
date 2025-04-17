import { redirect } from "next/navigation";
import { auth } from "@/auth";
import HomePage from "@/components/layout/homepage";

export default async function Home() {
  const session = await auth(); // Giả sử `auth()` kiểm tra session

  if (!session) {
    redirect("/auth/login"); // Chuyển hướng nếu chưa đăng nhập
  }

  return (
    <div>
      <HomePage />
    </div>
  );
}
