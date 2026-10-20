import { CheckboxProps as MuiCheckboxProps } from '@mui/material/Checkbox';

export type CheckboxProps = Omit<MuiCheckboxProps, 'icon' | 'checkedIcon'>;
