import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

const SolicitudCard = ({ solicitud, onDelete, onUpdateEstado }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const estadoColors = {
    Pendiente: 'warning',
    Aprobado: 'success',
    Rechazado: 'danger',
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const isOwner = solicitud.user_id === user?.id;
  const isAdmin = user?.role === 'admin';
  const canEdit = isOwner && solicitud.estado === 'Pendiente';
  const canDelete = isOwner || isAdmin;

  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '15px',
      backgroundColor: 'white',
      transition: 'box-shadow 0.2s',
    }}
    onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'}
    onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
    >
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'start',
        marginBottom: '10px'
      }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: '0 0 5px 0', fontSize: '18px' }}>
            {solicitud.titulo}
          </h3>
          <div style={{ fontSize: '12px', color: '#666' }}>
            <p style={{ margin: '2px 0' }}>
              <strong>Solicitante:</strong> {solicitud.user?.name} ({solicitud.user?.email})
            </p>
            <p style={{ margin: '2px 0' }}>
              <strong>Fecha:</strong> {formatDate(solicitud.created_at)}
            </p>
            {solicitud.id && (
              <p style={{ margin: '2px 0' }}>
                <strong>ID:</strong> #{solicitud.id}
              </p>
            )}
          </div>
        </div>
        <Badge variant={estadoColors[solicitud.estado]}>
          {solicitud.estado}
        </Badge>
      </div>

      {/* Descripción */}
      <div style={{ 
        marginBottom: '15px',
        padding: '10px',
        backgroundColor: '#f8f9fa',
        borderRadius: '6px',
      }}>
        <p style={{ margin: 0, color: '#333', fontSize: '14px', lineHeight: '1.5' }}>
          {solicitud.descripcion}
        </p>
      </div>

      {/* Acciones */}
      <div style={{ 
        display: 'flex', 
        gap: '10px',
        flexWrap: 'wrap',
        borderTop: '1px solid #eee',
        paddingTop: '10px'
      }}>
        {/* Botones para Admin */}
        {isAdmin && solicitud.estado === 'Pendiente' && (
          <>
            <Button
              size="small"
              variant="success"
              onClick={() => onUpdateEstado(solicitud.id, 'Aprobado')}
            >
              ✓ Aprobar
            </Button>
            <Button
              size="small"
              variant="danger"
              onClick={() => onUpdateEstado(solicitud.id, 'Rechazado')}
            >
              ✗ Rechazar
            </Button>
          </>
        )}

        {/* Botones para usuario normal */}
        {!isAdmin && (
          <>
            <Button
              size="small"
              variant="primary"
              onClick={() => navigate(`/solicitudes/${solicitud.id}`)}
            >
              👁 Ver Detalle
            </Button>
            
            {canEdit && (
              <Button
                size="small"
                variant="warning"
                onClick={() => navigate(`/solicitudes/${solicitud.id}/editar`)}
              >
                ✏️ Editar
              </Button>
            )}
          </>
        )}

        
      </div>
    </div>
  );
};

export default SolicitudCard;