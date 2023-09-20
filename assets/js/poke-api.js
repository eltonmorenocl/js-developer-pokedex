
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()

    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.versions["generation-v"]["black-white"].animated.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

function getPokemonDetails(pokemonNumber) {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`;

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            // Verifique se 'data.types' está definido e se possui elementos
            const type = data.types.length > 0 ? data.types[0].type.name : "Unknown";

            // Crie uma div para exibir os detalhes do Pokémon
            const pokemonDetailDiv = document.createElement('div');
            pokemonDetailDiv.setAttribute('id', 'pokemon-detail');

            // Preencha a div com informações de detalhes
            pokemonDetailDiv.innerHTML = `
                <h2>${data.name}</h2>
                <p>Number: ${data.id}</p>
                <p>Type: ${type}</p>
                <img src="${data.sprites.versions["generation-v"]["black-white"].animated.front_default}" alt="${data.name}">
            `;

            pokemonDetailDiv.classList.add(type);

            // Adicione a div de detalhes à seção de conteúdo
            const contentSection = document.querySelector('.content');
            contentSection.appendChild(pokemonDetailDiv);
        })
        .catch((error) => {
            console.error('Erro ao buscar detalhes do Pokémon:', error);
        });
}

