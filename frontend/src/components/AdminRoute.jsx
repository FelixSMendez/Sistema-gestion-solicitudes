import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div style={{ 
        padding: '20px', 
        textAlign: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div>
          <p style={{ fontSize: '24px', margin: '0' }}>⏳</p>
          <p>Cargando...</p>
        </div>
      </div>
    );
  }

  // Si no hay usuario, redirige a login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Si no es admin, muestra mensaje de acceso denegado
  if (user.role !== 'admin') {
    return (
      <div style={{ 
        padding: '20px',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ 
          maxWidth: '500px',
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>🚫</div>
          <h2 style={{ margin: '0 0 10px 0', color: '#dc3545' }}>
            Acceso Denegado
          </h2>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            No tienes permisos para acceder a esta sección.
            Esta página es solo para administradores.
          </p>
          <button 
            onClick={() => window.location.href = '/dashboard'}
            style={{
              padding: '10px 20px',
              background: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            ← Volver al Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Si es admin, permite acceso
  return children;
};

export default AdminRoute;