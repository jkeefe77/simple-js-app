let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150'


  let modalCloseButton = document.querySelector(".modal-close")

  if (modalCloseButton) {
    modalCloseButton.addEventListener("click", hideModal);
  }

  function showModal(pokemon) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    let modalHeader = $(".modal-header");



    modalTitle.empty();
    modalBody.empty();
    modalHeader.empty();




    let titleElement = $("<h2>" + pokemon.name + "</h2")
    let imageElement = $('<img class="img" style=:width:100%>');
    imageElement.attr("src", pokemon.imageUrl);
    let contentElement = $("<p>" + pokemon.name + "<p>");



    modalTitle.append(titleElement);
    modalBody.append(contentElement);
    modalBody.append(imageElement);

}


  function hideModal() {
    exampleModal.classList.remove("is-visible");
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && exampleModal.classList.contains("is-visible")) {
      hideModal();
    }
  });

  exampleModal.addEventListener("click", (e) => {
    let target = e.target;
    if (target === exampleModal) {
      hideModal();

    }
  });

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
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
    let pokemonList = document.querySelector(".list-group");
    let listpokemon = document.createElement("li");
    listpokemon.classList.add("button-class");

    let button = document.createElement("button");
    button.innerText = (pokemon.name);
    // button.classList.add("button-class");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#exampleModal");


    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
  };


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








