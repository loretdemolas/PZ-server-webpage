import React from 'react';

export default function InputOption(props) {
  const { label, name, value, onChange, enabled  } = props;

  return (
    <div>
      <label>
        {label}
        <input type="text" name={name} value={value} onChange={onChange} disabled={!enabled}/>
      </label>
    </div>
  );
}