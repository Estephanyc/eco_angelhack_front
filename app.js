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

    fetch('http://localhost:8000/reciclador/subir', {
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
    fetch(`http://localhost:8000/reciclador/mensaje/${id}`)
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
    fetch(`http://localhost:8000/reciclador/alternativas/${id}`)
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
recyclingPoint = (object) => {
   /*  let long = object.response.data.objeto_id;
    console.log(id)
    fetch(`http://18.233.123.38:8000/reciclador/puntos/lat/long/${long}`)
        .then((response) => response.json())
        .then((responseJson) => {
            responseJson.response.data.forEach(element => {
                document.getElementById('map').innerHTML += JSON.stringify(element);
                console.log(element);
            });

        })
        .catch((error) => {
            console.log(error)
        }); */
}
