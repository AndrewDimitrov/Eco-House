import AuthForm from "@/app/components/AuthForm";
import { logInAction } from "@/app/actions/auth";

export const metadata = { title: "Log in · Eco-House" };

export default function LogInPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-16">
      <AuthForm mode="login" action={logInAction} />
    </main>
  );
}
