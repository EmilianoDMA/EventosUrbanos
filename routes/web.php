<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
use laravelApp\Evento;


Route::get('/test', function(){
    return view('mapa');
 });

 Route::get('blade', function () {
    return view('child');
});

Route::get('/map', 'MapController@index');

Route::get('/', function(){
    $config['center'] = 'Trelew, Arg';
    $config['zoom'] = '14';
    $config['map_height'] = '500px';
    $config['scrollwheel'] = true;

    GMaps::initialize($config);

    $map = GMaps::create_map();

    $marker['position'] = "Trelew";
    GMaps::add_marker($marker);

    return view('welcome')->with ('map', $map);
});

Route::post('guardar', 'EventosUrbanos@save_data');
Route::post('eliminarE', 'EventosUrbanos@eliminarEvento');

Route::get('cargarMarkers', function(){
    if(Request::ajax()){
        return Evento::All();
    }
});

Route::get('logout', function(){
    Auth::logout();
});

Route::post('filtrar', 'EventosUrbanos@filtrar');


//$app->post('/e', 'GuardarEvento@save_data');

/*
Route::get('/', function(){
    $config = array();
    $config['center'] = 'New York, USA';
    GMaps::initialize($config);
    $map = GMaps::create_map();

    echo $map['js'];
    echo $map['html'];
});
*/

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
