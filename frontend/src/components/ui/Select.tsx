/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {ReactNode} from 'react';
import ReactSelect, {FormatOptionLabelMeta} from 'react-select';

// hooks
import {useTheme} from '~/components/ThemeProvider';

/**
 * Interface for select options
 * @description Defines the structure of individual options in the select dropdown
 */
export interface SelectOption {
  /** Additional properties to be passed */
  [key: string]: any;

  /** The value of the option, used for identification */
  value: string;
  /** The display label for the option */
  label: string;
  /** Whether the option is disabled */
  disabled?: boolean;
}

/**
 * Interface for grouped select options
 * @description Defines the structure of grouped options in the select dropdown
 */
export interface GroupedOption {
  /** Additional properties to be passed */
  [key: string]: any;

  /** The display label for the option */
  label: string;
  /** List of select options */
  options?: SelectOption[];
}

/**
 * Interface for Select component props
 * @description Defines all available props for the Select component
 *
 * @example
 * ```tsx
 * <Select
 *   label="Choose a fruit"
 *   options={[
 *     { value: 'apple', label: 'Apple' },
 *     { value: 'banana', label: 'Banana', disabled: true },
 *   ]}
 *   onChange={(value) => console.log(value)}
 * />
 * ```
 *
 * @developer
 * - Uses react-select for enhanced dropdown functionality
 * - Automatically applies theme colors (light/dark)
 * - Supports all react-select props
 */
export interface SelectProps {
  /** Optional label displayed above the select input */
  label?: string | React.ReactNode;
  /** Optional error message displayed below the select input */
  error?: string;
  /** Array of options to populate the select */
  options: (GroupedOption | SelectOption)[];
  /** The value of the select */
  value?: string | string[];
  /** Callback function when value changes */
  onChange?: (value: string | string[]) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Whether the select is disabled */
  isDisabled?: boolean;
  /** Whether the select is searchable */
  isSearchable?: boolean;
  /** Whether the select allows multi-selection */
  isMulti?: boolean;
  /** Whether the select allows clearing the value */
  isClearable?: boolean;
  /** Custom class name */
  className?: string;
  /** Custom class names for different parts of the select */
  classNamePrefix?: string;
  /** Whether to show the dropdown indicator */
  showDropdownIndicator?: boolean;
  /** Custom styles */
  styles?: any;
  /** Custom components */
  components?: any;
  /** Whether to show the label */
  showLabel?: boolean;
  /** Width of the select */
  width?: string;
  /** Height of the select */
  height?: string;

  /** Function to get the label from an option */
  getOptionLabel?(option: SelectOption): string;

  /** Function to get the value from an option */
  getOptionValue?(option: SelectOption): string;

  /** Custom function to format the option label in the dropdown */
  formatOptionLabel?(data: SelectOption, context: FormatOptionLabelMeta<SelectOption>): ReactNode;

  /** Additional props to pass to the react-select component */
  [key: string]: any;
}

// Theme-based styles
const themeStyles = ({showDropdownIndicator}: { showDropdownIndicator: boolean }) => ({
  light: {
    control: (provided: any) => ({
      ...provided,
      backgroundColor: 'white',
      borderColor: '#e2e8f0',
      borderRadius: '0.375rem',
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#cbd5e1',
      },
      '&:focus-within': {
        borderColor: '#3b82f6',
        boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
      },
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: 'white',
      borderRadius: '0.375rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      marginTop: '0.25rem',
      zIndex: 50,
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#3b82f6' : state.isFocused ? '#f1f5f9' : 'white',
      color: state.isSelected ? 'white' : '#1e293b',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: '#f1f5f9',
      },
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: '#1e293b',
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: '#94a3b8',
    }),
    indicatorSeparator: (provided: any) => ({
      ...provided,
      display: showDropdownIndicator ? 'block' : 'none',
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      color: '#64748b',
      '&:hover': {
        color: '#334155',
      },
    }),
    clearIndicator: (provided: any) => ({
      ...provided,
      color: '#64748b',
      '&:hover': {
        color: '#334155',
      },
    }),
  },
  dark: {
    control: (provided: any) => ({
      ...provided,
      backgroundColor: '#1e293b',
      borderColor: '#334155',
      borderRadius: '0.375rem',
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#475569',
      },
      '&:focus-within': {
        borderColor: '#3b82f6',
        boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
      },
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: '#1e293b',
      borderRadius: '0.375rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      marginTop: '0.25rem',
      zIndex: 50,
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#3b82f6' : state.isFocused ? '#334155' : '#1e293b',
      color: state.isSelected ? 'white' : '#f1f5f9',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: '#334155',
      },
    }),
    input: (provided: any) => ({
      ...provided,
      // Change the color of the text the user types
      color: '#bbbfc5',
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: '#f1f5f9',
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: '#78889f',
    }),
    indicatorSeparator: (provided: any) => ({
      ...provided,
      display: showDropdownIndicator ? 'block' : 'none',
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      color: '#94a3b8',
      '&:hover': {
        color: '#f1f5f9',
      },
    }),
    clearIndicator: (provided: any) => ({
      ...provided,
      color: '#94a3b8',
      '&:hover': {
        color: '#f1f5f9',
      },
    }),
  },
});

/**
 * A customizable select dropdown component using react-select with theme support.
 *
 * @example
 * ```tsx
 * <Select
 *   label="Choose a fruit"
 *   options={[
 *     { value: 'apple', label: 'Apple' },
 *     { value: 'banana', label: 'Banana', disabled: true },
 *   ]}
 *   onChange={(value) => console.log(value)}
 * />
 * ```
 *
 * @developer
 * - Uses react-select for enhanced dropdown functionality
 * - Automatically applies theme colors (light/dark)
 * - Supports all react-select props
 */
export const Select: React.FC<SelectProps> = (props) => {
  const {
    className,
    label,
    error,
    options,
    value,
    onChange,
    placeholder = 'Choose',
    isDisabled = false,
    isSearchable = false,
    isMulti = false,
    isClearable = true,
    showDropdownIndicator = true,
    showLabel = true,
    width = 'full',
    height = 'auto',
    styles: customStyles,
    components: customComponents,
    getOptionLabel,
    getOptionValue,
    formatOptionLabel,
    ...restProps
  } = props || {};
  const {resolvedTheme} = useTheme();

  // Merge custom styles with theme styles
  const styles = {
    ...themeStyles({showDropdownIndicator})[resolvedTheme],
    ...customStyles,
  };

  // Handle change event
  const handleChange = (selectedOption: SelectOption | SelectOption[]) => {
    if (isMulti && Array.isArray(selectedOption)) {
      const values = selectedOption ? selectedOption.map((option: any) => getOptionValue ? getOptionValue(option) : option.value) : [];
      onChange?.(values);
    } else if (!Array.isArray(selectedOption)) {
      onChange?.(selectedOption ? (getOptionValue ? getOptionValue(selectedOption) : selectedOption.value) : '');
    }
  };

  // Convert options to react-select format
  const selectOptions = options.map((selectOptions) => {
    const option = selectOptions as SelectOption;
    return ({
      ...option,
      label: getOptionLabel ? getOptionLabel(option) : option.label,
      value: getOptionValue ? getOptionValue(option) : option.value,
      disabled: option.disabled || false,
    });
  });

  // Get the current value in react-select format
  let currentValue: (SelectOption | SelectOption[]) | null;

  if (isMulti) {
    currentValue = value && Array.isArray(value)
      ? selectOptions.filter((option: SelectOption) => value.includes(option.value))
      : [];
  } else {
    if (value && typeof value === 'string') {
      currentValue = selectOptions.find((option: SelectOption | GroupedOption) => {
        if (!Array.isArray(option?.options)) {
          return option.value === value;
        } else {
          return option.options.filter(option => option.value === value).length;
        }
      }) || null;

      if (currentValue && Array.isArray(currentValue?.options)) {
        currentValue = currentValue.options.find(option => option.value === value) || null;
      }
    } else {
      currentValue = null;
    }
  }

  return (
    <div className={`space-y-2 ${className || ''}`}>
      {showLabel && label && (
        <label
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
          {label}
        </label>
      )}
      <div className={width === 'full' ? 'w-full' : `w-[${width}]`}>
        <ReactSelect
          {...restProps}
          options={selectOptions}
          value={currentValue}
          onChange={(value) => handleChange(value as SelectOption | SelectOption[])}
          placeholder={placeholder}
          isDisabled={isDisabled}
          isSearchable={isSearchable}
          isMulti={isMulti}
          isClearable={isClearable}
          styles={styles}
          classNamePrefix="select"
          getOptionLabel={getOptionLabel}
          getOptionValue={getOptionValue}
          formatOptionLabel={formatOptionLabel}
        />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};
