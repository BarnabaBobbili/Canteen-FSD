import React, { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';

/**
 * PasswordInput Component
 * Reusable password input field with show/hide toggle
 */
const PasswordInput = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  inputStyle,
  labelStyle,
  required = true
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label className={labelStyle}>
        {label}
      </label>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type={showPassword ? 'text' : 'password'}
          name={name}
          value={value}
          onChange={onChange}
          className={inputStyle}
          placeholder={placeholder}
          required={required}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
