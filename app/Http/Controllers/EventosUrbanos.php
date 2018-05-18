<?php

namespace laravelApp\Http\Controllers;

use Illuminate\Http\Request;
use laravelApp\Evento;

class EventosUrbanos extends Controller
{
    public function save_data(Request $request)
    {  
        $evento = new Evento;

        $evento->tipoEvento = $request->input('tipo');
        $evento->descripcion = $request->input('descripcion');
        $evento->latitud = $request->input('latitud');
        $evento->longitud = $request->input('longitud');
        $evento->nombreUsuaro = $request->input('nombre');
        $evento->apellidoUsuario = $request->input('apellido');
        $evento->dniUsuario = $request->input('dni');
        
        $evento->save();

    }

    public function filtrar(Request $request)
    {  
        $tipo = $request->input('tipo');
        $fechaDesde = $request->input('fechaDesde');
        $fechaHasta = $request->input('fechaHasta');
        $nombre = $request->input('nombre');
        $apellido = $request->input('apellido');
        $dni = $request->input('dni');
        
        $result = Evento::where('tipoEvento', 'LIKE', '%'.$tipo.'%')
                            ->where('nombreUsuaro', 'LIKE', '%'.$nombre.'%')
                            ->where('apellidoUsuario', 'LIKE', '%'.$apellido.'%')
                            ->where('dniUsuario', 'LIKE', '%'.$dni.'%')->get();

        return $result;

    }

    public function eliminarEvento(Request $request)
    {  
        Evento::find($request->input('id'))->delete();
    }


}
