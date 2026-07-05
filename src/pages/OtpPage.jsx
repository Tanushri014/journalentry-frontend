import AuthLayout from "../components/auth/AuthLayout";
import OtpForm from "../components/auth/OtpForm";

function OtpPage() {
  return (
    <AuthLayout
      title="Verify your email"
      subtitle="We've sent a 4-digit verification code to your email."
    >
      <OtpForm />
    </AuthLayout>
  );
}

export default OtpPage;