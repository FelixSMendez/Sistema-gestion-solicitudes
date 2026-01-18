import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import DashboardCard from '../components/ui/DashboardCard';
import Badge from '../components/ui/Badge';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div style={{ 
      padding: '20px', 
      minHeight: '100vh', 
      backgroundColor: '#f5f5f5' 
    }}>
      {/* Header */}
      <Card>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
        }}>
          <div>
            <h1 style={{ margin: 0, marginBottom: '5px' }}>
              {user?.role === 'admin' ? 'Panel de Administrador' : 'Mis Solicitudes'}
            </h1>
          </div>
          <Button variant="danger" onClick={logout}>
            Cerrar Sesión
          </Button>
        </div>
      </Card>

      {/* Información del usuario */}
      <div style={{ marginTop: '20px' }}>
        <Card title="Información de la cuenta">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '15px' 
          }}>
            <div>
              <p style={{ margin: '5px 0', color: '#666', fontSize: '14px' }}>
                Email:
              </p>
              <p style={{ margin: '5px 0', fontWeight: '500' }}>
                {user?.email}
              </p>
            </div>
            <div>
              <p style={{ margin: '5px 0', color: '#666', fontSize: '14px' }}>
                Rol:
              </p>
              <Badge variant={user?.role === 'admin' ? 'admin' : 'user'}>
                {user?.role === 'admin' ? 'Administrador' : 'Usuario'}
              </Badge>
            </div>
          </div>
        </Card>
      </div>

      {/* Acciones disponibles */}
      <div style={{ marginTop: '20px' }}>
        <Card title="Acciones disponibles">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px',
          }}>
            <DashboardCard
              to="/solicitudes"
              icon="📄"
              title={user?.role === 'admin' ? 'Todas las Solicitudes' : 'Mis Solicitudes'}
              description={user?.role === 'admin' ? 'Ver y gestionar todas' : 'Ver mis solicitudes'}
              gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            />

            {user?.role !== 'admin' && (
              <DashboardCard
                to="/solicitudes/crear"
                icon="➕"
                title="Nueva Solicitud"
                description="Crear una solicitud"
                gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
              />
            )}

            <DashboardCard
              to="/reportes"
              icon="📊"
              title="Reportes"
              description={user?.role === 'admin' ? 'Estadísticas generales' : 'Mis estadísticas'}
              gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
            />
          </div>

          {/* Sección de admin */}
          {user?.role === 'admin' && (
            <div style={{ 
              borderTop: '2px solid #f0f0f0',
              paddingTop: '20px',
              marginTop: '20px'
            }}>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '15px'
              }}>
                <DashboardCard
                  to="/admin/solicitudes-pendientes"
                  icon="⏳"
                  title="Pendientes de Aprobar"
                  description="Gestionar solicitudes"
                  gradient="linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
                  color="#000"
                />
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;