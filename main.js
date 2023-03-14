/*
endpoints sin query parameters
const API_URL = 'https://api.thecatapi.com/v1/images/search';
*/
/* endpoint con query parameters
const API_URL = 'https://api.thecatapi.com/v1/images/search?limit=3';
*/

// con API_KEY
const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=2&api_key=live_krhUpxDq3fu07pNXftZRxW8uYzUbaBpeScrPDskWc3YEPeBDnp14NQeM04yjXroV';
const API_URL_FAVORITES = 'https://api.thecatapi.com/v1/favourites?limit=2&api_key=live_krhUpxDq3fu07pNXftZRxW8uYzUbaBpeScrPDskWc3YEPeBDnp14NQeM04yjXroV';
const spanError = document.getElementById('error');
/*
fetch nos devuelve una promesa, y las promesas podemos resolverlas con el metodo then.
cuando cargamos un API, lo primero que tenemos que hacer es convertir esa respuesta a algo que js pueda entender como un objeto
data -> es un arreglo
data[0] -> es un objeto
document -> para acceder a todo el documento html 
const cambiarGato = () => fetch(API_URL)
    .then(res => res.json())
    .then(data => {
        const img = document.querySelector('img');   //quiero agarrar la etiqueta img del html
        img.src = data[0].url;                       // le modificamos la propiedad src
    })
*/
/*
async function reload(){
    const res = await fetch(API_URL);      // estamos llamando a la API
    const data = await res.json();         // estamos convirtiendo eso a sintaxis que js pueda entender
    console.log(data);
    //const img = document.querySelector('img');  cuando son varias imagenes, no me sirve el queryselector
    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');
    const img3 = document.getElementById('img3');
    //img.src = data[0].url;
    
    img1.src = data[0].url;
    img2.src = data[1].url;
    img3.src = data[2].url;
}
*/
/*
para que recien entremos a nuestra aplicación, no aparezca vacío, lo que podemos hacer es:
llamar a la función apenas terminemos de cargar nuestro archivo js
*/

async function loadRandomMichis(){
    const res = await fetch(API_URL_RANDOM);      // estamos llamando a la API
    const data = await res.json();         // estamos convirtiendo eso a sintaxis que js pueda entender
    console.log('random');
    console.log(data);
    //const img = document.querySelector('img');  cuando son varias imagenes, no me sirve el queryselector

    // el res nos puede decir cómo quedó el status code, el backend nos puede dar un spoiler de como le fue a nuestra solicitud, antes de darnos los datos
    if(res.status !== 200){
       spanError.innerHTML = "Hubo un error: " + res.status; 
    }
    else {
        const img1 = document.getElementById('img1');
        const img2 = document.getElementById('img2');
        img1.src = data[0].url;
        img2.src = data[1].url;
    }
}

async function loadFavoritesMichis(){
    const res = await fetch(API_URL_FAVORITES);      // estamos llamando a la API
    const data = await res.json();         // estamos convirtiendo eso a sintaxis que js pueda entender
    console.log('favorites');
    console.log(data);
    if(res.status !== 200){
        spanError.innerHTML = "Hubo un error: " + res.status + data.message; 
     }
}
loadRandomMichis();
loadFavoritesMichis();