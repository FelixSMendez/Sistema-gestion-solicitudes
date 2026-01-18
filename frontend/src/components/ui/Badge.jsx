const Badge = ({ children, variant = 'primary' }) => {
  const variants = {
    primary: { backgroundColor: '#007bff', color: 'white' },
    success: { backgroundColor: '#28a745', color: 'white' },
    warning: { backgroundColor: '#ffc107', color: '#000' },
    danger: { backgroundColor: '#dc3545', color: 'white' },
    admin: { backgroundColor: '#ffc107', color: '#000' },
    user: { backgroundColor: '#28a745', color: 'white' },
  };

  return (
    <span style={{ 
      display: 'inline-block',
      padding: '4px 12px',
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: '600',
      textTransform: 'uppercase',
      ...variants[variant],
    }}>
      {children}
    </span>
  );
};

export default Badge;