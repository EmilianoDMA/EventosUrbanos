           document.getElementById('id01').style.display='block';
            var Nombre = "Anonimo";
            var Apellido = "Anonimo";
            var DNI = "Anonimo";
            var latitud;
            var longitud;
            var descripcion = "Ninguna";
            var markerGlobal;
            var tipo;
            var map;
            var ubicacion = {lat: -43.253302, lng: -65.310101};
            function initMap() {
                
                var myLatlng = {lat: -43.253302, lng: -65.310101};

                map = new google.maps.Map(document.getElementById('map'), {
                zoom: 15,
                center: myLatlng
                });

               // map.addListener('center_changed', function() {
                    // 3 seconds after the center of the map has changed, pan back to the
                    // marker.
               //     window.setTimeout(function() {
               //         map.panTo(myLatlng);
               //     }, 10000);
               // });

                google.maps.event.addListener(map, 'click', function(event) {
                    latitud = event.latLng.lat();
                    longitud = event.latLng.lng();
                    markerGlobal = placeMarker(event.latLng);
                    markerGlobal.setIcon("http://127.0.0.1:8000/img/vacio.png");
                    abrirModal();
                });

                function abrirModal(){
                    console.log("entro a abrir")
                    modal.style.display = "block";
                }
                
                //Boton en mapa
                function CenterControl(controlDiv, map) {

                    // Set CSS for the control border.
                    var controlUI = document.createElement('div');
                    controlUI.style.backgroundColor = '#fff';
                    controlUI.style.border = '2px solid #fff';
                    controlUI.style.borderRadius = '3px';
                    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
                    controlUI.style.cursor = 'pointer';
                    controlUI.style.marginBottom = '22px';
                    controlUI.style.textAlign = 'center';
                    controlUI.title = 'Click para listar los eventos';
                    
                    controlDiv.appendChild(controlUI);

                    // Set CSS for the control interior.
                    var controlText = document.createElement('div');
                    controlText.style.color = 'rgb(25,25,25)';
                    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
                    controlText.style.fontSize = '16px';
                    controlText.style.lineHeight = '38px';
                    controlText.style.paddingLeft = '5px';
                    controlText.style.paddingRight = '5px';
                    controlText.innerHTML = '<div class="ListadoBtn">Listado Eventos</div>';
                    controlUI.appendChild(controlText);

                    // Setup the click event listeners: simply set the map to Chicago.
                    controlUI.addEventListener('click', function() {             
                        $.get('cargarMarkers', function(data){
                            var latitudlongitud;
                            var marcadorAux;
                            var listadoDiv = document.getElementsByClassName("listadoEventos")[0];
                            var infowindow;
                            $('#listadoEventos').html("");
                            $('#listadoEventos').append($("<table>"));
                            $('#listadoEventos').append($("<tr>"));
                            $('#listadoEventos').append($('<th>').html("Tipo"));
                            $('#listadoEventos').append($("</th>"));
                            $('#listadoEventos').append($('<th>').html("Creado el"));                        
                            $('#listadoEventos').append($("</th>"));
                            $('#listadoEventos').append($('<th>').html("Latitud"));                        
                            $('#listadoEventos').append($("</th>"));
                            $('#listadoEventos').append($('<th>').html("Latitud"));                        
                            $('#listadoEventos').append($("</th>"));
                            $('#listadoEventos').append($('<th>').html("Descripción"));                        
                            $('#listadoEventos').append($("</th>"));
                            $('#listadoEventos').append($('<th>').html("Nombre denunciante"));                        
                            $('#listadoEventos').append($("</th>"));
                            $('#listadoEventos').append($('<th>').html("Apellido denunciante"));                        
                            $('#listadoEventos').append($("</th>"));
                            $('#listadoEventos').append($('<th>').html("DNI denunciante"));                        
                            $('#listadoEventos').append($("</th>"));
                            $('#listadoEventos').append($('<th>').html("Eliminar"));                        
                            $('#listadoEventos').append($("</th>"));
                            $('#listadoEventos').append($("</tr>"));
        
                            data.forEach(d => {
                                $('#listadoEventos').append($("<tr>"));
                                $('#listadoEventos').append($('<th>').html(d.tipoEvento));
                                $('#listadoEventos').append($("</th>"));
                                $('#listadoEventos').append($('<th>').html(d.created_at));                        
                                $('#listadoEventos').append($("</th>"));
                                $('#listadoEventos').append($('<th>').html(d.latitud));                        
                                $('#listadoEventos').append($("</th>"));
                                $('#listadoEventos').append($('<th>').html(d.longitud));                        
                                $('#listadoEventos').append($("</th>"));
                                $('#listadoEventos').append($('<th>').html(d.descripcion));                        
                                $('#listadoEventos').append($("</th>"));
                                $('#listadoEventos').append($('<th>').html(d.nombreUsuaro));                        
                                $('#listadoEventos').append($("</th>"));
                                $('#listadoEventos').append($('<th>').html(d.apellidoUsuario));                        
                                $('#listadoEventos').append($("</th>"));
                                $('#listadoEventos').append($('<th>').html(d.dniUsuario));                        
                                $('#listadoEventos').append($("</th>"));
                                $('#listadoEventos').append($('<th>').append("<button>").attr("onclick","eliminar(this)").attr("id",d.id));                        
                                $('#listadoEventos').append($("</th>"));
                                $('#listadoEventos').append($("</tr>"));
                                latitudlongitud = {lat: d.latitud, lng: d.longitud};
                                marcadorAux = placeMarker(latitudlongitud);
                                var marcadorTemp = marcadorAux;
                                if(d.tipoEvento == "Otro"){
                                    marcadorTemp.setIcon("http://127.0.0.1:8000/img/" + d.tipoEvento + ".png");
                                }else{
                                    marcadorTemp.setIcon("http://127.0.0.1:8000/img/" + d.tipoEvento + ".jpg");
                                }
                                marcadorTemp.addListener('click', function() {
                                    infowindow = new google.maps.InfoWindow({
                                        content: d.descripcion
                                    });
                                    infowindow.open(map, marcadorTemp);
                                });
                            });
                            $('#listadoEventos').append($("</table>"));
                        });
                        modalL.style.display = "block";
                    });
                    

                }
                    
                var centerControlDiv = document.createElement('div');
                var centerControl = new CenterControl(centerControlDiv, map);

                centerControlDiv.index = 1;
                map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
            //--------
                
                $.get('cargarMarkers', function(data){
                    var latitudlongitud;
                    var marcadorAux;
                    var listadoDiv = document.getElementsByClassName("listadoEventos")[0];
                    var infowindow;
                    $('#listadoEventos').html("");
                    $('#listadoEventos').append($("<table>"));
                    $('#listadoEventos').append($("<tr>"));
                    $('#listadoEventos').append($('<th>').html("Tipo"));
                    $('#listadoEventos').append($("</th>"));
                    $('#listadoEventos').append($('<th>').html("Creado el"));                        
                    $('#listadoEventos').append($("</th>"));
                    $('#listadoEventos').append($('<th>').html("Latitud"));                        
                    $('#listadoEventos').append($("</th>"));
                    $('#listadoEventos').append($('<th>').html("Latitud"));                        
                    $('#listadoEventos').append($("</th>"));
                    $('#listadoEventos').append($('<th>').html("Descripción"));                        
                    $('#listadoEventos').append($("</th>"));
                    $('#listadoEventos').append($('<th>').html("Nombre denunciante"));                        
                    $('#listadoEventos').append($("</th>"));
                    $('#listadoEventos').append($('<th>').html("Apellido denunciante"));                        
                    $('#listadoEventos').append($("</th>"));
                    $('#listadoEventos').append($('<th>').html("DNI denunciante"));                        
                    $('#listadoEventos').append($("</th>"));
                    $('#listadoEventos').append($('<th>').html("Eliminar"));                        
                    $('#listadoEventos').append($("</th>"));
                    $('#listadoEventos').append($("</tr>"));

                    data.forEach(d => {
                        $('#listadoEventos').append($("<tr>"));
                        $('#listadoEventos').append($('<th>').html(d.tipoEvento));
                        $('#listadoEventos').append($("</th>"));
                        $('#listadoEventos').append($('<th>').html(d.created_at));                        
                        $('#listadoEventos').append($("</th>"));
                        $('#listadoEventos').append($('<th>').html(d.latitud));                        
                        $('#listadoEventos').append($("</th>"));
                        $('#listadoEventos').append($('<th>').html(d.longitud));                        
                        $('#listadoEventos').append($("</th>"));
                        $('#listadoEventos').append($('<th>').html(d.descripcion));                        
                        $('#listadoEventos').append($("</th>"));
                        $('#listadoEventos').append($('<th>').html(d.nombreUsuaro));                        
                        $('#listadoEventos').append($("</th>"));
                        $('#listadoEventos').append($('<th>').html(d.apellidoUsuario));                        
                        $('#listadoEventos').append($("</th>"));
                        $('#listadoEventos').append($('<th>').html(d.dniUsuario));                        
                        $('#listadoEventos').append($("</th>"));
                        $('#listadoEventos').append($('<th>').append("<button>").attr("onclick","eliminar(this)").attr("id",d.id));                        
                        $('#listadoEventos').append($("</th>"));
                        $('#listadoEventos').append($("</tr>"));
                        latitudlongitud = {lat: d.latitud, lng: d.longitud};
                        marcadorAux = placeMarker(latitudlongitud);
                        var marcadorTemp = marcadorAux;
                        if(d.tipoEvento == "Otro"){
                            marcadorTemp.setIcon("http://127.0.0.1:8000/img/" + d.tipoEvento + ".png");
                        }else{
                            marcadorTemp.setIcon("http://127.0.0.1:8000/img/" + d.tipoEvento + ".jpg");
                        }
                        marcadorTemp.addListener('click', function() {
                            infowindow = new google.maps.InfoWindow({
                                content: d.descripcion
                            });
                            infowindow.open(map, marcadorTemp);
                        });
                    });
                    $('#listadoEventos').append($("</table>"));
                });
            }

            //********** FIN initMap() */

            function recargarMapa(datosFiltro) {
                
                var myLatlng = {lat: -43.253302, lng: -65.310101};

                map = new google.maps.Map(document.getElementById('map'), {
                zoom: 15,
                center: myLatlng
                });

                google.maps.event.addListener(map, 'click', function(event) {
                    latitud = event.latLng.lat();
                    longitud = event.latLng.lng();
                    markerGlobal = placeMarker(event.latLng);
                    markerGlobal.setIcon("http://127.0.0.1:8000/img/vacio.png");
                    abrirModal();
                });

                function abrirModal(){
                    modal.style.display = "block";
                }
                
                //Boton en mapa
                function CenterControl(controlDiv, map) {

                    // Set CSS for the control border.
                    var controlUI = document.createElement('div');
                    controlUI.style.backgroundColor = '#fff';
                    controlUI.style.border = '2px solid #fff';
                    controlUI.style.borderRadius = '3px';
                    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
                    controlUI.style.cursor = 'pointer';
                    controlUI.style.marginBottom = '22px';
                    controlUI.style.textAlign = 'center';
                    controlUI.title = 'Click para listar los eventos';
                    
                    controlDiv.appendChild(controlUI);

                    // Set CSS for the control interior.
                    var controlText = document.createElement('div');
                    controlText.style.color = 'rgb(25,25,25)';
                    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
                    controlText.style.fontSize = '16px';
                    controlText.style.lineHeight = '38px';
                    controlText.style.paddingLeft = '5px';
                    controlText.style.paddingRight = '5px';
                    controlText.innerHTML = '<div class="ListadoBtn">Listado Eventos</div>';
                    controlUI.appendChild(controlText);

                    // Setup the click event listeners: simply set the map to Chicago.
                    controlUI.addEventListener('click', function() {             
                        //$.get('cargarMarkers', function(data){
                            var latitudlongitud;
                            var marcadorAux;
                            var listadoDiv = document.getElementsByClassName("listadoEventos")[0];
                            var infowindow;
                            $('#listadoEventos').html("");
                            $('#listadoEventos').append($("<table>"));
                            $('#listadoEventos').append($("<tr>"));
                            $('#listadoEventos').append($('<th>').html("Tipo"));
                            $('#listadoEventos').append($("</th>"));
                            $('#listadoEventos').append($('<th>').html("Creado el"));                        
                            $('#listadoEventos').append($("</th>"));
                            $('#listadoEventos').append($('<th>').html("Latitud"));                        
                            $('#listadoEventos').append($("</th>"));
                            $('#listadoEventos').append($('<th>').html("Latitud"));                        
                            $('#listadoEventos').append($("</th>"));
                            $('#listadoEventos').append($('<th>').html("Descripción"));                        
                            $('#listadoEventos').append($("</th>"));
                            $('#listadoEventos').append($('<th>').html("Nombre denunciante"));                        
                            $('#listadoEventos').append($("</th>"));
                            $('#listadoEventos').append($('<th>').html("Apellido denunciante"));                        
                            $('#listadoEventos').append($("</th>"));
                            $('#listadoEventos').append($('<th>').html("DNI denunciante"));                        
                            $('#listadoEventos').append($("</th>"));
                            $('#listadoEventos').append($('<th>').html("Eliminar"));                        
                            $('#listadoEventos').append($("</th>"));
                            $('#listadoEventos').append($("</tr>"));
        
                            datosFiltro.forEach(d => {
                                $('#listadoEventos').append($("<tr>"));
                                $('#listadoEventos').append($('<th>').html(d.tipoEvento));
                                $('#listadoEventos').append($("</th>"));
                                $('#listadoEventos').append($('<th>').html(d.created_at));                        
                                $('#listadoEventos').append($("</th>"));
                                $('#listadoEventos').append($('<th>').html(d.latitud));                        
                                $('#listadoEventos').append($("</th>"));
                                $('#listadoEventos').append($('<th>').html(d.longitud));                        
                                $('#listadoEventos').append($("</th>"));
                                $('#listadoEventos').append($('<th>').html(d.descripcion));                        
                                $('#listadoEventos').append($("</th>"));
                                $('#listadoEventos').append($('<th>').html(d.nombreUsuaro));                        
                                $('#listadoEventos').append($("</th>"));
                                $('#listadoEventos').append($('<th>').html(d.apellidoUsuario));                        
                                $('#listadoEventos').append($("</th>"));
                                $('#listadoEventos').append($('<th>').html(d.dniUsuario));                        
                                $('#listadoEventos').append($("</th>"));
                                $('#listadoEventos').append($('<th>').append("<button>").attr("onclick","eliminar(this)").attr("id",d.id));                        
                                $('#listadoEventos').append($("</th>"));
                                $('#listadoEventos').append($("</tr>"));
                                latitudlongitud = {lat: d.latitud, lng: d.longitud};
                                marcadorAux = placeMarker(latitudlongitud);
                                var marcadorTemp = marcadorAux;
                                if(d.tipoEvento == "Otro"){
                                    marcadorTemp.setIcon("http://127.0.0.1:8000/img/" + d.tipoEvento + ".png");
                                }else{
                                    marcadorTemp.setIcon("http://127.0.0.1:8000/img/" + d.tipoEvento + ".jpg");
                                }
                                marcadorTemp.addListener('click', function() {
                                    infowindow = new google.maps.InfoWindow({
                                        content: d.descripcion
                                    });
                                    infowindow.open(map, marcadorTemp);
                                });
                            });
                            $('#listadoEventos').append($("</table>"));
                        
                        modalL.style.display = "block";
                    });
                    

                }
                    
                var centerControlDiv = document.createElement('div');
                var centerControl = new CenterControl(centerControlDiv, map);

                centerControlDiv.index = 1;
                map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
            //--------
                
                //$.get('cargarMarkers', function(data){
                    var latitudlongitud;
                    var marcadorAux;
                    var listadoDiv = document.getElementsByClassName("listadoEventos")[0];
                    var infowindow;
                    $('#listadoEventos').html("");
                    $('#listadoEventos').append($("<table>"));
                    $('#listadoEventos').append($("<tr>"));
                    $('#listadoEventos').append($('<th>').html("Tipo"));
                    $('#listadoEventos').append($("</th>"));
                    $('#listadoEventos').append($('<th>').html("Creado el"));                        
                    $('#listadoEventos').append($("</th>"));
                    $('#listadoEventos').append($('<th>').html("Latitud"));                        
                    $('#listadoEventos').append($("</th>"));
                    $('#listadoEventos').append($('<th>').html("Latitud"));                        
                    $('#listadoEventos').append($("</th>"));
                    $('#listadoEventos').append($('<th>').html("Descripción"));                        
                    $('#listadoEventos').append($("</th>"));
                    $('#listadoEventos').append($('<th>').html("Nombre denunciante"));                        
                    $('#listadoEventos').append($("</th>"));
                    $('#listadoEventos').append($('<th>').html("Apellido denunciante"));                        
                    $('#listadoEventos').append($("</th>"));
                    $('#listadoEventos').append($('<th>').html("DNI denunciante"));                        
                    $('#listadoEventos').append($("</th>"));
                    $('#listadoEventos').append($('<th>').html("Eliminar"));                        
                    $('#listadoEventos').append($("</th>"));
                    $('#listadoEventos').append($("</tr>"));

                    datosFiltro.forEach(d => {
                        $('#listadoEventos').append($("<tr>"));
                        $('#listadoEventos').append($('<th>').html(d.tipoEvento));
                        $('#listadoEventos').append($("</th>"));
                        $('#listadoEventos').append($('<th>').html(d.created_at));                        
                        $('#listadoEventos').append($("</th>"));
                        $('#listadoEventos').append($('<th>').html(d.latitud));                        
                        $('#listadoEventos').append($("</th>"));
                        $('#listadoEventos').append($('<th>').html(d.longitud));                        
                        $('#listadoEventos').append($("</th>"));
                        $('#listadoEventos').append($('<th>').html(d.descripcion));                        
                        $('#listadoEventos').append($("</th>"));
                        $('#listadoEventos').append($('<th>').html(d.nombreUsuaro));                        
                        $('#listadoEventos').append($("</th>"));
                        $('#listadoEventos').append($('<th>').html(d.apellidoUsuario));                        
                        $('#listadoEventos').append($("</th>"));
                        $('#listadoEventos').append($('<th>').html(d.dniUsuario));                        
                        $('#listadoEventos').append($("</th>"));
                        $('#listadoEventos').append($('<th>').append("<button>").attr("onclick","eliminar(this)").attr("id",d.id));                        
                        $('#listadoEventos').append($("</th>"));
                        $('#listadoEventos').append($("</tr>"));
                        latitudlongitud = {lat: d.latitud, lng: d.longitud};
                        marcadorAux = placeMarker(latitudlongitud);
                        var marcadorTemp = marcadorAux;
                        if(d.tipoEvento == "Otro"){
                            marcadorTemp.setIcon("http://127.0.0.1:8000/img/" + d.tipoEvento + ".png");
                        }else{
                            marcadorTemp.setIcon("http://127.0.0.1:8000/img/" + d.tipoEvento + ".jpg");
                        }
                        marcadorTemp.addListener('click', function() {
                            infowindow = new google.maps.InfoWindow({
                                content: d.descripcion
                            });
                            infowindow.open(map, marcadorTemp);
                        });
                    });
                    $('#listadoEventos').append($("</table>"));
                
            }

            /****** FIN recargarMapa() */

            function placeMarker(location) {
                var marker = new google.maps.Marker({
                    position: location, 
                    map: map
                });
                return marker;
            }
          //  settearTipo(obj){
          //      tipoGlobal = detalle;
          //      marcadorListo = true;
          //  }
            // Get the modal

            function acceder(){
                document.getElementById('id01').style.display='none';
                
                var nombreAux = document.getElementById('nombre').value;
                var apellidoAux = document.getElementById('apellido').value;
                var dniAux = document.getElementById('dni').value;
                if(nombreAux!=""){
                    Nombre = nombreAux;
                }
                if(apellidoAux!=""){
                    Apellido = apellidoAux;
                }
                if(dniAux!=""){
                    DNI = dniAux;
                }
            }
            
            var modalL = document.getElementById('ModalListado');
            var modal = document.getElementById('myModal');
            var modalDetalle = document.getElementById('modalDetalle');

            // Get the button that opens the modal
            var btn = document.getElementById("map");
            var detallebtn = document.getElementById("detallebtn");
            
            // Get the <span> element that closes the modal
            var span = document.getElementsByClassName("close")[0];
            var spanL = document.getElementsByClassName("closeL")[0];
            var spanD = document.getElementsByClassName("closeD")[0];

            var entrar = document.getElementsByClassName("entrar")[0];



            // When the user clicks on <span> (x), close the modal
            span.onclick = function() {
                modal.style.display = "none";
                markerGlobal.setMap(null);
            }

            spanL.onclick = function() {
                modalL.style.display = "none";
            }

            spanD.onclick = function() {
                modalDetalle.style.display = "none";
            }
            

            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function(event) {
                if (event.target == modal) {
                    markerGlobal.setMap(null);
                    modal.style.display = "none";
                }
            }

            function abrirDetalle(obj) {
                modalDetalle.style.display = "block";
                tipo = (obj).getAttribute("detalle");
            }

            function registrarDetalle(obj) {
                descripcion = jQuery("textarea#detalleInput").val();
                var infowindow = new google.maps.InfoWindow({
                    content: descripcion
                  });
                var marcadorTemp = markerGlobal;
                marcadorTemp.addListener('click', function() {
                    infowindow.open(map, marcadorTemp);
                });
                modalDetalle.style.display = "none";
                settearMarker(marcadorTemp);
            }

            function settearMarker(marcadorTemp){
                if(tipo == "Otro"){
                    marcadorTemp.setIcon("http://127.0.0.1:8000/img/" + tipo + ".png");
                }else{
                    marcadorTemp.setIcon("http://127.0.0.1:8000/img/" + tipo + ".jpg");
                }
                guardarEvento();
                modal.style.display = "none";
            }
            /*
                            'fechaDesde': document.getElementById('fechaDF'),
                            'fechaHasta' : document.getElementById('fechaHF'),
                            'tipo' : document.getElementById('tipoF'),
                            'nombre' : document.getElementById('nombreF'),
                            'apellido' : document.getElementById('apellidoF'),
                            'dni' : document.getElementById('dniF')
              */      

            function eliminar(obj){
                idEliminar = obj.getAttribute("id");
                console.log(idEliminar);
                $.ajaxSetup({
                    headers: {
                      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    }
                  });
                $.ajax({
                    method: 'POST', // Type of response and matches what we said in the route
                    url: 'eliminarE', // This is the url we gave in the route
                    data: {'id': idEliminar}, // a JSON object to send back
                    success: function(response){ // What to do if we succeed
                        console.log(response);
                        initMap();
                    },
                    error: function(jqXHR, textStatus, errorThrown) { // What to do if we fail
                        console.log(JSON.stringify(jqXHR));
                        console.log("AJAX error: " + textStatus + ' : ' + errorThrown);
                    }
                });    
            }

            var filtrobtn = document.getElementById('filtrobtn');

            filtrobtn.onclick = function() {
                console.log("click en filtrar");
                var tipo = document.getElementById('tipoF').value
                var fechaDesde = document.getElementById('fechaDF').value
                var fechaHasta = document.getElementById('fechaHF').value
                var dni = document.getElementById('dniF').value
                var nombre = document.getElementById('nombreF').value
                var apellido = document.getElementById('apellidoF').value

                $.ajaxSetup({
                    headers: {
                      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    }
                  });

                $.ajax({
                    method: 'POST', // Type of response and matches what we said in the route
                    url: 'filtrar', // This is the url we gave in the route
                    data: { 'tipo': tipo,
                            'fechaDesde': fechaDesde,
                            'fechaHasta': fechaHasta,
                            'dni': dni,
                            'nombre': nombre,
                            'apellido': apellido}, // a JSON object to send back
                    success: function(response){ // What to do if we succeed
                        recargarMapa(response);
                        console.log(response); 
                    },
                    error: function(jqXHR, textStatus, errorThrown) { // What to do if we fail
                        console.log(JSON.stringify(jqXHR));
                        console.log("AJAX error: " + textStatus + ' : ' + errorThrown);
                    }
                });
            }

            function guardarEvento(){
                var currentdate = new Date(); 
                //console.log(currentdate);
                $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
                });
                $.ajax({
                    method: 'POST', // Type of response and matches what we said in the route
                    url: 'guardar', // This is the url we gave in the route
                    data: {'fechaEvento': currentdate,
                            'descripcion' : descripcion,
                            'tipo' : tipo,
                            'latitud' : latitud,
                            'longitud' : longitud,
                            'nombre' : Nombre,
                            'apellido' : Apellido,
                            'dni' : DNI
                    }, // a JSON object to send back
                    success: function(response){ // What to do if we succeed
                        console.log(response); 
                    },
                    error: function(jqXHR, textStatus, errorThrown) { // What to do if we fail
                        console.log(JSON.stringify(jqXHR));
                        console.log("AJAX error: " + textStatus + ' : ' + errorThrown);
                    }
                });
            }