// ### Ejercicios Pokémon ###
// Utilizando la api de Pokemon https://pokeapi.co/ y usando sólo async/await:
// **Antes de empezar, lee la documentación de la API para comprender como funcionan los endpoints**
// Ejercicio 1.- Declara una función **getRandomPokemon** que retorne un pokemon aleatorio.

async function getRandomPokemon() {
    const totalUrl = 'https://pokeapi.co/api/v2/pokemon/';
    let totalPokemon = 1025;  
    try {
        const totalResponse = await fetch(totalUrl);
        if (!totalResponse.ok) throw new Error(`HTTP error! Status: ${totalResponse.status}`);
        
        const totalData = await totalResponse.json();
        totalPokemon = totalData.count;
    } catch (error) {
        console.error("Error al obtener el total de Pokémon:", error);
    }

    const randomId = Math.floor(Math.random() * totalPokemon) + 1;
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${randomId}`;

    try {
        const pokemonResponse = await fetch(pokemonUrl);
        if (!pokemonResponse.ok) throw new Error(`HTTP error! Status: ${pokemonResponse.status} para el ID: ${randomId}`);

        const pokemonData = await pokemonResponse.json();
        return pokemonData;
    } catch (error) {
        console.error(`Error al obtener el Pokémon con ID ${randomId}:`, error);
    }
}


// Ejercicio 2.- Declara una funcion **getImageAndName** que retorne el nombre y la URL de la imagen de un pokemon => (return {img, name})

async function getImageAndName(identifier = 25) { 
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${identifier}`;
    try {
        const response = await fetch(pokemonUrl);
        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status} para el identificador: ${identifier}`);
            return
        }
        const data = await response.json();
        const name = data.name;
        const img = data.sprites.front_default;
        return {
            img: img,
            name: name
        };
    } catch (error) {
        console.error(`Error al obtener datos para el identificador ${identifier}:`, error);
    }
}

// Ejercicio 3.- Declara una funcion **printImageAndName** que retorne el string necesario para pintar la imagen y el nombre del pokemon en el DOM de la siguiente forma:

// ```html
// <section>
//     <img src="url de imagen" alt="nombre del pokemon">
//     <h1>Nombre del pokemon</h1>
// </section>
// ```

async function printImageAndName(identifier = 1) {
    try {
        const { img, name } = await getImageAndName(identifier);
        const htmlString = `
            <section>
                <img src="${img}" alt="${name}">
                <h1>${name}</h1>
            </section>`;
        return htmlString.trim(); 
        
    } catch (error) {
        console.error("Error en printImageAndName:", error.message);
        return `<section><h1>Error: No se pudo cargar el Pokémon.</h1></section>`;
    }
}

// ### Ejercicios Batalla entre Pokemon y perritos ###
// **Recordatorio, la API de perritos era 'https://dog.ceo/dog-api/'**
// Ejercicio 4.- Declara una función **getRandomDogImage** que retorne la url de la imagen de un perro aleatorio

async function getRandomDogImage() {
    const dogUrl = 'https://dog.ceo/api/breeds/image/random';
    try {
        const response = await fetch(dogUrl);
        if (!response.ok) {
             console.error(`HTTP error! status: ${response.status} al buscar perro.`);
            return
            }
        const data = await response.json();
        const imageUrl = data.message;
        return imageUrl;
    } catch (error) {
        console.error("Error al obtener la imagen del perro:", error);
    }
}

// Ejercicio 5.- Declara una función **getRandomPokemonImage** que retorne la url de la imagen de un pokemon aleatorio.

async function getRandomPokemonImage() {
    const totalUrl = 'https://pokeapi.co/api/v2/pokemon/';
    let totalPokemon;
    try {
        const totalData = await fetch(totalUrl).then(res => res.json());
        totalPokemon = totalData.count;
    } catch (e) {
        totalPokemon = 1025; 
    }
    const randomId = Math.floor(Math.random() * totalPokemon) + 1;
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${randomId}`;
    const response = await fetch(pokemonUrl);
    if (!response.ok) {
         console.error(`Fallo al obtener el Pokémon. Código: ${response.status} para ID: ${randomId}`);
        return
        }
    const data = await response.json();
    const { 
        sprites: { front_default: imgUrl } 
    } = data;
    return imgUrl;
}

// Ejercicio 6.- Declara una función **printPugVsPikachu** que pinte la batalla entre "Pug" y "Pikachu" (no se testea)
async function printPugVsPikachu() {
    let pugUrl, pikachuData;

    try {
        pugUrl = await getBreedImage('pug'); 
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/25');
        if (!response.ok) throw new Error("Fallo al obtener Pikachu.");
        const data = await response.json();
        pikachuData = {
            name: data.name,
            img: data.sprites.front_default
        };

    } catch (error) {
        console.error("Error al obtener datos para la batalla:", error.message);
        return `<section><h1>Error al preparar la batalla: ${error.message}</h1></section>`;
    }

    const htmlString = `
        <section>
            <div >
                <h2>Pug</h2>
                <img src="${pugUrl}" alt="Pug">
            </div>
            
            <div class="vs">
                <h1>VS</h1>
            </div>
            
            <div>
                <h2>${pikachuData.name}</h2>
                <img src="${pikachuData.img}" alt="${pikachuData.name}">
            </div>
        </section>`;

    return htmlString.trim();
}


// ### Ejercicios con Rick and Morty ###
// Usando la api de Rick and Morty https://rickandmortyapi.com/ y sólo async/await:
// Ejercicio 7.- Declara una función **getRandomCharacter** que retorne un personaje aleatorio.
async function getRandomCharacter() {
    const baseUrl = 'https://rickandmortyapi.com/api/character/';
    
    try {
        const response = await fetch(baseUrl);
        const data = await response.json();
        const totalCharacters = data.info.count;
        
        const randomId = Math.floor(Math.random() * totalCharacters) + 1;
        
        const characterResponse = await fetch(`${baseUrl}${randomId}`);
        const characterData = await characterResponse.json();
        
        return characterData;
    } catch (error) {
        console.error("Error al obtener el personaje:", error);
    }
}


// Ejercicio 8.- Declara una función **getRandomCharacterInfo** que retorne de un personaje su imagen, nombre, episodios en los que aparece y el nombre del primer episodio en el que aparece + fecha de estreno, tendrás que hacer otro fetch para llegar a los ultimos datos. Formato de retorno => (return {img, name, episodes, firstEpisode, dateEpisode})

async function getRandomCharacterInfo() {
    let characterData;

    try {
        characterData = await getRandomCharacter();        
    } catch (error) {
        console.error("Error al obtener el personaje aleatorio:", error.message);
        return {}; 
    }
    const { image: img, name, episode } = characterData;
    const episodesCount = episode.length;
    const firstEpisodeUrl = episode[0];

    let firstEpisodeName = 'Desconocido';
    let dateEpisode = 'Desconocida';

    try {
        const episodeResponse = await fetch(firstEpisodeUrl);
        if (episodeResponse.ok) {
            const episodeData = await episodeResponse.json();
            firstEpisodeName = episodeData.name;
            dateEpisode = episodeData.air_date;
        } else {
            console.warn(`Error al obtener el primer episodio. Status: ${episodeResponse.status}`);
        }
    } catch (error) {
        console.error("Error al obtener el primer episodio:", error.message);
    }
    return {
        img,
        name,
        episodes: episodesCount,
        firstEpisode: firstEpisodeName,
        dateEpisode
    };
}


// Ejercicio 9.- Pinta los anteriores datos en el DOM (no se testea)

async function printCharacterInfo() {
    let info;
    try {
        info = await getRandomCharacterInfo();
    } catch (error) {
        console.error("Error al obtener los datos del personaje para pintar:", error.message);
    }
    const htmlString = `
    <article >
        <header>
            <img src="${info.img}" alt="${info.name}" class="character-image">
            <h2>${info.name}</h2>
        </header>
        <section>
            <h3>Detalles de Aparición</h3>
            <p>Total de Episodios: ${info.episodes}</p>
            <p>Primer Episodio: ${info.firstEpisode}</p>
            <p>Fecha de Estreno: ${info.dateEpisode}</p>
        </section>
    </article>`;
    return htmlString.trim();
}
