import debounce from "lodash/debounce";
import React from "react";
import { withFormik } from "formik";
import Inputs from "../../components/Input";
import DisplayFormikState from "../../components/DisplayFormState";
import { resetMessage, setMessage } from "../../store/actions/message";
import store from "../../store";
import { Button } from "antd";
import * as Yup from "yup";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required!"),
    name: Yup.string().required("First Name should be required please"),
    password: Yup.string().min(4).max(15).required(),
  }),
  mapPropsToValues: (props) => ({
    email: "",
    name: "",
  }),
  handleSubmit: (values, { setSubmitting }) => {
    const payload = {
      ...values,
    };

    setTimeout(() => {
      alert(JSON.stringify(payload, null, 2));
      setSubmitting(false);
    }, 1000);
  },
  displayName: "MyForm",
});

const handleFormReset = (handleReset) => {
  store.dispatch(resetMessage());
  handleReset();
};

const validateField = debounce(
  ({ errors, value }) =>
    !errors && value
      ? store.dispatch(setMessage())
      : store.dispatch(resetMessage()),
  500
);

const MyForm = (props) => {
  const {
    values,
    touched,
    dirty,
    errors,
    handleBlur,
    handleChange,
    handleReset,
    handleSubmit,
    isSubmitting,
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Inputs
        name="email"
        label="Email"
        type="email"
        placeholder="Enter an email address."
        errors={errors.email}
        value={values.email}
        touched={touched.email}
        onChange={handleChange}
        onBlur={handleBlur}
        validateField={validateField}
      />

      <Inputs
        name="name"
        label="Name"
        type="name"
        placeholder="Enter an name."
        errors={errors.name}
        value={values.name}
        touched={touched.name}
        onChange={handleChange}
        onBlur={handleBlur}
        validateField={validateField}
      />
      <Inputs
        name="password"
        label="password"
        type="password"
        placeholder="Enter an password."
        errors={errors.password}
        value={values.password}
        touched={touched.password}
        onChange={handleChange}
        onBlur={handleBlur}
        validateField={validateField}
      />
      <button
        type="button"
        className="outline"
        onClick={() => handleFormReset(handleReset)}
        disabled={!dirty || isSubmitting}
      >
        Reset
      </button>
      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>

      <DisplayFormikState {...props} />
    </form>
  );
};

export default formikEnhancer(MyForm);
