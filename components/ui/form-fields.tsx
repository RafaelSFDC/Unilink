"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";

interface FieldShellProps {
  label: string;
  name: string;
  errors?: Array<{ message?: string } | undefined>;
  description?: string;
  className?: string;
  children: React.ReactNode;
}

export function FieldShell({
  label,
  name,
  errors,
  description,
  className,
  children,
}: FieldShellProps) {
  return (
    <Field className={cn("gap-2", className)} data-invalid={errors?.length ? true : undefined}>
      <FieldLabel
        htmlFor={name}
        className="text-xs font-black uppercase tracking-widest"
      >
        {label}
      </FieldLabel>
      <FieldContent>
        {children}
        {description ? (
          <FieldDescription className="text-xs font-bold uppercase opacity-60">
            {description}
          </FieldDescription>
        ) : null}
        <FieldError className="text-xs font-black uppercase" errors={errors} />
      </FieldContent>
    </Field>
  );
}

function normalizeErrors(errors: unknown[] | undefined) {
  if (!errors?.length) {
    return undefined;
  }

  return errors
    .map((error) => {
      if (typeof error === "string" && error.trim()) {
        return { message: error };
      }

      if (
        error &&
        typeof error === "object" &&
        "message" in error &&
        typeof error.message === "string" &&
        error.message.trim()
      ) {
        return { message: error.message };
      }

      return undefined;
    })
    .filter(Boolean);
}

interface TextFieldProps {
  field: {
    name: string;
    state: {
      value: string;
      meta: {
        errors: unknown[];
        isTouched: boolean;
      };
    };
    handleChange: (value: string) => void;
    handleBlur: () => void;
  };
  label: string;
  type?: string;
  placeholder?: string;
  description?: string;
  className?: string;
  inputClassName?: string;
  autoComplete?: string;
  disabled?: boolean;
  trailing?: React.ReactNode;
  onValueChange?: (value: string) => void;
}

export function TextField({
  field,
  label,
  type = "text",
  placeholder,
  description,
  className,
  inputClassName,
  autoComplete,
  disabled,
  trailing,
  onValueChange,
}: TextFieldProps) {
  const errors = field.state.meta.isTouched
    ? normalizeErrors(field.state.meta.errors)
    : undefined;

  return (
    <FieldShell
      label={label}
      name={field.name}
      errors={errors}
      description={description}
      className={className}
    >
      <div className="relative">
        <Input
          id={field.name}
          name={field.name}
          type={type}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(event) => {
            field.handleChange(event.target.value);
            onValueChange?.(event.target.value);
          }}
          placeholder={placeholder}
          autoComplete={autoComplete}
          disabled={disabled}
          aria-invalid={errors?.length ? true : undefined}
          className={cn(
            "h-14 text-lg border-2",
            trailing ? "pr-24" : undefined,
            inputClassName,
          )}
        />
        {trailing ? (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {trailing}
          </div>
        ) : null}
      </div>
    </FieldShell>
  );
}

interface TextareaFieldProps {
  field: {
    name: string;
    state: {
      value: string;
      meta: {
        errors: unknown[];
        isTouched: boolean;
      };
    };
    handleChange: (value: string) => void;
    handleBlur: () => void;
  };
  label: string;
  placeholder?: string;
  description?: string;
  rows?: number;
  className?: string;
  textareaClassName?: string;
  disabled?: boolean;
}

export function TextareaField({
  field,
  label,
  placeholder,
  description,
  rows = 3,
  className,
  textareaClassName,
  disabled,
}: TextareaFieldProps) {
  const errors = field.state.meta.isTouched
    ? normalizeErrors(field.state.meta.errors)
    : undefined;

  return (
    <FieldShell
      label={label}
      name={field.name}
      errors={errors}
      description={description}
      className={className}
    >
      <Textarea
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(event) => field.handleChange(event.target.value)}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        aria-invalid={errors?.length ? true : undefined}
        className={cn("text-lg border-2 resize-none", textareaClassName)}
      />
    </FieldShell>
  );
}

interface SelectOption {
  label: string;
  value: string;
}

interface SelectFieldProps {
  field: {
    name: string;
    state: {
      value: string;
      meta: {
        errors: unknown[];
        isTouched: boolean;
      };
    };
    handleChange: (value: string) => void;
    handleBlur: () => void;
  };
  label: string;
  options: SelectOption[];
  description?: string;
  className?: string;
  triggerClassName?: string;
  disabled?: boolean;
}

export function SelectField({
  field,
  label,
  options,
  description,
  className,
  triggerClassName,
  disabled,
}: SelectFieldProps) {
  const errors = field.state.meta.isTouched
    ? normalizeErrors(field.state.meta.errors)
    : undefined;

  return (
    <FieldShell
      label={label}
      name={field.name}
      errors={errors}
      description={description}
      className={className}
    >
      <Select
        name={field.name}
        value={field.state.value}
        onValueChange={field.handleChange}
        disabled={disabled}
      >
        <SelectTrigger
          id={field.name}
          onBlur={field.handleBlur}
          aria-invalid={errors?.length ? true : undefined}
          className={cn("h-12 border-2", triggerClassName)}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="font-bold uppercase text-xs"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FieldShell>
  );
}

interface ColorFieldProps {
  field: {
    name: string;
    state: {
      value: string;
      meta: {
        errors: unknown[];
        isTouched: boolean;
      };
    };
    handleChange: (value: string) => void;
    handleBlur: () => void;
  };
  label: string;
  placeholder?: string;
  description?: string;
  className?: string;
  textInputClassName?: string;
  disabled?: boolean;
}

export function ColorField({
  field,
  label,
  placeholder,
  description,
  className,
  textInputClassName,
  disabled,
}: ColorFieldProps) {
  const errors = field.state.meta.isTouched
    ? normalizeErrors(field.state.meta.errors)
    : undefined;

  return (
    <FieldShell
      label={label}
      name={field.name}
      errors={errors}
      description={description}
      className={className}
    >
      <div className="flex items-center space-x-3">
        <Input
          id={field.name}
          name={field.name}
          type="color"
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(event) => field.handleChange(event.target.value)}
          disabled={disabled}
          aria-invalid={errors?.length ? true : undefined}
          className="w-16 h-12 p-1 border-2"
        />
        <Input
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(event) => field.handleChange(event.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={errors?.length ? true : undefined}
          className={cn(
            "flex-1 h-12 border-2 uppercase font-mono",
            textInputClassName,
          )}
        />
      </div>
    </FieldShell>
  );
}
