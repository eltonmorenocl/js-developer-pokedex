const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const returnButton = document.getElementById('returnButton');
const pokemonDetail = document.querySelector('#pokemonDetail');
const pokemons = document.querySelectorAll('.pokemons');


const maxRecords = 151
const limit = 9
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

// Adicione um ouvinte de evento para cada elemento .pokemon
pokemons.forEach((pokemon) => {
    pokemon.addEventListener('mouseenter', () => {
        // Quando o mouse entra no Pokémon, altere o estilo do cursor
        pokemon.style.cursor = 'pointer'; // Altere para o estilo de cursor desejado
    });

    // Remova o estilo do cursor quando o mouse sai do Pokémon (evento mouseleave)
    pokemon.addEventListener('mouseleave', () => {
        pokemon.style.cursor = 'auto'; // Volte ao estilo de cursor padrão
    });
});

returnButton.addEventListener('click', () => {
    // Chame uma função para restaurar todas as <li> que foram removidas
    restoreAllPokemonItems();
    // Remova a <div class="pokemon-detail"> quando o botão "Return" for clicado
    const pokemonDetail = document.querySelector('#pokemon-detail');
    if (pokemonDetail) {
        pokemonDetail.remove();
    }
    
    // Exiba novamente o botão "Load More"
    loadMoreButton.style.display = 'block';
    // Oculte o botão "Return" novamente após clicar em "Return"
    returnButton.style.display = 'none';
});

pokemonList.addEventListener('click', (event) => {
    const clickedPokemon = event.target.closest('.pokemon');
    if (clickedPokemon) {
        // Remova todos os elementos <li> da lista
        const pokemonList = document.getElementById('pokemonList');
        while (pokemonList.firstChild) {
            pokemonList.removeChild(pokemonList.firstChild);
        }
        // Oculte o botão "Load More"
        loadMoreButton.style.display = 'none';

        // Exiba o botão "Return" após clicar em um Pokémon
        returnButton.style.display = 'block';

        // Obtenha o número do Pokémon clicado
        const pokemonNumber = clickedPokemon.querySelector('.number').textContent;

        // Chame a API para obter os detalhes do Pokémon clicado
        getPokemonDetails(pokemonNumber);
    }
});

function restoreAllPokemonItems() {
    // Aqui você deve adicionar novamente todas as <li> que foram removidas
    // Usei a mesma lógica que você usou para carregar os Pokémon inicialmente
    loadPokemonItens(offset, limit);
}

// Selecione todos os elementos com a classe .pokemon


