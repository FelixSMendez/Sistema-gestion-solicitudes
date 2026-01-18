import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CrearSolicitud from './pages/solicitudes/CrearSolicitud';
import ListaSolicitudes from './pages/solicitudes/ListaSolicitudes';
import Reportes from './pages/Reportes';

import SolicitudesPendientes from './pages/admin/SolicitudesPendientes';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/solicitudes"
            element={
              <PrivateRoute>
                <ListaSolicitudes />
              </PrivateRoute>
            }
          />
  
          <Route
            path="/solicitudes/crear"
            element={
              <PrivateRoute>
                <CrearSolicitud />
              </PrivateRoute>
            }
          />
          
          {/* Rutas solo para ADMIN */}
          <Route
            path="/admin/solicitudes-pendientes"
            element={
              <AdminRoute>
                <SolicitudesPendientes />
              </AdminRoute>
            }
          />

          <Route
            path="/reportes"
            element={
              <AdminRoute>
                <Reportes />
              </AdminRoute>
            }
          />
          
          
          {/* Ruta por defecto */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
