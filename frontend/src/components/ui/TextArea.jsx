const TextArea = ({
    label,
    value,
    onChange,
    placeholder,
    required = false,
    disabled = false,
    error,
    name,
    rows = 4
})=>{
    return(
        <div style={{ marginBottom: '15px' }}>
            {label &&(
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
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                rows={rows}
                style={{
                    width: '100%',
                    padding: '10px',
                    fontSize: '14px',
                    border: error ? '1px solid #dc3545' : '1px solid #ddd',
                    borderRadius: '6px',
                    backgroundColor: disabled ? '#f5f5f5' : 'white',
                    cursor: disabled ? 'not-allowed' : 'text',
                    resize: 'vertical',
                    fontFamily: 'inherit'
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

export default TextArea;