<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Solicitud;
use Illuminate\Http\Request;

class SolicitudController extends Controller
{
    /**
     * Lista de solicitudes.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        if($user->role === 'admin'){
            //Mostrar todas las solicitudes para admin
            $solicitudes = Solicitud::with('user')->orderBy('created_at', 'desc')->get();
        }else{
            //Mostrar solo las solicitudes del usuario 
            $solicitudes = Solicitud::where('user_id', $user->id)->with('user')
            ->orderBy('created_at', 'desc')
            ->get();
        }
        return response()->json($solicitudes);
    }

    /**
     * Crear Solicitud.
     */
    public function store(Request $request)
    {
        $request->validate([
            'titulo' => 'required|string|max:255',
            'descripcion' => 'required|string',
        ]);

        $solicitud = Solicitud::create([
            'titulo' => $request->titulo,
            'descripcion' => $request->descripcion,
            'user_id' => $request->user()->id,
            'estado' => 'Pendiente',
        ]);

        $solicitud->load('user');

        return response()->json([
            'message' => 'Solicitud creada exitosamente',
            'solicitud' => $solicitud,
        ], 201);
    }

    /**
     * Ver solicitud especifica.
     */
    public function show(string $id)
    {
        $solicitud = Solicitud::with('user')->findOrFail($id);

        // Verificar si el usuario tiene permiso para ver la solicitud
        if($request->user()->role !== 'admin' && $solicitud->user_id !== $request->user()->id){
            return response()->json(['message' => 'No autorizado'], 403);
        }

        return response()->json($solicitud);
    }

    /**
     * Actualizar solicitud (solo usuario propietario y si está pendiente).
     */
    public function update(Request $request, $id)
    {
        $solicitud = Solicitud::findOrFail($id);

        // Verificar permisos de usuario
        if ($solicitud->user_id !== $request->user()->id) {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        // Solo se puede editar si está pendiente
        if ($solicitud->estado !== 'Pendiente') {
            return response()->json([
                'message' => 'No se puede editar una solicitud ya procesada'
            ], 422);
        }

        $request->validate([
            'titulo' => 'sometimes|required|string|max:255',
            'descripcion' => 'sometimes|required|string',
        ]);

        $solicitud->update($request->only(['titulo', 'descripcion']));
        $solicitud->load('user');

        return response()->json([
            'message' => 'Solicitud actualizada exitosamente',
            'solicitud' => $solicitud
        ]);
    }

    /**
     * Actualizar estado (solo admin)
     */
    public function updateEstado(Request $request, $id)
    {
        if($request->user()->role !== 'admin'){
            return response()->json(['message' => 'No autorizado'], 403);
        }

        $request->validate([
            'estado' => 'required|in:Pendiente,Aprobado,Rechazado',
        ]);

        $solicitud = Solicitud::findOrFail($id);
        $solicitud->update(['estado' => $request->estado]);
        $solicitud->load('user');

        return response()->json([
            'message' => 'Estado de la solicitud actualizado exitosamente',
            'solicitud' => $solicitud
        ]);

    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
