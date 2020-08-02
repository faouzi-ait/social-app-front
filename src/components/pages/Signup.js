import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import Input from "../form-components/inputs/Input";
import { errorBorder } from "../../js/jsUtils";
import { createUserAction } from "../../redux/actions/registration_actions";
import * as Yup from "yup";

const initialValues = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

const validationSchema = Yup.object({
  firstname: Yup.string().required("Please specify your firstname").min(3),
  lastname: Yup.string().required("Please specify your lastname").min(3),
  email: Yup.string()
    .email("Correct Format: me@web.com")
    .required("Email is required"),
  password: Yup.string().required("Password is required").min(6),
  passwordConfirm: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

function Signup() {
  const dispatch = useDispatch();
  const { registerConfirma, isCreationError, isCreatingUser } = useSelector(
    (state) => state.register
  );

  console.log(registerConfirma);

  const onSubmit = ({
    firstname,
    lastname,
    email,
    password,
    passwordConfirm,
  }) => {
    const payload = {
      firstname,
      lastname,
      email,
      password,
      confirmPassword: passwordConfirm,
    };
    dispatch(createUserAction(payload));
  };

  const SubmitMessage = ({ children, color }) => {
    return (
      <span
        style={{
          display: "inline-block",
          marginLeft: "1rem",
          color: `${color}`,
        }}
      >
        {children}
      </span>
    );
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
                  type="text"
                  label="Name"
                  name="firstname"
                  labelStyle="label-style"
                  errormessagestyle="label-style"
                  className="input-style"
                  style={errorBorder(
                    props.touched.firstname,
                    props.errors.firstname
                  )}
                />
              </div>
              <div className="input-display">
                <Input
                  control="input"
                  type="text"
                  label="Lastname"
                  name="lastname"
                  labelStyle="label-style"
                  errormessagestyle="label-style"
                  className="input-style"
                  style={errorBorder(
                    props.touched.lastname,
                    props.errors.lastname
                  )}
                />
              </div>
              <div className="input-display">
                <Input
                  control="input"
                  type="email"
                  label="Email"
                  name="email"
                  labelStyle="label-style"
                  errormessagestyle="label-style"
                  className="input-style"
                  style={errorBorder(props.touched.email, props.errors.email)}
                  disabled={isCreatingUser}
                />
              </div>

              <div className="input-display">
                <Input
                  control="input"
                  type="password"
                  label="Password"
                  name="password"
                  labelStyle="label-style"
                  errormessagestyle="label-style"
                  className="input-style"
                  style={errorBorder(
                    props.touched.password,
                    props.errors.password
                  )}
                />
              </div>
              <div className="input-display">
                <Input
                  control="input"
                  type="password"
                  label="Confirm Password"
                  name="passwordConfirm"
                  labelStyle="label-style"
                  errormessagestyle="label-style"
                  className="input-style"
                  style={errorBorder(
                    props.touched.passwordConfirm,
                    props.errors.passwordConfirm
                  )}
                />
              </div>
              <button
                type="submit"
                className="submit-style"
                disabled={isCreatingUser}
              >
                Submit
              </button>
              <SubmitMessage color="green">
                {registerConfirma !== "" && registerConfirma}
              </SubmitMessage>
              <SubmitMessage color="red">
                {isCreationError !== "" && isCreationError}
              </SubmitMessage>
              <SubmitMessage color="green">
                {isCreatingUser &&
                  isCreationError === "" &&
                  registerConfirma === "" &&
                  "Creating user..."}
              </SubmitMessage>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Signup;
