import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    marginTop: '5px',
  };

  return (
    <div style={{ 
      maxWidth: '400px', 
      margin: '50px auto', 
      padding: '20px' 
    }}>
      <Card>
        <h2 style={{ marginTop: 0, textAlign: 'center' }}>Iniciar Sesión</h2>
        
        {error && (
          <div style={{ 
            color: '#721c24',
            background: '#f8d7da', 
            padding: '12px', 
            borderRadius: '6px',
            marginBottom: '15px',
            border: '1px solid #f5c6cb'
          }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontWeight: '500' }}>
              Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              style={inputStyle}
            />
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontWeight: '500' }}>
              Contraseña:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              style={inputStyle}
            />
          </div>
          
          <Button 
            type="submit" 
            variant="primary"
            disabled={loading}
            fullWidth
            size="large"
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </Button>
        </form>
        
        <div style={{ 
          marginTop: '20px', 
          padding: '15px',
          background: '#e7f3ff',
          borderRadius: '6px',
          fontSize: '13px'
        }}>
          <strong>Usuario de prueba:</strong><br />
          Email: usuario@test.com<br />
          Contraseña: password
          <br /><br />
          <strong>Admin de prueba:</strong><br />
          Email: admin@test.com<br />
          Contraseña: password
        </div>
      </Card>
    </div>
  );
};

export default Login;