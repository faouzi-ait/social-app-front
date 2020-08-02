import React from "react";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Input from "../form-components/inputs/Input";
import { errorBorder } from "../../js/jsUtils";
import { authenticateAction } from "../../redux/actions/login_actions";
import * as Yup from "yup";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Correct Format: me@web.com")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

function Login() {
  const { errors } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const onSubmit = ({ email, password }) => {
    const payload = {
      email,
      password,
    };
    dispatch(authenticateAction(payload));
  };

  return (
    <div className="login-layout">
      <div className="form-layout">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(props) => (
            <Form autoComplete="off">
              <div className="input-display">
                <Input
                  control="input"
                  type="email"
                  label="Email"
                  name="email"
                  style={errorBorder(props.touched.email, props.errors.email)}
                  labelStyle="label-style"
                  className="input-style"
                />
              </div>

              <div className="input-display">
                <Input
                  control="input"
                  type="password"
                  label="Password"
                  name="password"
                  style={errorBorder(
                    props.touched.password,
                    props.errors.password
                  )}
                  labelStyle="label-style"
                  className="input-style"
                />
              </div>
              <button
                type="submit"
                className="submit-style"
                style={{
                  display: "inline-block",
                  marginRight: "1rem",
                }}
              >
                Submit
              </button>
              <span
                style={{
                  display: "inline-block",
                  color: "red",
                }}
              >
                {errors && "Login failed, please try again"}
              </span>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Login;
