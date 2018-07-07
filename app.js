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
    let image = document.getElementById("file").files
    fetch('http://18.233.123.38:8000/reciclador/subir', {
        method: 'POST', body: image
    })
    .then((response) => response.json())
    .then((responseJson) => {
            secondView(responseJson)
        })
    .catch((error) => {
        console.log(error)
    });
};
secondView =(object)=>{
    document.getElementById('second').style.display = 'block';
    document.getElementById('first').style.display = 'none';
    document.getElementById('composicion').innerHTML += JSON.stringify(object.response.data);
    message(object)
    alternative(object);
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
            responseJson.response.data.forEach(element => {
                document.getElementById('alternatives').innerHTML += JSON.stringify(element);
                console.log(element);
            });
           
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
