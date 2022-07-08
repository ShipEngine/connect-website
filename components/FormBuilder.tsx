import * as React from "react";
import { Form, Button } from "react-bootstrap";
import { ErrorMessage } from "@hookform/error-message";

const Required = () => {
  return <span style={{ color: "red" }}>*</span>;
};

export const wrapInSingleQuotes = (text) => `'${text}'`;

export const required = {
  required: "This field is required" 
};

export const snakeCase = {
  pattern: {
    value: /^[a-z][a-z0-9_]*[a-z]$/,
    message: "Must be all lower case letters, numbers, and snake_cased",
  },
};

export const maxLength = (length:number) => {
  return {
    maxLength: {
      value: length,
      message: `The max length is ${length}`,
    }
  }
}

export const validationRules = (...args) => {
  return args.reduce((prev, current) => {
    return {
      ...prev,
      ...current,
    }
  }, {});
}

export interface SelectOption {
  value: string;
  text: string;
}

export class FormBuilder {
  errors;
  register;
  fields;
  fieldClass;
  constructor(register, errors) {
    this.errors = errors;
    this.register = register;
    this.fields = [];
    this.fieldClass = "pt-1";
  }

  withTextField(
    label: string,
    name: string,
    readOnly: boolean,
    description?: string,
    options?: any
  ) {
    const register = this.register;
    const errors = this.errors;
    const fieldClass = this.fieldClass;
    this.fields.push({
      render() {
        return (
          <Form.Group className={fieldClass}>
            {label ? (
              <Form.Label>
                {label}: {options?.required ? <Required /> : ""}
              </Form.Label>
            ) : (
              ""
            )}
            <Form.Control readOnly={readOnly} {...register(name, options)} />
            {description ? (
              <Form.Text className="text-muted">{description}</Form.Text>
            ) : (
              ""
            )}
            <ErrorMessage
              errors={errors}
              name={name}
              render={({ message }) => (
                <p>
                  <i className="text-danger">{message}</i>
                </p>
              )}
            />
          </Form.Group>
        );
      },
    });
    return this;
  }

  withFieldClass(fieldClass: string) {
    this.fieldClass = fieldClass;
    return this;
  }

  withSwitch(label: string, name: string, description?: string) {
    const register = this.register;
    this.fields.push({
      render() {
        return (
          <Form.Group className="pt-4">
            <Form.Check type="switch" label={label} {...register(name)} />
            {description ? (
              <Form.Text className="text-muted">{description}</Form.Text>
            ) : (
              ""
            )}
          </Form.Group>
        );
      },
    });
    return this;
  }

  withMultiSelect(
    label: string,
    name: string,
    options: SelectOption[] | string[],
    description?: string
  ) {
    const register = this.register;
    const fieldClass = this.fieldClass;
    this.fields.push({
      render() {
        return (
          <Form.Group className={fieldClass}>
            <Form.Label>{label}:</Form.Label>
            <Form.Control as="select" multiple {...register(name)}>
              {options.map((o) => {
                if (typeof o === "string") {
                  return <option value={o}>{o}</option>;
                }
                return <option value={o.value}>{o.text}</option>;
              })}
            </Form.Control>
            {description ? (
              <Form.Text className="text-muted">{description}</Form.Text>
            ) : (
              ""
            )}
          </Form.Group>
        );
      },
    });
    return this;
  }

  withSelect(
    label: string,
    name: string,
    options: SelectOption[] | string[],
    description?: string
  ) {
    const register = this.register;
    const fieldClass = this.fieldClass;
    this.fields.push({
      render() {
        return (
          <Form.Group className={fieldClass}>
            <Form.Label>{label}:</Form.Label>
            <Form.Control as="select" {...register(name)}>
              {options.map((o) => {
                if (typeof o === "string") {
                  return <option value={o}>{o}</option>;
                }
                return <option value={o.value}>{o.text}</option>;
              })}
            </Form.Control>
            {description ? (
              <Form.Text className="text-muted">{description}</Form.Text>
            ) : (
              ""
            )}
          </Form.Group>
        );
      },
    });
    return this;
  }

  withButton(text: string, variant: string, onClick: any) {
    const fieldClass = this.fieldClass;
    this.fields.push({
      render() {
        return (
          <Button className={fieldClass} variant={variant} onClick={onClick}>
            {text}
          </Button>
        );
      },
    });
    return this;
  }

  render() {
    return <Form>{this.fields.map((field) => field.render())}</Form>;
  }
}
