'use client';

import React from 'react';
import Select, { SingleValue } from 'react-select';

interface SelectItem {
  label: string;
  value: string;
}

interface IProps {
  options: SelectItem[];
  placeholder: string;
  instanceId: string;
  handleSelectChange: (value: SingleValue<SelectItem>) => void;
}

export default function ReactSelect({
  options,
  placeholder = '--Select--',
  instanceId,
  handleSelectChange,
}: IProps) {
  return (
    <>
      <Select
        onChange={handleSelectChange}
        instanceId={instanceId}
        placeholder={placeholder}
        options={options}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: state.isFocused ? '#72BAA9' : '', // Set the border color
            boxShadow: state.isFocused ? '0 0 0 1px #72BAA9' : 'none', // Override the box-shadow
            '&:hover': {
              borderColor: state.isFocused ? '#72BAA9' : '#474E93', // Ensure hover doesn't override focus
            },
          }),
        }}
      />
    </>
  );
}
