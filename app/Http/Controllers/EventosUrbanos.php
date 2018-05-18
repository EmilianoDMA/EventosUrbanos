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
        return Evento::All();

    }

    public function eliminar(Request $request)
    {  
        Evento::find($request->input('id'))->delete();
    }


}
