import React from 'react';
import '../App.css';

interface CheckboxInputProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({ checked, onChange }) => {
  return (
    <div className="form-check">
      <input
        className="form-check-input custom-checkbox"
        type="checkbox"
        checked={checked}
        onChange={onChange}
        id="flexCheckDefault"
      />
    </div>
  );
};

export default CheckboxInput;