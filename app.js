function sendImage() {
    let image = document.getElementById("file").files
    fetch('http://18.233.123.38:8000/reciclador/subir', {
            method: 'POST',
            body: image
        })
        .then((response) => response.json())
        .then((responseJson) => {
            // Perform success response.
            console.log(responseJson);
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