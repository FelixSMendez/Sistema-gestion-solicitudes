<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Solicitud;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;

class ReporteController extends Controller
{
    /**
     * Obtener las estadísticas de solicitudes.
     */

    public function estadisticas(Request $request)
    {
        $user = $request->user();

        // Base query dependiendo del rol
        if ($user->role === 'admin') {
            $query = Solicitud::query();
        } else {
            $query = Solicitud::where('user_id', $user->id);
        }

        // Las estadisticas de reportes
        $total = $query->count();
        $pendientes = (clone $query)->where('estado', 'Pendiente')->count();
        $aprobadas = (clone $query)->where('estado', 'Aprobado')->count();
        $rechazadas = (clone $query)->where('estado', 'Rechazado')->count();

        return response()->json([
            'total' => $total,
            'pendientes' => $pendientes,
            'aprobadas' => $aprobadas,
            'rechazadas' => $rechazadas,
            'fecha' => now()->format('d/m/Y H:i:s'),
            'generado_por' => $user->name,
            'rol' => $user->role,
        ]);
    }

    /**
     * Exportar a PDF
     */
     public function exportarPdf(Request $request)
    {
        $user = $request->user();

        // Verificar que sea admin
        if ($user->role !== 'admin') {
            return response()->json([
                'message' => 'No tienes permisos para generar reportes'
            ], 403);
        }

        // Obtener todas las solicitudes (solo admin llega aquí)
        $datos = [
            'total' => Solicitud::count(),
            'pendientes' => Solicitud::where('estado', 'Pendiente')->count(),
            'aprobadas' => Solicitud::where('estado', 'Aprobado')->count(),
            'rechazadas' => Solicitud::where('estado', 'Rechazado')->count(),
            'fecha' => now()->format('d/m/Y H:i:s'),
            'generado_por' => $user->name,
            'rol' => 'Administrador',
        ];

        // Generar PDF con DomPDF
        $pdf = Pdf::loadView('reportes.pdf', compact('datos'))
            ->setPaper('a4', 'portrait');

        // Descargar el PDF
        return $pdf->download('reporte_solicitudes_' . now()->format('Y-m-d_H-i-s') . '.pdf');
    }
}
