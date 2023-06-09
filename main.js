/*
endpoints sin query parameters
const API_URL = 'https://api.thecatapi.com/v1/images/search';
*/
/* endpoint con query parameters
const API_URL = 'https://api.thecatapi.com/v1/images/search?limit=3';
*/

// con API_KEY
const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=2';
const API_URL_FAVORITES = 'https://api.thecatapi.com/v1/favourites';
const API_URL_FAVORITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}`;
const API_URL_UPLOAD = 'https://api.thecatapi.com/v1/images/upload';
const spanError = document.getElementById('error')
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
        const btn1 = document.getElementById('btn1');
        const btn2 = document.getElementById('btn2');
        img1.src = data[0].url;
        img2.src = data[1].url;
        btn1.onclick = () => saveFavouriteMichi(data[0].id);    // cuando le demos click al boton, es cuando se ejecuta el metodo
        btn2.onclick = () => saveFavouriteMichi(data[1].id);
    }
}

async function loadFavouriteMichis(){
    const res = await fetch(API_URL_FAVORITES, {
        method: 'GET',
        headers:{
            'X-API-KEY': "live_krhUpxDq3fu07pNXftZRxW8uYzUbaBpeScrPDskWc3YEPeBDnp14NQeM04yjXroV"
        },
    });      // estamos llamando a la API
    const data = await res.json();         // estamos convirtiendo eso a sintaxis que js pueda entender
    console.log('favourites');
    console.log(data);
    if(res.status !== 200){
        spanError.innerHTML = "Hubo un error: " + res.status + data.message; 
     } else{
         const section = document.getElementById('favoriteMichis');
        section.innerHTML = "";
        const h2  = document.createElement('h2');
        const h2Text  = document.createTextNode('Michis favoritos');
        h2.appendChild(h2Text);
        section.appendChild(h2);

        data.forEach(gato => {
            const article = document.createElement('article');
            const img = document.createElement('img');
            const btn = document.createElement('button');
            const btnText = document.createTextNode('Sacar al gato de favoritos');

            img.src = gato.image.url;
            img.width = 150;
            btn.appendChild(btnText);
            btn.onclick = () => deleteFavouriteMichi(gato.id);
            article.appendChild(img);
            article.appendChild(btn);
            section.appendChild(article);
        });
     }
}

async function saveFavouriteMichi(id){
    /* cuando llamamos a fetch y le queremos indicar un metodo distinto al por defecto que es GET, en este caso POST
    tenemos que especificarselo con un segundo argumento de nuestra funcion, en este caso es un objeto que tiene toda la info para enviarle al API
    por defecto siempre nos pide un header y un body
    el body es la imagen que queremos guardar en favoritos
    */
    const res = await fetch(API_URL_FAVORITES, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': 'live_krhUpxDq3fu07pNXftZRxW8uYzUbaBpeScrPDskWc3YEPeBDnp14NQeM04yjXroV'
        },
        body: JSON.stringify({
            image_id: id
        }),
    });
    const data = await res.json();
    console.log('Save')
    console.log(res)
    if(res.status !== 200){
        spanError.innerHTML = "Hubo un error: " + res.status + data.message; 
     }else{
        console.log('Michi guardado en favoritos');
        loadFavouriteMichis();
     }
}

async function deleteFavouriteMichi(id) {
    const res = await fetch(API_URL_FAVORITES_DELETE(id), {
    method: 'DELETE',
    headers: {
        'X-API-KEY': 'live_krhUpxDq3fu07pNXftZRxW8uYzUbaBpeScrPDskWc3YEPeBDnp14NQeM04yjXroV',
    }
    });
    const data = await res.json();
    if(res.status !== 200){
        spanError.innerHTML = "Hubo un error: " + res.status + data.message; 
     }else{
        console.log('Michi eliminado de favoritos');
        loadFavouriteMichis();
     }
}

async function uploadGatoPhoto() {
    const form = document.getElementById('uploadingForm');
    const formData = new FormData(form);
    console.log(formData.get('file'));

    const res = await fetch(API_URL_UPLOAD,{
        method: 'POST',
        headers:{
            // 'Content-Type': 'multipart/form-data',
            'X-API-KEY': 'live_krhUpxDq3fu07pNXftZRxW8uYzUbaBpeScrPDskWc3YEPeBDnp14NQeM04yjXroV',
        },
        body: formData,
    })
    const data = await res.json();
    if(res.status !== 201){
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
        console.log({data}) 
     }else{
        console.log('Foto de gato subida');
        console.log({data});
        console.log(data.url);
        saveFavouriteMichi(data.id);
     }
}
loadRandomMichis();
loadFavouriteMichis();