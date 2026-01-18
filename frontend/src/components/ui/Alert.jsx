const Alert = ({ children, variant = 'info', onClose }) => {
  const variants = {
    success: {
      background: '#d4edda',
      color: '#155724',
      border: '#c3e6cb',
    },
    error: {
      background: '#f8d7da',
      color: '#721c24',
      border: '#f5c6cb',
    },
    warning: {
      background: '#fff3cd',
      color: '#856404',
      border: '#ffeaa7',
    },
    info: {
      background: '#d1ecf1',
      color: '#0c5460',
      border: '#bee5eb',
    },
  };

  const icons = {
    success: '✓',
    error: '✗',
    warning: '⚠',
    info: 'ℹ',
  };

  return (
    <div style={{
      padding: '12px 15px',
      borderRadius: '6px',
      marginBottom: '15px',
      border: `1px solid ${variants[variant].border}`,
      backgroundColor: variants[variant].background,
      color: variants[variant].color,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '18px', fontWeight: 'bold' }}>
          {icons[variant]}
        </span>
        <span>{children}</span>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            padding: '0 5px',
            color: variants[variant].color,
          }}
        >
          ×
        </button>
      )}
    </div>
  );
};

export default Alert;