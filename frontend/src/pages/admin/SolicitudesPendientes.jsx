import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';
import Card from '../../components/ui/Card';
import Alert from '../../components/ui/Alert';
import SolicitudCard from '../../components/solicitudes/SolicitudCard';

const SolicitudesPendientes = () => {
  const { user } = useContext(AuthContext);
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchSolicitudes();
  }, []);

  const fetchSolicitudes = async () => {
    try {
      const response = await api.get('/solicitudes');
      // Filtrar solo pendientes
      const pendientes = response.data.filter(s => s.estado === 'Pendiente');
      setSolicitudes(pendientes);
    } catch (err) {
      setError('Error al cargar solicitudes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateEstado = async (id, nuevoEstado) => {
    try {
      await api.patch(`/solicitudes/${id}/estado`, { estado: nuevoEstado });
      
      // Remover de la lista ya que ya no está pendiente
      setSolicitudes(solicitudes.filter(s => s.id !== id));
      
      setSuccess(`Solicitud ${nuevoEstado.toLowerCase()} exitosamente`);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Error al actualizar estado');
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/solicitudes/${id}`);
      setSolicitudes(solicitudes.filter(s => s.id !== id));
      setSuccess('Solicitud eliminada exitosamente');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Error al eliminar la solicitud');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        padding: '20px', 
        backgroundColor: '#f5f5f5', 
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Card>
          <p style={{ margin: 0, fontSize: '18px' }}>⏳ Cargando solicitudes pendientes...</p>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ marginBottom: '20px' }}>
        <Link to="/dashboard" style={{ color: '#007bff', textDecoration: 'none' }}>
          ← Volver al Dashboard
        </Link>
      </div>

      {/* Título */}
      <Card>
        <div style={{ marginBottom: '15px' }}>
          <h2 style={{ margin: 0 }}>⏳ Solicitudes Pendientes de Aprobación</h2>
          <p style={{ margin: '5px 0 0 0', color: '#666', fontSize: '14px' }}>
            Gestiona las solicitudes que están esperando tu aprobación
          </p>
        </div>

        {/* Contador */}
        <div style={{ 
          padding: '15px', 
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          borderRadius: '6px',
          textAlign: 'center',
          color: 'white'
        }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
            {solicitudes.length}
          </div>
          <div style={{ fontSize: '14px' }}>
            {solicitudes.length === 1 ? 'Solicitud Pendiente' : 'Solicitudes Pendientes'}
          </div>
        </div>

        {/* Info de acciones */}
        <div style={{ 
          marginTop: '15px',
          padding: '12px',
          backgroundColor: '#e7f3ff',
          borderRadius: '6px',
          fontSize: '13px',
          color: '#0c5460'
        }}>
          <strong>💡 Tip:</strong> Haz clic en "Aprobar" o "Rechazar" en cada solicitud para procesarla.
          Una vez procesada, desaparecerá de esta lista.
        </div>
      </Card>

      {/* Alertas */}
      {error && (
        <div style={{ marginTop: '20px' }}>
          <Alert variant="error" onClose={() => setError('')}>
            {error}
          </Alert>
        </div>
      )}
      
      {success && (
        <div style={{ marginTop: '20px' }}>
          <Alert variant="success" onClose={() => setSuccess('')}>
            {success}
          </Alert>
        </div>
      )}

      {/* Lista de solicitudes */}
      <div style={{ marginTop: '20px' }}>
        {solicitudes.length === 0 ? (
          <Card>
            <div style={{ 
              textAlign: 'center', 
              padding: '60px 20px', 
              color: '#666' 
            }}>
              <p style={{ fontSize: '64px', margin: '0' }}>✅</p>
              <h3 style={{ margin: '15px 0 5px 0' }}>
                ¡Excelente trabajo!
              </h3>
              <p style={{ fontSize: '16px', margin: '0', color: '#999' }}>
                No hay solicitudes pendientes de aprobación
              </p>
            </div>
          </Card>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {solicitudes.map((solicitud) => (
              <SolicitudCard
                key={solicitud.id}
                solicitud={solicitud}
                onDelete={handleDelete}
                onUpdateEstado={handleUpdateEstado}
              />
            ))}
          </div>
        )}
      </div>

      {/* Link rápido a todas las solicitudes */}
      <div style={{ marginTop: '20px' }}>
        <Card>
          <div style={{ textAlign: 'center' }}>
            <p style={{ margin: '0 0 10px 0', color: '#666' }}>
              ¿Quieres ver todas las solicitudes (aprobadas, rechazadas y pendientes)?
            </p>
            <Link to="/solicitudes" style={{ textDecoration: 'none' }}>
              <button style={{
                padding: '10px 20px',
                background: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px'
              }}>
                Ver Todas las Solicitudes →
              </button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SolicitudesPendientes;