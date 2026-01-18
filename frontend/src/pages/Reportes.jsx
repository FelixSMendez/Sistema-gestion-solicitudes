import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';

const Reportes = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [exportando, setExportando] = useState(false);

  useEffect(() => {
    fetchEstadisticas();
  }, []);

  const fetchEstadisticas = async () => {
    try {
      const response = await api.get('/reportes/estadisticas');
      setStats(response.data);
      setError('');
    } catch (err) {
      setError('Error al cargar estadísticas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleExportarPdf = async () => {
    setExportando(true);
    try {
      const response = await api.get('/reportes/exportar-pdf', {
        responseType: 'blob',
      });

      // Crear un link de descarga
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `reporte_${new Date().getTime()}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      setError('');
    } catch (err) {
      if (err.response && err.response.status === 403) {
        setError('No tienes permisos para generar reportes');
      } else {
        setError('Error al exportar a PDF');
      }
      console.error(err);
    } finally {
      setExportando(false);
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
          <p style={{ margin: 0, fontSize: '18px' }}>⏳ Cargando estadísticas...</p>
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

      {error && (
        <div style={{ marginBottom: '20px' }}>
          <Alert variant="error" onClose={() => setError('')}>
            {error}
          </Alert>
        </div>
      )}

      {stats && (
        <>
          {/* Tarjeta principal */}
          <Card>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '20px'
            }}>
              <div>
                <h2 style={{ margin: 0, color: '#333' }}>
                  {user?.role === 'admin' ? '📊 Reporte General del Sistema' : '📊 Mis Estadísticas'}
                </h2>
                <p style={{ margin: '5px 0 0 0', color: '#666', fontSize: '14px' }}>
                  Generado el {stats.fecha}
                </p>
                <p style={{ margin: '3px 0 0 0', color: '#666', fontSize: '12px' }}>
                  {user?.role === 'admin' 
                    ? '🔐 Vista de administrador (todas las solicitudes del sistema)' 
                    : '👤 Vista personal (solo tus solicitudes)'}
                </p>
              </div>
              
              {/* Botón solo para admin */}
              {user?.role === 'admin' && (
                <Button 
                  variant="success" 
                  onClick={handleExportarPdf}
                  disabled={exportando}
                  style={{ whiteSpace: 'nowrap' }}
                >
                  {exportando ? '⏳ Generando PDF...' : '📥 Descargar PDF'}
                </Button>
              )}
            </div>
          </Card>

          {/* Grid de estadísticas */}
          <div style={{ marginTop: '30px' }}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '20px'
            }}>
              {/* Total */}
              <Card>
                <div style={{ textAlign: 'center', padding: '10px 0' }}>
                  <div style={{ fontSize: '36px', marginBottom: '10px' }}>📋</div>
                  <div style={{ 
                    color: '#666', 
                    fontSize: '11px', 
                    marginBottom: '10px', 
                    textTransform: 'uppercase',
                    fontWeight: '600',
                    letterSpacing: '1px'
                  }}>
                    Total de Solicitudes
                  </div>
                  <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#667eea' }}>
                    {stats.total}
                  </div>
                </div>
              </Card>

              {/* Pendientes */}
              <Card>
                <div style={{ textAlign: 'center', padding: '10px 0' }}>
                  <div style={{ fontSize: '36px', marginBottom: '10px' }}>⏳</div>
                  <div style={{ 
                    color: '#666', 
                    fontSize: '11px', 
                    marginBottom: '10px', 
                    textTransform: 'uppercase',
                    fontWeight: '600',
                    letterSpacing: '1px'
                  }}>
                    Pendientes
                  </div>
                  <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#ffc107' }}>
                    {stats.pendientes}
                  </div>
                </div>
              </Card>

              {/* Aprobadas */}
              <Card>
                <div style={{ textAlign: 'center', padding: '10px 0' }}>
                  <div style={{ fontSize: '36px', marginBottom: '10px' }}>✅</div>
                  <div style={{ 
                    color: '#666', 
                    fontSize: '11px', 
                    marginBottom: '10px', 
                    textTransform: 'uppercase',
                    fontWeight: '600',
                    letterSpacing: '1px'
                  }}>
                    Aprobadas
                  </div>
                  <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#28a745' }}>
                    {stats.aprobadas}
                  </div>
                </div>
              </Card>

              {/* Rechazadas */}
              <Card>
                <div style={{ textAlign: 'center', padding: '10px 0' }}>
                  <div style={{ fontSize: '36px', marginBottom: '10px' }}>❌</div>
                  <div style={{ 
                    color: '#666', 
                    fontSize: '11px', 
                    marginBottom: '10px', 
                    textTransform: 'uppercase',
                    fontWeight: '600',
                    letterSpacing: '1px'
                  }}>
                    Rechazadas
                  </div>
                  <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#dc3545' }}>
                    {stats.rechazadas}
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Mensaje informativo para usuarios */}
          {user?.role !== 'admin' && (
            <div style={{ marginTop: '30px' }}>
              <Card>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '15px',
                  padding: '10px',
                  backgroundColor: '#e7f3ff',
                  borderRadius: '8px'
                }}>
                  <div style={{ fontSize: '32px' }}>ℹ️</div>
                  <div>
                    <p style={{ margin: 0, fontSize: '14px', color: '#0066cc', fontWeight: '600' }}>
                      Estas son tus estadísticas personales
                    </p>
                    <p style={{ margin: '5px 0 0 0', fontSize: '13px', color: '#666' }}>
                      Solo los administradores pueden generar reportes PDF del sistema completo.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Reportes;