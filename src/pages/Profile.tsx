import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import api from "../api/axios";
import { useAuth } from "../auth/useAuth";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Input from "../components/Input";
import Button from "../components/Button";
import { profileSchema } from "../utils/validation";
import { toast } from "react-toastify";
import bgImage from "../assets/background.jpg";

const Profile = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/users/me")
      .then((res) => {
        setName(res.data.data.name);
        setEmail(res.data.data.email);
      })
      .catch(() => {
        toast.error("Failed to load profile");
      })
      .finally(() => setLoading(false));
  }, []);



  if (loading)
    return (
      <div className="min-h-screen relative" style={{backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed'}}>
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm"></div>
        <div className="relative z-10">
        <Navbar />
        <div className="flex justify-center items-center h-96">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-accent-500"></div>
        </div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen relative" style={{backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed'}}>
      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm"></div>
      <div className="relative z-10">
      <Navbar />
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-2">My Profile</h1>
            <p className="text-gray-600">Manage your account settings</p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-xl mb-6 border border-primary-100">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Profile Information</h2>

            <Formik
              initialValues={{ name }}
              validationSchema={profileSchema}
              enableReinitialize
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  await api.patch("/users/me", { name: values.name });
                  toast.success("Profile updated successfully");
                } catch {
                  toast.error("Failed to update profile");
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({ isSubmitting, values, handleChange, errors, touched }) => (
                <Form>
                  <Input
                    type="text"
                    value={values.name}
                    onChange={handleChange("name")}
                    error={touched.name ? errors.name : ""}
                    label="Name"
                    required
                  />

                  <Input
                    type="email"
                    value={email}
                    onChange={() => {}}
                    label="Email"
                    disabled
                  />

                  <Button type="submit" disabled={isSubmitting} className="w-full" size="lg">
                    {isSubmitting ? "Updating..." : "Update Profile"}
                  </Button>
                </Form>
              )}
            </Formik>
          </div>


        </div>
      </div>
      </div>
    </div>
  );
};

export default Profile;
