import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CodeWrapper } from "./CodeWrapper";

export const FormView = ({ form, getCode }) => {
  const [code, setCode] = useState(getCode({}));
  const { register, watch, formState: { errors } } = useForm({ criteriaMode: 'all' });
  useEffect(() => {
    const subscription = watch(value => {
      setCode(getCode(value));
    });
    return () => subscription.unsubscribe();
  }, [watch])
  return (
    <div>
      { form({register, errors}) }
      <CodeWrapper>{code}</CodeWrapper>
    </div>
  );
};
