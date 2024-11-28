import {
  type FieldMetadata,
  getInputProps as conformGetInputProps,
} from '@conform-to/react';
import { type PropsWithoutRef, useState, useId, forwardRef } from 'react';
import { Label, Icon, type IconName } from '@veraclins-dev/ui';
import { cn } from '@veraclins-dev/utils';
import { ErrorList } from './error-list';

type InputProps = ReturnType<typeof conformGetInputProps>;

type Params = Parameters<typeof conformGetInputProps>;

export const getInputProps = (
  field: Params[0],
  { type }: Omit<Params[1], 'ariaAttributes'> = { type: 'text' },
) => {
  const props = conformGetInputProps(field, { ariaAttributes: true, type });
  if (!props.name) {
    props.name = field.name;
  }
  return props;
};

type BaseInputProps<S = string | null> = {
  leftIcon?: IconName;
  rightIcon?: IconName;
  name?: string;
  label?: string | React.ReactNode;
  topText?: string | React.ReactNode;
  rounded?: boolean;
  borderless?: boolean;
  field?: FieldMetadata<S>;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  bgClass?: string;
  inputClass?: string;
  noBottomMargin?: boolean;
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
  rounded?: boolean;
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
  rounded,
  className = 'h-10',
  borderless = true,
  children,
  label,
  labelProps,
  topText,
  field,
  wrapperRef,
  bgClass,
  noBottomMargin,
}: InputWrapperProps) => {
  const { errorId, id, errors } = useFieldProperties(field);
  return (
    <div
      className={cn('relative flex w-full flex-col', {
        'mb-2': !noBottomMargin,
      })}
      ref={wrapperRef}
    >
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
          'flex w-full flex-wrap items-center border text-sm text-input-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          rounded ? 'rounded-full' : 'rounded-md',
          borderless ? 'border-0' : 'border-1',
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
      rounded,
      className = 'h-10',
      borderless = true,
      inputRef,
      field,
      bgClass = 'bg-input',
      inputClass,
      noBottomMargin,
      ...props
    },
    ref,
  ) => {
    const isPassword = type === 'password';
    const [hidden, setHidden] = useState(isPassword);
    const toggleHidden: React.MouseEventHandler<SVGElement> = (e) => {
      e.preventDefault();
      setHidden(!hidden);
    };
    const { errorId, id } = useFieldProperties(field);
    const passwordIcon = hidden ? 'eye-open' : 'eye-none';
    return (
      <InputWrapper
        borderless={borderless}
        className={className}
        rounded={rounded}
        field={field}
        label={label}
        labelProps={labelProps}
        topText={topText}
        wrapperRef={ref}
        bgClass={bgClass}
        noBottomMargin={noBottomMargin}
      >
        {leftIcon && <Icon name={leftIcon} className="ml-3.5" size="sm" />}
        <input
          {...props}
          {...(field
            ? getInputProps(field, { type })
            : { name, 'aria-label': name })}
          ref={inputRef}
          id={id}
          aria-describedby={errorId}
          aria-invalid={errorId ? true : undefined}
          type={hidden ? 'password' : 'text'}
          className={cn(
            'h-full w-full flex-1 self-center border-0 px-3.5 py-2 text-base leading-normal focus:outline-none focus:ring-0',
            rounded ? 'rounded-full' : 'rounded-md',
            bgClass,
            inputClass,
          )}
        />
        {isPassword ? (
          <Icon
            size="md"
            name={passwordIcon}
            className="mr-3.5 cursor-pointer"
            onClick={toggleHidden}
          />
        ) : (
          rightIcon && (
            <Icon
              size="md"
              name={rightIcon}
              className="mr-3.5 cursor-pointer"
              onClick={toggleHidden}
            />
          )
        )}
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
      rounded,
      rightInlay,
      borderless = true,
      inputRef,
      field,
      bgClass = 'bg-input',
      inputClass,
      noBottomMargin,
      ...props
    },
    ref,
  ) => {
    const { errorId, id } = useFieldProperties(field);

    return (
      <InputWrapper
        borderless={borderless}
        className={className}
        rounded={rounded}
        field={field}
        label={label}
        labelProps={labelProps}
        topText={topText}
        wrapperRef={ref}
        bgClass={bgClass}
        noBottomMargin={noBottomMargin}
      >
        <textarea
          {...props}
          {...(field ? getInputProps(field) : {})}
          aria-invalid={errorId ? true : undefined}
          aria-describedby={errorId}
          id={id}
          rows={rows}
          ref={inputRef}
          className={cn(
            'h-full w-full flex-1 self-center border-0 px-3.5 py-2 text-base leading-normal focus:outline-none focus:ring-0',
            rounded ? 'rounded-full' : 'rounded-md',
            bgClass,
            inputClass,
          )}
        />
        {rightInlay ?? null}
      </InputWrapper>
    );
  },
);

TextareaField.displayName = 'TextareaField';
