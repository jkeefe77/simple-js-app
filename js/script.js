let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150'
  let modalContainer = document.querySelector("#modal-container");
  
  let modalCloseButton = document.querySelector("button.modal-close")
  
  if (modalCloseButton) {
    modalCloseButton.addEventListener("click", hideModal);
  }
  
  function showModal (pokemon) {
    let modalContainer = document.querySelector ("#modal-container");
    
    
    let modalContent = document.querySelector(".modal-pokemon-content");
    modalContent.innerHTML = "";
    
    let titleElement = document.createElement ("h2");
   titleElement.innerText = pokemon.name;
  
   let pokemonTypes = "";


   let contentElement = document.createElement("p");
   pokemon.types.forEach(function (typeData) {
    pokemonTypes = pokemonTypes + typeData.type.name + ", " 
   })
   contentElement.innerText = pokemonTypes;
  
   let imageElement = document.createElement("img")
    
    imageElement.setAttribute("src", pokemon.imageUrl);
    imageElement.setAttribute("width", "200");
    imageElement.setAttribute("height", "150");
  
    modalContent.appendChild(titleElement);
    modalContent.appendChild(contentElement);
    modalContent.appendChild(imageElement);

    
    modalContainer.classList.add("is-visible");
    
  }
  
  
  function hideModal () {
   modalContainer.classList.remove ("is-visible");
  }
  
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });
  
  modalContainer.addEventListener ("click", (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal ();
      
    }
  });

  function showDetails(pokemon) {
   loadDetails(pokemon).then(function() {
    showModal(pokemon);
   
      });
    }
  
  function add(pokemon) {
   pokemonList.push(pokemon);
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
    button.addEventListener("click", function() {
      
      showDetails(pokemon);
    });
  }
  

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

    return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal,
  }
})();


pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});








