const Input =({
    label,
    type = "text",
    value,
    onChange,
    placeholder = "",
    required = false,
    disabled = false,
    error,
    name
}) => {
    return (
        <div style={{ marginBottom: '15px' }}>
            {label && (
            <label style={{
                display: 'block',
                fontweight: '500',
                marginBottom: '6px',
                fontSize: '14px'
            }}>
                {label}
                {required && <span style={{ color: 'red' }}> *</span>}
            </label>
            )}
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                style={{
                    width: '100%',
                    padding: '10px',
                    fontSize: '14px',
                    border: error ? '1px solid #dc3545' : '1px solid #ddd',
                    borderRadius: '6px',
                    backgroundColor: disabled ? '#f5f5f5' : 'white',
                    cursor: disabled ? 'not-allowed' : 'text',
                }}
            />
            {error && (
                <span style={{
                    color: '#dc3545', 
                    fontSize: '12px', 
                    marginTop: '4px',
                    display: 'block' 
                }}>
                    {error}
                </span>
            )}
    </div>
  );
};

export default Input;