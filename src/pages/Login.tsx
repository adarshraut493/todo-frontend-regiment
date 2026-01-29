import { useNavigate, Link } from "react-router-dom";
import { Formik, Form } from "formik";
import { useAuth } from "../auth/useAuth";
import { loginSchema } from "../utils/validation";
import Input from "../components/Input";
import Button from "../components/Button";
import { toast } from "react-toastify";
import bgImage from "../assets/background.jpg";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await login(values.email, values.password);
            navigate("/todos");
          } catch {
            toast.error("Invalid email or password");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, values, handleChange, errors, touched }) => (
          <Form className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-md relative z-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-2">Welcome Back</h2>
              <p className="text-gray-600">Sign in to your account</p>
            </div>

            <Input
              type="email"
              placeholder="Enter your email"
              value={values.email}
              onChange={handleChange("email")}
              error={touched.email ? errors.email : ""}
              label="Email"
              required
            />

            <Input
              type="password"
              placeholder="Enter your password"
              value={values.password}
              onChange={handleChange("password")}
              error={touched.password ? errors.password : ""}
              label="Password"
              required
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2"
              size="lg"
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </Button>

            <p className="text-sm text-center mt-6 text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary-600 hover:text-primary-700 font-semibold transition-colors">
                Sign up
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
