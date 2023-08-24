import React from "react";
import { Formik, Form } from "formik";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import * as Yup from "yup";
import "./Form.css";
import { useTheme } from "./ThemeProvider";
import AuthService from "../Services/AuthService";
import { toast,} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS
import { Link } from 'react-router-dom';

const FormComponent = () => {
  const theme = useTheme();
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(8).required("Password is required"),
  });

  const handleSubmit = async (values) => {
    const payload = {
      firstName: values.username,
      lastName: "test",
      email: values.email,
      roleId: 2,
      password: values.password,
    };

    try {
      const response = await AuthService.Register(payload);
      console.log(response);
      toast.success("Registration successful!"); // Display success toast
    } catch (error) {
      console.error("Registration failed:", error.response?.data?.message);
      toast.error("Registration failed. Please try again."); // Display error toast
    }
  };

  return (
    <Formik
      initialValues={{
        username: "",
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
              Registration Form
            </Typography>

            <div sx={{ my: 2 }}>
              <TextField
                label="Full Name"
                variant="outlined"
                name="username"
                value={values.username}
                onChange={(e) => setFieldValue("username", e.target.value)}
                autoComplete="off"
                error={touched.username && Boolean(errors.username)}
                helperText={touched.username && errors.username}
              />
            </div>

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
              Register
            </Button>
            <Link
              to="/login"
              className="login-link"
              // style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Already have an account? Login here
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormComponent;
