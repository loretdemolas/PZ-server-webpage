import React from 'react';

export default function InputOption(props) {
  const { label, name, value, onChange, enabled, helper } = props;

  return (
    <>
      {enabled ? (
        <div>
          {helper}
          <label>
            {label}
            <input type="text" name={name} value={value} onChange={onChange} />
          </label>
        </div>
      ) : null}
    </>
  );
}