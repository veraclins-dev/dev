import {
  type FieldMetadata,
  getInputProps as conformGetInputProps,
} from '@conform-to/react';
import {
  type PropsWithoutRef,
  useState,
  useId,
  forwardRef,
  useCallback,
} from 'react';
import { cn } from '@veraclins-dev/utils';
import { ErrorList } from './error-list';
import { Icon, IconName } from '../ui/icon';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { MaybeString } from '../../types';

type InputProps = ReturnType<typeof conformGetInputProps>;

type Params = Parameters<typeof conformGetInputProps>;

type GetPropsOptions = {
  field?: Params[0];
  name?: TextFieldProps['name'];
  id?: TextFieldProps['id'];
} & Partial<Omit<Params[1], 'ariaAttributes'>>;

export const getInputProps = ({
  type = 'text',
  field,
  name,
  id,
}: GetPropsOptions) => {
  if (!field) {
    return {
      type,
      key: undefined,
      defaultValue: undefined,
      name,
      'aria-label': name,
      id,
    };
  }
  const props = conformGetInputProps(field, { ariaAttributes: true, type });
  if (!props.name) {
    props.name = field.name ?? name;
  }
  if (!props.id) {
    props.id = field.id ?? id;
  }
  return props;
};

export type BaseInputProps<S = MaybeString> = {
  leftIcon?: IconName;
  rightIcon?: IconName;
  rightAddon?: React.ReactNode;
  name?: string;
  label?: string | React.ReactNode;
  topText?: string | React.ReactNode;
  borderless?: boolean;
  field?: FieldMetadata<S>;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  bgClass?: string;
  inputClass?: string;
};

export interface TextFieldProps
  extends PropsWithoutRef<JSX.IntrinsicElements['input']>,
    BaseInputProps {
  inputRef?: React.Ref<HTMLInputElement>;
  type?: InputProps['type'];
}

export interface TextareaFieldProps
  extends PropsWithoutRef<JSX.IntrinsicElements['textarea']>,
    BaseInputProps {
  rightInlay?: React.ReactNode;
  inputRef?: React.Ref<HTMLTextAreaElement>;
}

interface InputWrapperProps
  extends React.HTMLAttributes<HTMLDivElement>,
    BaseInputProps {
  children: React.ReactNode;
  borderless?: boolean;
  wrapperRef?: React.Ref<HTMLDivElement>;
}

export function useFieldProperties<S = string>(
  field?: BaseInputProps<S>['field'],
) {
  const fallbackId = useId();
  const id = field?.id ?? field?.name ?? fallbackId;
  const hasErrors = !!field?.errors?.length;
  return {
    errorId: hasErrors ? `${id}-error` : undefined,
    errors: field?.errors,
    id,
  };
}

export const InputWrapper = ({
  className = 'h-10',
  borderless = true,
  children,
  label,
  labelProps,
  topText,
  field,
  wrapperRef,
  bgClass,
}: InputWrapperProps) => {
  const { errorId, id, errors } = useFieldProperties(field);
  return (
    <div className={cn('relative flex w-full flex-col')} ref={wrapperRef}>
      {(label || topText) && (
        <div className="mb-1 flex justify-between">
          {label && (
            <Label {...labelProps} htmlFor={id} className="block font-medium">
              {label}
            </Label>
          )}
          {topText && (
            <span className="justify-self-end text-sm italic">{topText}</span>
          )}
        </div>
      )}
      <div
        aria-invalid={errorId ? true : undefined}
        className={cn(
          'flex w-full flex-wrap items-center rounded-md border text-sm text-input-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          borderless ? 'border-0' : 'border',
          bgClass,
          className,
        )}
      >
        {children}
      </div>
      {errorId ? (
        <div className="py-1">
          <ErrorList id={errorId} errors={errors} />
        </div>
      ) : null}
    </div>
  );
};

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      name,
      label,
      leftIcon,
      rightIcon,
      type = 'text',
      labelProps,
      topText,
      className = 'h-10',
      borderless = true,
      inputRef,
      field,
      bgClass = 'bg-input',
      inputClass,
      rightAddon,
      ...props
    },
    ref,
  ) => {
    const isPassword = type === 'password';
    const [hidden, setHidden] = useState(isPassword);
    const toggleHidden: React.MouseEventHandler<SVGElement> = useCallback(
      (e) => {
        e.preventDefault();
        setHidden(!hidden);
      },
      [hidden],
    );
    const { errorId, id } = useFieldProperties(field);
    const passwordIcon = hidden ? 'eye-open' : 'eye-none';

    const { key, ...inputProps } = getInputProps({ field, type, name });

    return (
      <InputWrapper
        borderless={borderless}
        className={className}
        field={field}
        label={label}
        labelProps={labelProps}
        topText={topText}
        wrapperRef={ref}
        bgClass={bgClass}
      >
        {leftIcon && <Icon name={leftIcon} className="ml-3.5" size="sm" />}
        <Input
          {...props}
          {...inputProps}
          key={key}
          ref={inputRef}
          id={id}
          aria-describedby={errorId}
          aria-invalid={errorId ? true : undefined}
          type={isPassword && !hidden ? 'text' : type}
          className={cn(bgClass, inputClass)}
        />
        {isPassword ? (
          <Icon
            size="md"
            name={passwordIcon}
            className="mr-3.5 cursor-pointer"
            onClick={toggleHidden}
          />
        ) : rightIcon ? (
          <Icon
            size="md"
            name={rightIcon}
            className="mr-3.5 cursor-pointer"
            onClick={toggleHidden}
          />
        ) : null}
        {rightAddon}
      </InputWrapper>
    );
  },
);

TextField.displayName = 'TextField';

export const TextareaField = forwardRef<HTMLDivElement, TextareaFieldProps>(
  (
    {
      label,
      labelProps,
      topText,
      className,
      rows = 4,
      rightInlay,
      borderless = true,
      inputRef,
      field,
      bgClass = 'bg-input',
      inputClass,
      name,
      ...props
    },
    ref,
  ) => {
    const { errorId, id } = useFieldProperties(field);
    const { key, ...inputProps } = getInputProps({ field, name });

    return (
      <InputWrapper
        borderless={borderless}
        className={className}
        field={field}
        label={label}
        labelProps={labelProps}
        topText={topText}
        wrapperRef={ref}
        bgClass={bgClass}
      >
        <Textarea
          {...props}
          key={key}
          {...inputProps}
          aria-invalid={errorId ? true : undefined}
          aria-describedby={errorId}
          id={id}
          rows={rows}
          ref={inputRef}
          className={cn(
            'h-full w-full flex-1 self-center border-0 px-3.5 py-2 text-base leading-normal focus:outline-none focus:ring-0',
            bgClass,
            inputClass,
          )}
        />
        {rightInlay ? (
          <span className="absolute bottom-0.5 right-0.5">{rightInlay}</span>
        ) : null}
      </InputWrapper>
    );
  },
);

TextareaField.displayName = 'TextareaField';
