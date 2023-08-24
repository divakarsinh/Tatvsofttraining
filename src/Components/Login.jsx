import React from "react";
import { Formik, Form } from "formik";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import * as Yup from "yup";
import { useTheme } from "./ThemeProvider";
import AuthService from "../Services/AuthService";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext"; // Import the useAuth hook

const Login = () => {
  const theme = useTheme();
  const { login } = useAuth(); // Use the login function from the AuthContext

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    console.log("Email:", values.email);
    console.log("Password:", values.password);

    const payload = {
      email: values.email,
      password: values.password,
    };

    try {
      const response = await AuthService.Login(payload);
      console.log(response);
      // Handle successful login (e.g., redirect to dashboard)
      toast.success("Login successful!"); 

      // Use the login function from AuthContext to set authentication state
      login(response);
      // console.log(response.user);

      navigate("/");
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message);
      toast.error("Login failed. Please try again."); // Display error toast
    }
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, errors, touched }) => (
        <Form>
          <div className="form-demo">
            <Typography
              variant="h3"
              sx={{ color: "red", fontFamily: "'Montserrat', sans-serif" }}
            >
              Login
            </Typography>

            <div sx={{ my: 2 }}>
              <TextField
                label="Email"
                variant="outlined"
                name="email"
                value={values.email}
                onChange={(e) => setFieldValue("email", e.target.value)}
                autoComplete="off"
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
            </div>

            <div sx={{ my: 2 }}>
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                name="password"
                value={values.password}
                onChange={(e) => setFieldValue("password", e.target.value)}
                autoComplete="off"
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
            </div>

            <Button
              variant="contained"
              style={{ ...theme.buttons.primary }}
              type="submit"
            >
              Login
            </Button>
            <Link to="/contact" className="login-link">
              Don't have an account? Register here
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
