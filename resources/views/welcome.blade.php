<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        
        <title>Laravel</title>

        <script src="http://127.0.0.1:8000/js/jquery-3.3.1.min.js"></script>
        <link href="http://127.0.0.1:8000/css/fonts.css" rel="stylesheet" type="text/css">
        <link href="http://127.0.0.1:8000/css/w3.css" rel="stylesheet" type="text/css"> 
        <link href="http://127.0.0.1:8000/css/misCSS.css" rel="stylesheet" type="text/css"> 


    </head>

    <body>


        <div id="map"></div>


        <div class="w3-container">
            <div id="id01" class="w3-modal">
                <div class="w3-modal-content w3-card-4 w3-animate-zoom" style="max-width:600px">
                    <div class="w3-center"><br>
                        <span onclick="document.getElementById('id01').style.display='none'" class="w3-button w3-xlarge w3-hover-red w3-display-topright" title="Close Modal">&times;</span>
                        <img src="http://127.0.0.1:8000/img/inicio.jpg" alt="Avatar" style="width:30%" class="w3-circle w3-margin-top">
                    </div>

                    <div class="w3-container">
                        <h1>Eventos Urbanos</h1>
                        <div class="w3-section">
                        <label><b>Nombre</b></label>
                        <input class="w3-input w3-border w3-margin-bottom" type="text" placeholder="Anónimo" id="nombre">
                        <label><b>Apellido</b></label>
                        <input class="w3-input w3-border w3-margin-bottom" type="text" placeholder="Anónimo" id="apellido">
                        <label><b>DNI</b></label>
                        <input class="w3-input w3-border" type="text" placeholder="Anónimo" id="dni">
                        <button class="w3-button w3-block w3-green w3-section w3-padding" id="AccederInicial" onclick="acceder()">Acceder</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- The Modal -->
        <div id="myModal" class="modal">
            <!-- Modal content -->
            <div class="modal-content">
                <span class="close">&times;</span>
                <h1>¿Qué está pasando?</h1>
                <div class="w3-section">
                    <div class="w3-container">
                    <div class="grid-container">
                        <div class="imagenEvento" detalle="Robo" title="Robo" onclick="abrirDetalle(this)"> <image src="http://127.0.0.1:8000/img/RoboX.jpg"> </image>  </div>
                        <div class="imagenEvento" detalle="Fuego" title="Fuego" onclick="abrirDetalle(this)"> <image src="http://127.0.0.1:8000/img/FuegoX.jpg"> </image> </div>
                        <div class="imagenEvento" detalle="Choque-Accidente" title="Choque/Accidente" onclick="abrirDetalle(this)">  <image src="http://127.0.0.1:8000/img/Choque-AccidenteX.jpg "> </image> </div>
                        <div class="imagenEvento" detalle="Animales-Sueltos" title="Animales Sueltos" onclick="abrirDetalle(this)"> <image src="http://127.0.0.1:8000/img/Animales-SueltosX.jpg"> </image>  </div>
                        <div class="imagenEvento" detalle="Pelea-Callejera" title="Pelea Callejera" onclick="abrirDetalle(this)"> <image src="http://127.0.0.1:8000/img/Pelea-CallejeraX.jpg"> </image>  </div>
                        <div class="imagenEvento" detalle="Inundacion" title="Inundación" onclick="abrirDetalle(this)"> <image src="http://127.0.0.1:8000/img/InundacionX.jpg"> </image>  </div>
                        <div class="imagenEvento" detalle="Bache" title="Bache" onclick="abrirDetalle(this)"> <image src="http://127.0.0.1:8000/img/BacheX.jpg"> </image>  </div>
                        <div class="imagenEvento" detalle="Bandalismo" title="Bandalismo" onclick="abrirDetalle(this)"> <image src="http://127.0.0.1:8000/img/BandalismoX.jpg"> </image>  </div>
                        <div class="imagenEvento" detalle="Otro" title="Otro" onclick="abrirDetalle(this)"> <image src="http://127.0.0.1:8000/img/OtroX.jpg"> </image>  </div>
                    </div>
                </div>
                </div>
            </div>
        </div>

        <!-- The Modal -->
        <div id="modalDetalle" class="modal">
            <!-- Modal content -->
            <div class="modalDetalle-content">
                <span class="closeD">&times;</span>
                <h2>Describanos que sucede:</h2>
                <div class="grid-container">
                    <textarea rows="4" cols="50" id="detalleInput">
                    </textarea><br>
                    <button id="detallebtn" onclick="registrarDetalle(this)">Registrar</button>
                </div>
            </div>
        </div>
        
        <div id="ModalListado" class="modalL">
            <div class="modal-contentL">
            <span class="closeL">&times;</span>
                    <h1>Eventos Registrados</h1>
                    Tipo <input type="text" id="tipoF">
                    Fecha Desde <input type="date" data-date-inline-picker="true" id="fechaDF"/>
                    Fecha Hasta <input type="date" data-date-inline-picker="true" id="fechaHF"/>
                    Hora Desde <input type="text" id="horaDF">
                    Hora Hasta <input type="text" id="horaHF">
                    DNI denunciante <input type="text" id="dniF">
                    Nombre denunciante <input type="text" id="nombreF">
                    Apellido denunciante <input type="text" id="apellidoF"> 
                    <button id="filtrobtn"> Filtrar </button> <br>
                    <div class="listadoEventos" id="listadoEventos"></div>
            </div>
        </div>
    
    
    </body>
        <script src="http://127.0.0.1:8000/js/misJS.js"></script>
        <script async defer src="http://127.0.0.1:8000/js/maps.js"></script>
        <!-- 
        <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA8Q8AJ_nnQLSQ7prGI-ZoQKuGEzsmsRXU&callback=initMap"></script>
        !-->
</html>