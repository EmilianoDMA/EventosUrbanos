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
/*
        $diaDesde = explode("-", $fechaDesde)[0];
        $mesDesde = explode("-", $fechaDesde)[1];
        $anioDesde = explode("-", $fechaDesde)[2];

        $diaHasta = explode("-", $fechaHasta)[0];
        $mesHasta = explode("-", $fechaHasta)[1];
        $anioHasta = explode("-", $fechaHasta)[2];
*/        
        $fechaFromateadaDesde = $fechaDesde." 00:00:00"; 
        $fechaFromateadaHasta = $fechaHasta." 23:59:59"; 

        if($fechaDesde != "" and $fechaHasta != ""){
            $result = Evento::where('tipoEvento', 'LIKE', '%'.$tipo.'%')
                                ->where('nombreUsuaro', 'LIKE', '%'.$nombre.'%')
                                ->where('apellidoUsuario', 'LIKE', '%'.$apellido.'%')
                                ->where('dniUsuario', 'LIKE', '%'.$dni.'%')
                                ->whereDate('created_at', '>=',$fechaFromateadaDesde)
                                ->whereDate('created_at', '<=',$fechaFromateadaHasta)
//                                ->whereBetween('created_at', array("2018-05-17 00:00:00", "2018-06-17 00:00:00"))
                                ->get();
        }else{
            $result = Evento::where('tipoEvento', 'LIKE', '%'.$tipo.'%')
            ->where('nombreUsuaro', 'LIKE', '%'.$nombre.'%')
            ->where('apellidoUsuario', 'LIKE', '%'.$apellido.'%')
            ->where('dniUsuario', 'LIKE', '%'.$dni.'%')
            ->get();
        }
        
        return $result;

    }

    public function eliminarEvento(Request $request)
    {  
        Evento::find($request->input('id'))->delete();
    }


}
