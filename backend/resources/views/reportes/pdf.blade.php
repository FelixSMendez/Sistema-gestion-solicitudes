<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reporte de Solicitudes</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: Arial, sans-serif;
            color: #333;
            padding: 40px;
            background: #f8f9fa;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .header {
            text-align: center;
            border-bottom: 4px solid #007bff;
            padding-bottom: 25px;
            margin-bottom: 35px;
        }
        
        .header h1 {
            color: #007bff;
            font-size: 32px;
            margin-bottom: 10px;
        }
        
        .header p {
            color: #666;
            font-size: 16px;
        }
        
        .info-section {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 35px;
            border-left: 4px solid #007bff;
        }
        
        .info-section h3 {
            color: #007bff;
            font-size: 16px;
            margin-bottom: 15px;
        }
        
        .info-row {
            display: flex;
            justify-content: space-between;
            margin: 10px 0;
            font-size: 14px;
        }
        
        .info-label {
            color: #666;
            font-weight: 600;
        }
        
        .info-value {
            color: #333;
        }
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 25px;
            margin-bottom: 35px;
        }
        
        .stat-card {
            background: white;
            padding: 25px;
            border-radius: 10px;
            text-align: center;
            border: 3px solid #ddd;
        }
        
        .stat-card.total {
            border-color: #667eea;
            background: linear-gradient(135deg, #f5f7ff 0%, #e8ecff 100%);
        }
        
        .stat-card.pendiente {
            border-color: #ffc107;
            background: linear-gradient(135deg, #fff9e6 0%, #fff3cc 100%);
        }
        
        .stat-card.aprobado {
            border-color: #28a745;
            background: linear-gradient(135deg, #e8f5e9 0%, #d4edda 100%);
        }
        
        .stat-card.rechazado {
            border-color: #dc3545;
            background: linear-gradient(135deg, #ffe6e6 0%, #fdd 100%);
        }
        
        .stat-icon {
            font-size: 40px;
            margin-bottom: 10px;
        }
        
        .stat-label {
            font-size: 14px;
            color: #666;
            margin-bottom: 12px;
            text-transform: uppercase;
            font-weight: 600;
            letter-spacing: 1px;
        }
        
        .stat-number {
            font-size: 56px;
            font-weight: bold;
            line-height: 1;
        }
        
        .stat-card.total .stat-number {
            color: #667eea;
        }
        
        .stat-card.pendiente .stat-number {
            color: #ffc107;
        }
        
        .stat-card.aprobado .stat-number {
            color: #28a745;
        }
        
        .stat-card.rechazado .stat-number {
            color: #dc3545;
        }
        
        .footer {
            text-align: center;
            color: #999;
            font-size: 12px;
            border-top: 2px solid #eee;
            padding-top: 25px;
            margin-top: 40px;
        }
        
        .footer p {
            margin: 5px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Reporte de Solicitudes</h1>
            <p>Resumen estadístico del sistema</p>
        </div>
        
        <div class="info-section">
            <h3>Información del Reporte</h3>
            <div class="info-row">
                <span class="info-label">Generado por:</span>
                <span class="info-value">{{ $datos['generado_por'] }}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Fecha y hora:</span>
                <span class="info-value">{{ $datos['fecha'] }}</span>
            </div>
        </div>
        
        <div class="stats-grid">
            <div class="stat-card total">
                <div class="stat-label">Total de solicitudes</div>
                <div class="stat-number">{{ $datos['total'] }}</div>
            </div>
            
            <div class="stat-card pendiente">
                <div class="stat-label">Solicitudes Pendientes</div>
                <div class="stat-number">{{ $datos['pendientes'] }}</div>
            </div>
            
            <div class="stat-card aprobado">
                <div class="stat-label">SolicitudesAprobadas</div>
                <div class="stat-number">{{ $datos['aprobadas'] }}</div>
            </div>
            
            <div class="stat-card rechazado">
                <div class="stat-label">Solicitudes Rechazadas</div>
                <div class="stat-number">{{ $datos['rechazadas'] }}</div>
            </div>
        </div>
        
        <div class="footer">
            <p><strong>Sistema de Gestión de Solicitudes</strong></p>
            <p>Este documento fue generado automáticamente</p>
            <p>© 2026 - Todos los derechos reservados</p>
        </div>
    </div>
</body>
</html>