import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import TextArea from '../../components/ui/TextArea';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';

const CrearSolicitud = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await api.post('/solicitudes', formData);
      
      setSuccess('¡Solicitud creada exitosamente!');
      
      // Limpiar formulario
      setFormData({ titulo: '', descripcion: '' });
      
      // Redirigir después de 2 segundos
      setTimeout(() => {
        navigate('/solicitudes');
      }, 2000);
      
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Error al crear la solicitud';
      const errors = err.response?.data?.errors;
      
      if (errors) {
        const errorList = Object.values(errors).flat().join(', ');
        setError(errorList);
      } else {
        setError(errorMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  // Redirigir si es admin
  if (user?.role === 'admin') {
    return (
      <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
        <Card>
          <Alert variant="warning">
            Los administradores no pueden crear solicitudes. Solo pueden gestionarlas.
          </Alert>
          <Link to="/dashboard" style={{ color: '#007bff', textDecoration: 'none' }}>
            ← Volver al Dashboard
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ marginBottom: '20px' }}>
          <Link to="/dashboard" style={{ color: '#007bff', textDecoration: 'none' }}>
            ← Volver al Dashboard
          </Link>
        </div>

        <Card>
          <h2 style={{ marginTop: 0, marginBottom: '5px' }}>➕ Nueva Solicitud</h2>
          <p style={{ margin: '0 0 20px 0', color: '#666', fontSize: '14px' }}>
            Completa el formulario para crear una nueva solicitud
          </p>

          {error && <Alert variant="error" onClose={() => setError('')}>{error}</Alert>}
          {success && <Alert variant="success" onClose={() => setSuccess('')}>{success}</Alert>}

          <form onSubmit={handleSubmit}>
            <Input
              label="Título de la solicitud"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              placeholder="Ej: Solicitud de permiso"
              required
              disabled={loading}
            />

            <TextArea
              label="Descripción"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Describe detalladamente tu solicitud..."
              required
              disabled={loading}
              rows={6}
            />

            <div style={{ 
              marginTop: '10px',
              padding: '12px',
              backgroundColor: '#e7f3ff',
              borderRadius: '6px',
              marginBottom: '20px'
            }}>
              <p style={{ margin: '0 0 5px 0', fontSize: '13px', fontWeight: '600', color: '#0c5460' }}>
                ℹ Información importante:
              </p>
              <ul style={{ margin: '5px 0', paddingLeft: '20px', fontSize: '13px', color: '#0c5460' }}>
                <li>Tu solicitud será enviada con estado "Pendiente"</li>
                <li>Un administrador revisará y aprobará/rechazará tu solicitud</li>
                <li>Podrás ver el estado en la lista de solicitudes</li>
                <li>Solo podrás editar solicitudes pendientes</li>
              </ul>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <Button 
                type="submit" 
                variant="success"
                disabled={loading}
                fullWidth
              >
                {loading ? 'Creando...' : '✓ Crear Solicitud'}
              </Button>
              
              <Button 
                type="button"
                variant="secondary"
                onClick={() => navigate('/solicitudes')}
                disabled={loading}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default CrearSolicitud;