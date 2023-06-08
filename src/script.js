let pokemonRepository = (function () {
    let pokemonList = []
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=20'

    let modalCloseButton = document.querySelector('.modal-close')

    if (modalCloseButton) {
        modalCloseButton.addEventListener('click', hideModal)
    }

    function showModal(pokemon) {
        let modalBody = $('.modal-body')
        let modalTitle = $('.modal-title')
        let modalHeader = $('.modal-header')
        let modalFooter = $('.modal-footer')

        modalTitle.empty()
        modalBody.empty()
        modalHeader.empty()
        modalFooter.empty()

        let titleElement = $('<h2>' + pokemon.name + '</h2')

        let imageElement = $('<img class="img" style=:width:100%>')
        imageElement.attr('src', pokemon.imageUrl)

        let contentElement = $('<p>' + pokemon.name + '<p>')

        let heightElement = $('<p>' + `Height : ${pokemon.height}</p>`)

        let weightElement = $('<p>' + `Weight : ${pokemon.weight}</p>`)

        let typeElement = $('<p>' + `Type : ${pokemon.types}</p>`)

        let abilitiesElement = $('<p>' + `abilities : ${pokemon.abilities}</p>`)

        modalTitle.append(titleElement)
        modalBody.append(contentElement)
        modalBody.append(imageElement)
        modalBody.append(heightElement)
        modalBody.append(weightElement)
        modalBody.append(abilitiesElement)
        modalBody.append(typeElement)
    }

    function hideModal() {
        exampleModal.classList.remove('is-visible')
    }

    window.addEventListener('keydown', (e) => {
        if (
            e.key === 'Escape' &&
            exampleModal.classList.contains('is-visible')
        ) {
            hideModal()
        }
    })

    exampleModal.addEventListener('click', (e) => {
        let target = e.target
        if (target === exampleModal) {
            hideModal()
        }
    })

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon)
            console.log(pokemon)
        })
    }

    function add(pokemon) {
        pokemonList.push(pokemon)
    }

    function getAll() {
        return pokemonList
    }
    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.list-group')
        let listpokemon = document.createElement('li')
        listpokemon.classList.add('.')

        let button = document.createElement('button')
        button.innerText = pokemon.name
        button.setAttribute('data-toggle', 'modal')
        button.setAttribute('data-target', '#exampleModal')

        listpokemon.appendChild(button)
        pokemonList.appendChild(listpokemon)
        button.addEventListener('click', function () {
            showDetails(pokemon)
        })
    }

    function loadList() {
        return fetch(apiUrl)
            .then(function (response) {
                return response.json()
            })
            .then(function (json) {
                json.results.forEach(function (item) {
                    let pokemon = {
                        name: item.name,
                        detailsUrl: item.url,
                    }
                    add(pokemon)
                })
            })
            .catch(function (e) {
                console.error(e)
            })
    }

    function loadDetails(item) {
        let url = item.detailsUrl
        return fetch(url)
            .then(function (response) {
                return response.json()
            })
            .then(function (details) {
                item.imageUrl = details.sprites.front_default
                item.height = details.height
                item.weight = details.weight
                item.types = details.types.map(function (pokemon) {
                    return pokemon.type.name
                })
                item.abilities = details.abilities.map(function (pokemon) {
                    return pokemon.ability.name
                })
            })
            .catch(function (e) {
                console.error(e)
            })
    }
    function filterPokemons(query) {
        return pokemonList.filter((pokemon) => {
            const pokemonLowerCase = pokemon.name.toLowerCase()
            const queryLowerCase = query.toLowerCase()
            return pokemonLowerCase.startsWith(queryLowerCase)
        })
    }

    const inputField = document.querySelector('input[type="search"]')

    function removeList() {
        const pokedex = document.querySelector('.list-group')
        pokedex.innerHTML = ''
    }

    function showErrorMessage(message) {
        const pokedex = document.querySelector('.list-group')
        pokedex.innerHTML = `<li>${message}</li>`
    }

    function addListPokemon(pokemon) {
        pokemonRepository.addListItem(pokemon)
    }

    inputField.addEventListener('input', () => {
        const query = inputField.value
        const filteredList = pokemonRepository.filterPokemons(query)
        removeList()
        if (filteredList.length === 0) {
            showErrorMessage(
                'Sorry. There are no Pokémon matching your search criteria.'
            )
        } else {
            filteredList.forEach(addListPokemon)
        }
    })

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        showModal: showModal,
        filterPokemons: filterPokemons,
    }
})()

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon, index) {
        pokemonRepository.addListItem(pokemon, index + 1)
    })
})
