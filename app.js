function previewImg(file) {
    var reader = new FileReader();
    reader.onload = function () {
        preview.src = reader.result;
    }
    if (file) {
        reader.readAsDataURL(file);
    }
    sendImage()
}
function sendImage(){
    let image = document.getElementById("file").files;

    var data = new FormData()
    data.append('image', image[0])

    fetch('http://18.233.123.38:8000/reciclador/subir', {
        method: 'POST',
        body: data,
    })
    .then((response) => response.json())
    .then((responseJson) => {
            secondView(responseJson)
        })
        .catch((error) => {
            console.log(error)
        });
};
var x = document.getElementById("demo");

window.onload = function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition);
    } else {
        x.alert("Geolocalización no soportada por el navegador.");
    }
}

function showPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            x.alert("El usuario no da permiso para obtener su ubicación.")
            break;
        case error.POSITION_UNAVAILABLE:
            x.alert("La información de ubicación no está disponible.")
            break;
        case error.TIMEOUT:
            x.alert("Ha expirado el tiempo de la solicitud.")
            break;
        case error.UNKNOWN_ERROR:
            x.alert("Ha ocurrido un error inesperado.")
            break;
    }
}
secondView =(object)=>{
    document.getElementById('second').style.display = 'block';
    document.getElementById('first').style.display = 'none';
    let composicion = object.response.data.composicion
    document.getElementById('composicion').innerHTML += 'Probablemente es de ' + composicion
    alternative(object);
    message(object)
    recyclingPoint(object);
}
message = (object) =>
{
    let id = object.response.data.objeto_id;
    console.log(id)
    fetch(`http://18.233.123.38:8000/reciclador/mensaje/${id}`)
        .then((response) => response.json())
        .then((responseJson) => {
            document.getElementById('message').innerHTML = responseJson.response.data;
            console.log(responseJson.response.data.composicion);
        })
        .catch((error) => {
            console.log(error)
        });
}
alternative = (object) => {
    let id = object.response.data.objeto_id;
    console.log(id)
    fetch(`http://18.233.123.38:8000/reciclador/alternativas/${id}`)
        .then((response) => response.json())
        .then((responseJson) => {
            let alternative = responseJson.response.data
            let lista = '<ul>';
            alternative.forEach(element => {
              console.log(element);
                lista += '<li>' + element.descripcion + '</li>';
            });
            lista += '</ul>';
            document.getElementById('alternatives').innerHTML += lista;
        })
        .catch((error) => {
            console.log(error)
        });
}

mostrarMapa = (puntos) => {
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  const latitud = -33.4162734;
  const longitud = -70.5898275;

  console.log(latitud);
  console.log(longitud);

  document.getElementById('second').style.display = 'none';
  document.getElementById('third').style.display = 'block';
  const mymap = L.map('map').setView([latitud, longitud], 50);
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZ3V0ZWZjbyIsImEiOiJjampjdXlqaG0zbXR3M3FvaGU5cG93ZXdlIn0.6b_Z9AeAgi1U7J4wiiX87w', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'your.mapbox.access.token'
  }).addTo(mymap);
  var marker = L.marker([latitud, longitud]).addTo(mymap);

  var greenIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  puntos.forEach(punto => {
    L.marker([punto.lat, punto.long], {icon: greenIcon}).addTo(mymap);
  });

  /*navigator.geolocation.getCurrentPosition(function(pos){
    const latitud = -33.4162734;
    const longitud = -70.5898275;

    console.log(latitud);
    console.log(longitud);

    document.getElementById('second').style.display = 'none';
    document.getElementById('third').style.display = 'block';
    const mymap = L.map('map').setView([latitud, longitud], 50);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZ3V0ZWZjbyIsImEiOiJjampjdXlqaG0zbXR3M3FvaGU5cG93ZXdlIn0.6b_Z9AeAgi1U7J4wiiX87w', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'your.mapbox.access.token'
    }).addTo(mymap);
    var marker = L.marker([latitud, longitud]).addTo(mymap);

    var greenIcon = new L.Icon({
      iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    puntos.forEach(punto => {
      L.marker([punto.lat, punto.long], {icon: greenIcon}).addTo(mymap);
    });


  }, function(err){
    console.log('ERROR', err);
  }, options);*/
}

recyclingPoint = (object) => {
    let id = object.response.data.objeto_id;
    console.log(id)
    fetch(`http://18.233.123.38:8000/reciclador/puntos/lat/long/${id}`)
        .then((response) => response.json())
        .then((responseJson) => {
            $('#mostrarMap').on('click', function(){
              mostrarMapa(responseJson.response.data);
            });
            responseJson.response.data.forEach(element => {
                console.log(element);
            });

        })
        .catch((error) => {
            console.log(error)
        });
}
