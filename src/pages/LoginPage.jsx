import AuthLayout from "../components/auth/AuthLayout";
import LoginForm from "../components/auth/LoginForm";

function LoginPage() {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Continue your journaling journey"
    >
      <LoginForm />
    </AuthLayout>
  );
}

export default LoginPage;