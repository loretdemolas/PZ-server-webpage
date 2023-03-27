import React from 'react';

export default function ToggleOption(props) {
  const { label, name, value, onChange } = props;

  return (
    <div>
      <label>
        {label}
        <select name={name} value={value} onChange={onChange}>
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
      </label>
    </div>
  );
}
