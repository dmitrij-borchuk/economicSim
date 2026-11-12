import { type FieldValues, type Path, type RegisterOptions, useFormContext } from 'react-hook-form';
import { useRulesToDefaultMessage, getErrorMessage } from '@/libs/forms';
import { TextField, type TextFieldProps } from '@/molecules';

export type FormTextFieldProps<T extends FieldValues> = Omit<TextFieldProps, 'name'> & {
  name: Path<T>;
  requiredMessage?: boolean;
  options?: RegisterOptions<T, Path<T>>;
};
/**
 * Wrapper around `TextField` that integrates with react-hook-form.
 */
export function FormTextField<T extends FieldValues>({
  name,
  required,
  requiredMessage,
  options,
  helperText,
  ...props
}: FormTextFieldProps<T>) {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();
  const error = errors[name];
  const parsedOptions = useRulesToDefaultMessage(options);

  return (
    // @ts-expect-error TODO: fix typing
    <TextField
      {...props}
      required={required}
      error={!!error}
      helperText={getErrorMessage(error) ? getErrorMessage(error) : helperText}
      {...register(name, {
        ...parsedOptions,
        ...(required
          ? {
            required: requiredMessage ?? 'Required',
          }
          : {}),
      })}
    />
  );
}
