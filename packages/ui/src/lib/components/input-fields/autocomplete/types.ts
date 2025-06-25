import { type Option } from '../../../types';
import { type TextFieldProps } from '../textfield';

import { type SeparatorName } from './utils';

type Options = Option<string>[];

export interface AutocompleteProps
  extends Omit<TextFieldProps, 'value' | 'onChange'> {
  options: Options;
  maxOptions?: number;
  dependsOn?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disableSorting?: boolean;
  shouldReset?: boolean;
  freeSolo?: boolean;
  separator?: SeparatorName;
}
