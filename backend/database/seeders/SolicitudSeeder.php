<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Solicitud;
use App\Models\User;

class SolicitudSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();

        foreach ($users as $user) {
            Solicitud::create([
                'user_id' => $user->id,
                'tipo_solicitud' => 'Tipo de solicitud de ejemplo',
                'descripcion' => 'Descripción de ejemplo para la solicitud.',
                'estado' => 'pendiente',
            ]);
        }
    }
}
