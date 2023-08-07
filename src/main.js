const article= document.querySelector('#containerRandom');
const randomPokemonContainer=document.querySelector('#randomPokemon');
const pokemonSearch=document.querySelector('.container-card--search');
const contenedorPokemonSearch=document.getElementById('container-card')
const titleMainSection=document.querySelector('#main-section--title');
const search=document.getElementById('search');
const input= document.getElementById('busqueda');
const pokemonCard=document.querySelector('.randomPokemon-container--view');
const nombrePoke=document.getElementById('busqueda');

const API_URL_RANDOM='https://pokeapi.co/api/v2/pokemon-form/';
const API_URL_NOMBRE='https://pokeapi.co/api/v2/pokemon/';
const API_URL_CATEGORIES='https://pokeapi.co/api/v2/type/'

// función que establece un numero random, se usa para generar el codigo al azar de los pokemon que aparecen de manera aleatoria en el home de la pagina

const random=(min, max)=> {
   
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

// función que crea la principal card de pokemon
function cardPokemonSimply(imagen, nombre) {
    
    const contenedor=document.createElement('article');
    contenedor.setAttribute('class', 'randomPokemon-container--view')
    const img  =document.createElement('img');
    img.setAttribute('src', imagen);
    img.setAttribute('class', 'random-pokemon--imagen');
    const div=document.createElement('div');
    div.setAttribute('class', 'random-container--nombre')
    const parrafo=document.createElement('p');
    parrafo.innerHTML=(nombre);
    const boton=document.createElement('button');
    boton.innerText=('Conocer más');

    article.appendChild(contenedor);
    contenedor.appendChild(img);
    contenedor.appendChild(div);
    div.appendChild(parrafo);
    div.appendChild(boton)
    
}

//función para crear las categorias

async function categories () {
    const res= await fetch(API_URL_CATEGORIES)
    const data= await res.json();
    
    for (tipo of data.results) {
        const ul=document.querySelector('.list-type')
        const li=document.createElement('li');
        li.setAttribute('id', 'ensayo')
        ul.appendChild(li);
        li.innerHTML=(tipo.name)
    }
}
categories();


async function getPokemonByCategorie (tipo) {
    input.value="";
    randomPokemonContainer.removeAttribute('class', 'inactive');
    contenedorPokemonSearch.setAttribute('class', 'inactive')
    const res= await fetch(API_URL_CATEGORIES+tipo)
    const data= await res.json();
    let pokemones= data.pokemon;
    
    const nombrePokemones = pokemones.map(item=>item.pokemon.name)
    article.innerHTML=("");
    for (nombre of nombrePokemones) {
        const res= await fetch (API_URL_NOMBRE+nombre);
         const data= await res.json();
         const sprites= data.sprites;
        const imagen2= sprites.front_default;
        cardPokemonSimply(imagen2,nombre)
    }
   
}



//Función que genera los pokemon random del home, además usa la función random.
async function randomPokemon() {
    
    article.innerHTML="";
    titleMainSection.innerHTML=('Conoces estos Pokémon?');
    for (let index = 0; index < 6; index++) {
        
        const res= await fetch(API_URL_RANDOM + random(1,1010));
        const data= await res.json();
        const sprites= data.sprites;
        const imagen= sprites.front_default;
        const pokemon=data.pokemon;
        const nombre=pokemon.name;
        
        cardPokemonSimply(imagen, nombre)
            
    }
    
}

//Función para realizar la busqueda del pokemon por nombre

async function busquedaPorNombre() {
    
    pokemonSearch.innerHTML="";
    randomPokemonContainer.setAttribute('class', 'inactive');
    const nombrePoke=document.getElementById('busqueda').value;
    let data=undefined;
    try {
        const res= await fetch (API_URL_NOMBRE+nombrePoke);
         data= await res.json();
    } catch (error) {
        console.log(error);
    }
    
    if (data) {
     const nombre=data.name;
     const types=data.types;
     const type=types[0].type;
     const tipo=type.name;
     const sprites= data.sprites;
     const imagen2= sprites.front_default;
     const states= data.stats;

    contenedorPokemonSearch.removeAttribute('class', 'inactive')
    randomPokemonContainer.setAttribute('class', 'inactive')
    
    const hdos= document.createElement('h2');
    hdos.innerHTML=(nombre)
    const figure=document.createElement('figure');
    const imagen=document.createElement('img');
    imagen.setAttribute('src',imagen2 )
    const parrafo=document.createElement('p');
    parrafo.innerHTML=(tipo);
  
    pokemonSearch.appendChild(hdos);
    pokemonSearch.appendChild(figure);
    figure.appendChild(imagen);
    pokemonSearch.appendChild(parrafo);

    for(estadistica of states) {
        const container=document.createElement('div');
        container.setAttribute('class','estadisticas-container')
        const nameStat=document.createElement('p');
        nameStat.innerHTML=(estadistica.stat.name);
        const valorStat=document.createElement('p');
        valorStat.innerHTML=(estadistica.base_stat);
        pokemonSearch.appendChild(container);
        container.appendChild(nameStat);
        container.appendChild(valorStat);
    }

    } else {
        contenedorPokemonSearch.setAttribute('class', 'inactive')
        alert('Pokémon no encontrado o mal escrito!!!')
    }
}


// llamado funcion randomPokemon para crear los aleatorio del inicio
randomPokemon();
// activacion boton para recargar los pokemon aleatorios
const botonAleatorio= document.getElementById('buscar-aleatorio');
botonAleatorio.addEventListener('click', randomPokemon)

//activacion boton para realizar la busqueda por nombre
search.addEventListener('click', busquedaPorNombre);

document.getElementById("busqueda").addEventListener("keyup", (e) => {
        if (e.code === 'Enter') {
            document.getElementById("search").click();
        }
    });

//activacion boton busqueda de pokemones por categoria
const liValueCategory=document.querySelector('.list-type');
liValueCategory.addEventListener('click', (e)=>{
    getPokemonByCategorie(e.target.innerHTML)
    titleMainSection.innerHTML=(e.target.innerHTML+' Type')
});

//activacion boton para conocer más de cada pokemon
// pokemonCard.addEventListener('click')






