<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\SolicitudController;
use App\Http\Controllers\Api\V1\ReporteController;

Route::prefix('v1')->group(function () {
    // Rutas públicas
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);

    // Rutas protegidas
    Route::middleware('auth:sanctum')->group(function () {
        //Auth
        Route::post('logout', [AuthController::class, 'logout']);
        Route::get('/user', [AuthController::class, 'user']);
        //Solicitudes
        Route::apiResource('solicitudes', SolicitudController::class);

        //Ruta para actualizar estado de solicitud
        Route::patch('solicitudes/{solicitud}/estado', [SolicitudController::class, 'updateEstado']);

        //Reportes
        Route::get('reportes/estadisticas', [ReporteController::class, 'estadisticas']);
        Route::get('reportes/exportar-pdf', [ReporteController::class, 'exportarPdf']);
    });
});