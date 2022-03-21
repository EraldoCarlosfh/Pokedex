const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`;

const generatePokemonsPromises = () => Array(150).fill().map((_, index) =>
    fetch(getPokemonUrl(index + 1)).then(response => response.json()));

const generateHTML = pokemons => pokemons.reduce((accumulator, {
    name,
    id,
    types, 
    abilities,
    weight,
    height,
    order,
    base_experience
}) => {

    const ElementeTypes = types.map(typeInfo => typeInfo.type.name);
    const AbilitiesTypes = abilities.map(typeInfo => typeInfo.ability.name);

    //     if (id == 1) {
    //         accumulator += `
    //         <div class="cartoes-pokemon">
    //     <div class="cartao-pokemon aberto ${ElementeTypes[0]}" id="cartao-${name}">
    //     <div class="cartao-topo">
    //     <div class="detalhes">
    //         <h2 class="nome">${name}</h2>
    //         <span>#${id}</span>
    //     </div>
    //         <span class="tipo">${ElementeTypes.join(' | ')}</span>

    //     <div class="cartao-imagem">
    //         <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg" alt="Imagem do ${name}">
    //     </div>
    // </div>
    //                 <div class="cartao-informacoes">
    //                     <div class="status">
    //                         <h3>Status</h3>
    //                         <ul>
    //                             <li>HP: 300</li>
    //                             <li>Ataque: 600</li>
    //                             <li>Defesa: 500</li>
    //                             <li>Velocidade: 300</li>
    //                             <li>Total: 1.700</li>
    //                         </ul>
    //                     </div>

    //                     <div class="habilidades">
    //                         <h3>Habilidades</h3>
    //                         <ul>
    //                             <li>Choque do trovão</li>
    //                             <li>Cabeçada</li>
    //                         </ul>

    //                     </div>
    //                 </div>
    //             </div>   
    //             </div>

    //             <nav class="listagem">

    //                 <ul>
    //                     <li class="pokemon ativo" id="${id}">
    //                       <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg" alt="Cabeça do ${name}">
    //                       <span>${name}</span>
    //                     </li>
    //                 </ul>
    //             </nav>
    //   `;
    //     }

    accumulator += `
    <div class="cartoes-pokemon">
    <div class="cartao-pokemon aberto ${ElementeTypes[0]}" id="cartao-${name}">
    <div class="cartao-topo">
    <div class="detalhes">
        <h2 class="nome">${name}</h2>
        <span>#${id}</span>
    </div>
        <span class="tipo">${ElementeTypes.join(' | ')}</span>

    <div class="cartao-imagem">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg" alt="Imagem do ${name}">
    </div>
</div>
                <div class="cartao-informacoes">
                    <div class="status">
                        <h3>Status</h3>
                        <ul>
                            <li>Força: ${base_experience}</li>
                            <li>Peso: ${weight}</li>
                            <li>Altura: ${height}</li> 
                        </ul>
                    </div>

                    <div class="habilidades">
                        <h3>Habilidades</h3>
                        <ul>
                            <li>${AbilitiesTypes[0]}</li>
                            <li>${AbilitiesTypes[1]}</li>                       
                        </ul>

                    </div>
                </div>
            </div>   
            </div>

            
  `;


    return accumulator;
}, '')

const insertPokemonsIntoPage = pokemons => {
    const ul = document.querySelector('[data-js="pokemonsPokedex"]');
    ul.innerHTML = pokemons;
}

const pokemonPromises = generatePokemonsPromises();

// const pokemonPromises = [];
// for (let i = 1; i <= 150; i++) {
//     pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json()));        
// }

Promise.all(pokemonPromises)
    .then(generateHTML)
    .then(insertPokemonsIntoPage);