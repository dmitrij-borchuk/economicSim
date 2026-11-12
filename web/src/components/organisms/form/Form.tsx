import type { FormHTMLAttributes, ReactNode } from 'react';
import {
  FormProvider,
  type UseFormReturn,
  type FieldValues,
  type SubmitHandler,
} from 'react-hook-form';

export interface FormProps<TFieldValues extends FieldValues>
  extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  form: UseFormReturn<TFieldValues>;
  onSubmit?: SubmitHandler<TFieldValues>;
  children: ReactNode;
}

export const Form = <TFieldValues extends FieldValues>({
  form,
  onSubmit,
  children,
  noValidate = true,
  ...rest
}: FormProps<TFieldValues>) => {
  return (
    <FormProvider {...form}>
      <form
        onSubmit={onSubmit ? form.handleSubmit(onSubmit) : undefined}
        noValidate={noValidate}
        {...rest}
      >
        {children}
      </form>
    </FormProvider>
  );
};
