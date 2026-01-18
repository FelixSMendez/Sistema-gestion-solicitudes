const Card = ({ children, title, padding = '20px' }) => {
    return (
        <div style = {{
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            padding: padding,
        }}>
            {title && <h3 style={{ marginTop: 0}}>{title}</h3>}
            {children}
        </div>
    );
};

export default Card;