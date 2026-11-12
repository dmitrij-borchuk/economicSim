import MuiTextField, { type TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';

import { styled } from '@mui/material/styles';

export type TextFieldProps = MuiTextFieldProps;
export const TextField = ({ ref, ...props }: TextFieldProps) => {
  return <StyledTextField ref={ref} {...props} />;
};

const StyledTextField = styled(MuiTextField)(() => ({
}));
