const pokemon_name = document.querySelector('.pokemon_name');
const pokemon_num = document.querySelector('.pokemon_num');
const pokemon_img = document.querySelector('.pokemon_img');
const form = document.querySelector('.form');
const input = document.querySelector('.formpoke');
const buttonvoltar = document.querySelector('.btn-voltar');
const buttonprox = document.querySelector('.btn-prox');

let pokemonsearch = 1;
const fetchPokemon = async(pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status == 200) {
        const data = await APIResponse.json();
    return data;  
    }
}
const getPokemon = async (pokemon) => {
    pokemon_name.innerHTML = 'carregando...';
    pokemon_num.innerHTML = '';
    const data = await fetchPokemon(pokemon);
    if (data) {
        pokemon_img.style.display = 'block';
        pokemon_name.innerHTML = data.name;
        pokemon_num.innerHTML = data.id;    
        pokemon_img.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        pokemonsearch = data.id;
        input.value = ''
    }else {
        pokemon_name.innerHTML = 'Não encontrado;-;';
        pokemon_num.innerHTML = '';
        pokemon_img.style.display = 'none';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    getPokemon(input.value.toLowerCase()); 
});
buttonprox.addEventListener('click', () => {
    pokemonsearch += 1
    getPokemon(pokemonsearch);
});
buttonvoltar.addEventListener('click', () => {
    if (pokemonsearch > 1) {
    pokemonsearch -= 1
    getPokemon(pokemonsearch);
    }
});

getPokemon(pokemonsearch);