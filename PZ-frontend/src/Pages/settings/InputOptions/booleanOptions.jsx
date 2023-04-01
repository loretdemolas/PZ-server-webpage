import React from 'react';

export default function ToggleOption(props) {
  const { label, name, value, onChange, disabled } = props;

  return (
    <div>
      <label>
        {label}
        <select name={name} value={value} onChange={onChange} disabled={!disabled}>
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
      </label>
    </div>
  );
}