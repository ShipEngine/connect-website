import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CodeWrapper } from "./CodeWrapper";

export const FormView = ({ form, getCode }) => {
  const [code, setCode] = useState(getCode({}));
  const { register, watch, formState: { errors }, setValue, reset } = useForm({ reValidateMode: 'onChange',  mode: 'onChange' });
  useEffect(() => {
    console.log(errors);
    const subscription = watch(value => {
      setCode(getCode(value));
    });
    return () => subscription.unsubscribe();
  }, [watch])
  return (
    <div>
      { form({register, errors, setValue, reset}) }
      <CodeWrapper>{code}</CodeWrapper>
    </div>
  );
};
