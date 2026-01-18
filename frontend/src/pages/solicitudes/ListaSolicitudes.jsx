import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';
import SolicitudCard from '../../components/solicitudes/SolicitudCard';

const ListaSolicitudes = () => {
  const { user } = useContext(AuthContext);
  const [solicitudes, setSolicitudes] = useState([]);
  const [filteredSolicitudes, setFilteredSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('Todos');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchSolicitudes();
  }, []);

  useEffect(() => {
    // Filtrar solicitudes cuando cambie el filtro
    if (filtroEstado === 'Todos') {
      setFilteredSolicitudes(solicitudes);
    } else {
      setFilteredSolicitudes(
        solicitudes.filter(s => s.estado === filtroEstado)
      );
    }
  }, [filtroEstado, solicitudes]);

  const fetchSolicitudes = async () => {
    try {
      const response = await api.get('/solicitudes');
      setSolicitudes(response.data);
      setFilteredSolicitudes(response.data);
      setError('');
    } catch (err) {
      setError('Error al cargar las solicitudes');
      console.error(err);
    } finally {
      setLoading(false);
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

  const handleUpdateEstado = async (id, nuevoEstado) => {
    try {
      await api.patch(`/solicitudes/${id}/estado`, { estado: nuevoEstado });
      
      // Actualizar el estado local
      setSolicitudes(solicitudes.map(s => 
        s.id === id ? { ...s, estado: nuevoEstado } : s
      ));
      
      setSuccess(`Solicitud ${nuevoEstado.toLowerCase()} exitosamente`);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Error al actualizar el estado');
      console.error(err);
    }
  };

  const contadores = {
    total: solicitudes.length,
    pendientes: solicitudes.filter(s => s.estado === 'Pendiente').length,
    aprobadas: solicitudes.filter(s => s.estado === 'Aprobado').length,
    rechazadas: solicitudes.filter(s => s.estado === 'Rechazado').length,
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
          <p style={{ margin: 0, fontSize: '18px' }}>⏳ Cargando solicitudes...</p>
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

      {/* Título y botón crear (solo usuarios) */}
      <Card>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '15px'
        }}>
          <div>
            <h2 style={{ margin: 0 }}>
              {user?.role === 'admin' ? '📋 Todas las Solicitudes' : '📋 Mis Solicitudes'}
            </h2>
            <p style={{ margin: '5px 0 0 0', color: '#666', fontSize: '14px' }}>
              {user?.role === 'admin' 
                ? 'Gestiona todas las solicitudes del sistema' 
                : 'Visualiza y gestiona tus solicitudes'}
            </p>
          </div>
          {user?.role !== 'admin' && (
            <Link to="/solicitudes/crear" style={{ textDecoration: 'none' }}>
              <Button variant="success">
                ➕ Nueva Solicitud
              </Button>
            </Link>
          )}
        </div>

        {/* Estadísticas */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '10px',
          marginBottom: '15px'
        }}>
          <div style={{ 
            padding: '10px', 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '6px',
            textAlign: 'center',
            color: 'white'
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{contadores.total}</div>
            <div style={{ fontSize: '12px' }}>Total</div>
          </div>
          <div style={{ 
            padding: '10px', 
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            borderRadius: '6px',
            textAlign: 'center',
            color: 'white'
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{contadores.pendientes}</div>
            <div style={{ fontSize: '12px' }}>Pendientes</div>
          </div>
          <div style={{ 
            padding: '10px', 
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            borderRadius: '6px',
            textAlign: 'center',
            color: 'white'
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{contadores.aprobadas}</div>
            <div style={{ fontSize: '12px' }}>Aprobadas</div>
          </div>
          <div style={{ 
            padding: '10px', 
            background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            borderRadius: '6px',
            textAlign: 'center',
            color: '#000'
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{contadores.rechazadas}</div>
            <div style={{ fontSize: '12px' }}>Rechazadas</div>
          </div>
        </div>

        {/* Filtros */}
        <div style={{ 
          display: 'flex', 
          gap: '10px', 
          flexWrap: 'wrap',
          paddingTop: '15px',
          borderTop: '1px solid #eee'
        }}>
          <span style={{ fontWeight: '600', fontSize: '14px', lineHeight: '32px' }}>
            Filtrar por:
          </span>
          {['Todos', 'Pendiente', 'Aprobado', 'Rechazado'].map(estado => (
            <Button
              key={estado}
              size="small"
              variant={filtroEstado === estado ? 'primary' : 'secondary'}
              onClick={() => setFiltroEstado(estado)}
            >
              {estado}
            </Button>
          ))}
        </div>
      </Card>

      {/* Alertas */}
      {error && (
        <Alert variant="error" onClose={() => setError('')}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert variant="success" onClose={() => setSuccess('')}>
          {success}
        </Alert>
      )}

      {/* Lista de solicitudes */}
      <div style={{ marginTop: '20px' }}>
        {filteredSolicitudes.length === 0 ? (
          <Card>
            <div style={{ 
              textAlign: 'center', 
              padding: '40px', 
              color: '#666' 
            }}>
              <p style={{ fontSize: '48px', margin: '0' }}>📭</p>
              <p style={{ fontSize: '18px', margin: '10px 0' }}>
                {filtroEstado === 'Todos' 
                  ? 'No hay solicitudes' 
                  : `No hay solicitudes ${filtroEstado.toLowerCase()}s`}
              </p>
              {user?.role !== 'admin' && filtroEstado === 'Todos' && (
                <Link to="/solicitudes/crear" style={{ textDecoration: 'none' }}>
                  <Button variant="primary" style={{ marginTop: '10px' }}>
                    Crear mi primera solicitud
                  </Button>
                </Link>
              )}
            </div>
          </Card>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {filteredSolicitudes.map(solicitud => (
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
    </div>
  );
};

export default ListaSolicitudes;