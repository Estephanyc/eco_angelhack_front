function sendImage(){ 
    let image = document.getElementById("file").files
    fetch('http://18.233.123.38:8000/reciclador/subir', {
        method: 'POST', body: image
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
