let pokemonRepository = (function () {
  //shows list of Pokemon and their physical descriptors and abilities
  let pokemonList = [
    {
      name: "Bulbasaur",
      height: "2'04",
      weight: "15.2 lbs",
      type: ["grass", "poison"],
    },
    {
      name: "Charmander",
      height: "2'",
      weight: "18.7 lbs",
      type: "fire",
    },
    {
      name: "Snorlax",
      height: "6'11",
      weight: "1014.1 lbs",
      type: "sleeping",
    },
  ]
  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "height" in pokemon &&
      "type" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }
  function getAll() {
    return pokemonList;
  }
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
  }
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };

})();

console.log(pokemonRepository.getAll());

pokemonRepository.add({ name: "Bulbasaur", height: 2.4, types: ["grass", "poison"] });

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function (pokemon) {

  pokemonRepository.addListItem(pokemon);
});

let button = document.querySelector(".button-class");
button.addEventListener("mouseover", func, false);
button.addEventListener("mouseout", func1, false);



function eventListener(button, pokemon) {
  button.addEventListener("click", function () {
    showDetails(pokemon);
  });
}
  
function showDetails(pokemon){
    console.log(pokemon)
}





