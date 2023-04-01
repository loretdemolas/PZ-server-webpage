import React from 'react';

export default function ToggleOption(props) {
  const { label, name, value, onChange, disabled } = props;

  return (
    <>
      {disabled ? (
        <div>
          <label>
            {label}
            <select name={name} value={value} onChange={onChange}>
              <option value={true}>True</option>
              <option value={false}>False</option>
            </select>
          </label>
        </div>
      ) : null}
    </>
  );
}