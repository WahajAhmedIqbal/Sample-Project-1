import React, { Fragment, PureComponent } from "react";
import { Input, Form } from "antd";
class Inputs extends PureComponent {
  componentDidUpdate = (prevProps) => {
    const { errors, value } = this.props;
    if (errors !== prevProps.errors || value !== prevProps.value) {
      this.props.validateField({ errors, value });
    }
  };

  render = () => {
    const { errors, label, name, touched, validateField, ...rest } = this.props;
    return (
      <Fragment>
        <Form.Item htmlFor={name} style={{ display: "block" }}>
          {label}
        </Form.Item>
        <Input {...rest} name={name} />
        {errors && touched && (
          <div style={{ color: "red", marginTop: ".5rem" }}>{errors}</div>
        )}
      </Fragment>
    );
  };
}

export default Inputs;
