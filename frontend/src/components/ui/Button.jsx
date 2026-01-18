const Button = ({
    children,
    variant = 'primary',
    onClick,
    type = 'button',
    disabled = false,
    fullWidth = false,
    size = 'medium',
}) => {
    const handleClick = (e) => {
        if (onClick && !disabled) {
            onClick(e);
        }
    };

    const baseStyles = {
        border: 'none',
        borderRadius: '6px',
        cursor:disabled ? 'not-allowed' : 'pointer',
        fontWeight: '600',
        transition: 'all 0.2s',
        width: fullWidth ? '100%' : 'auto',
        opacity: disabled ? 0.6 : 1,
    };

const variants = {
    primary: {
        backgroundColor: '#007bff',
        color: 'white',
    },
    success: {
        backgroundColor: '#28a745',
        color: 'white',
    },
    danger: {
        backgroundColor: '#dc3545',
        color: 'white',
    },
    warning:{
        backgroundColor: '#ffc107',
        color: 'black',
    },
    secondary: {
        backgroundColor: '#6c757d',
        color: 'white',
    },
};

const sizes = {
    small: {
        padding: '6px 12px',
        fontSize: '12px',
    },
    medium: {
        padding: '10px 20px',
        fontSize: '14px',
    },
    large: {
        padding: '14px 28px',
        fontSize: '16px',
    },
};

const styles = {
    ...baseStyles,
    ...variants[variant],
    ...sizes[size],
};

return (
    <button
        type={type}
        onClick={handleClick}
        style={styles}
        disabled={disabled}
        onMouseEnter={(e) => {
            if(!disabled){
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
            }
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
        }}
        >
            {children}
        </button>
    
);
};

export default Button;