import { Link } from 'react-router-dom';

const DashboardCard = ({ 
  to, 
  icon, 
  title, 
  description, 
  gradient,
  color = 'white'
}) => {
  return (
    <Link 
      to={to}
      style={{ 
        padding: '20px',
        background: gradient,
        color: color,
        textDecoration: 'none',
        borderRadius: '8px',
        textAlign: 'center',
        transition: 'transform 0.2s',
        display: 'block',
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <div style={{ fontSize: '32px', marginBottom: '10px' }}>{icon}</div>
      <div style={{ fontSize: '16px', fontWeight: '600' }}>{title}</div>
      <div style={{ fontSize: '12px', opacity: 0.9, marginTop: '5px' }}>
        {description}
      </div>
    </Link>
  );
};

export default DashboardCard;