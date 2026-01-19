Sistema de Festión de Solicitudes

Sistema para gestion de solicitudes con roles de usuario y administrador.

Tecnologias:

    Backend:
        -Laravel 10+
        -MySQL
        -Laravel Sanctum(Autenticación)
        -DoomPDF (Generación de Reportes)
    Frontend:
        -React 18+
        -Vite
        -React Router DOM
        -AXIOS

Instalación:
    Requisitos Previos:
        -PHP >= 8.1
        -Composer
        -Node.js >= 18
        -MySQL
        -Git
        -XAMPP (EN ENTORNO WINDOWS)
            -7-ZIP para XAMPP

    1.Clonamos Repositorio en la carpeta ../XAMPP/htdocs:
        git clone https://github.com/FelixSMendez/Sistema-gestion-solicitudes.git

    2.Configuramos Backend:
        #Nos situamos adentro de la carpeta backend
        cd backend

        #Instalar dependencias
        composer install

        #copiar archivo de configuración
        cp .env.example .env

        #Crear la base de datos en mysql con el nombre que vayas a usar

        #Configurar base de datos en .env
        # DB_DATABASE=tu_base_de_datos
        # DB_USERNAME=tu_usuario
        # DB_PASSWORD=tu_contraseña

        #Ejecutar migraciones
        php artisan migrate

        #Ejecutar seeders (datos de prueba)
        php artisan db:seed

        #Iniciar Servidor
        php artisan serve
    El Backend estara disponible en http://localhost:8000

    3.Configurar Frontend (React):
        #Nos situamos adentro de la carpeta backend
        cd frontend

        #Instalar dependencias
        npm install

        #Iniciar Servidor
        npm run dev
    El frontend estará disponible en http://localhost:5173

    Tras haber ejecutado los seeders, puedes usar estas credenciales:

    Administrador:
        Email: admin@test.com
        Password: password

    Usuario:
        Email: usuario@test.com
        Password: password

    Otro usuario:
        Email: usuario2@test.com
        Password: password

API Endpoints
Autenticación
POST /api/v1/register - Registro de usuario

POST /api/v1/login - Inicio de sesión

POST /api/v1/logout - Cerrar sesión

GET /api/v1/user - Obtener usuario actual

Solicitudes
GET /api/v1/solicitudes - Listar solicitudes

POST /api/v1/solicitudes - Crear solicitud

GET /api/v1/solicitudes/{id} - Ver solicitud

PUT /api/v1/solicitudes/{id} - Actualizar solicitud

DELETE /api/v1/solicitudes/{id} - Eliminar solicitud

PATCH /api/v1/solicitudes/{id}/estado - Cambiar estado (admin)

Reportes
GET /api/v1/reportes/estadisticas - Obtener estadísticas

GET /api/v1/reportes/exportar-pdf - Exportar PDF (admin)    
