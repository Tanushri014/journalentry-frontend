import AuthLayout from "../components/auth/AuthLayout";
import RegisterForm from "../components/auth/RegisterForm";

function RegisterPage() {
  return (
    <AuthLayout
      title="Begin your story"
      subtitle="Create your private journal space"
    >
      <RegisterForm />
    </AuthLayout>
  );
}

export default RegisterPage;