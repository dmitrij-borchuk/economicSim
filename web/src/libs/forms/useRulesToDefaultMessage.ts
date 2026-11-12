import { type FieldValues, type Path, type RegisterOptions } from 'react-hook-form';

export function useRulesToDefaultMessage<T extends FieldValues>(options?: RegisterOptions<T, Path<T>>) {
  const maxLength =
    typeof options?.maxLength === 'number'
      ? {
          maxLength: {
            value: options.maxLength,
            message: `Maximum length is ${options.maxLength}`,
          },
        }
      : {};
  const minLength =
    typeof options?.minLength === 'number'
      ? {
          minLength: {
            value: options.minLength,
            message: `Minimum length is ${options.minLength}`,
          },
        }
      : {};

  return {
    ...options,
    ...maxLength,
    ...minLength,
  };
}
