import React from "react";

export default function FormInput({
  label,
  type = "text",
  placeholder,
  value,
  onChange
}) {
  return (
    <div className="mb-3">
      {label && <label className="form-label">{label}</label>}
      <input
        type={type}
        className="form-control custom"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
