import AuthForm from "@/app/components/AuthForm";
import { signUpAction } from "@/app/actions/auth";

export const metadata = { title: "Sign up · Eco-House" };

export default function SignUpPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-16">
      <AuthForm mode="signup" action={signUpAction} />
    </main>
  );
}
