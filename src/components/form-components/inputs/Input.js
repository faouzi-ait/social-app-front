import React from "react";
import { Field, ErrorMessage } from "formik";
import FormFieldError from "../../utils/FormFieldError";

function Input({ label, name, labelStyle, disabled, ...rest }) {
  return (
    <div className="form-control">
      <label htmlFor={name} className={labelStyle}>
        {label}
      </label>
      <Field name={name} id={name} {...rest} />
      <ErrorMessage name={name} component={FormFieldError} />
    </div>
  );
}

export default Input;
