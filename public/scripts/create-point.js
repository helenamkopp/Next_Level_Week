
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res =>  res.json() )
    .then( states => {

        for( state of states ) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }

        
    } )
}

populateUFs()


function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"  // limpando antes de inserir um novo estado - se não, soma as cidades de um estado com outro
    citySelect.disabled = true


    fetch(url)
    .then( res => res.json() )
    .then( cities => {

        for( const city of cities ) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>"`  // city.nome (para guardar o nome da cidade)

        }

        citySelect.disabled = false
    })
}

document
    .querySelector("select[name=uf")
    .addEventListener("change", getCities)


const itensToCollect = document.querySelectorAll(".items-grid li")

for (const item of itensToCollect) {
    item.addEventListener("click", handleSelectedItem) 
}

const collectedItems = document.querySelector("input[name=items")

let selectedItens = []

function handleSelectedItem(event) {
    const itemLi = event.target

    // adicionar ou remover itens com um clique
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    // console.log('ITEM ID: ', idemId)

    
    // verificar se existem itens selecionados, se sim - pegar os itens selecionados

    const alreadySelected = selectedItens.findIndex( item => {
        const itemFound = item == itemId // isso será true ou false
        return itemFound
    })


    // se ja estiver selecionado, tirar da seleção
    if( alreadySelected >= 0 ) {
        const filteredItems = selectedItens.filter( item => {
            const itemIsDifferent = item != itemId // vai retornar false
            return itemIsDifferent            
        })

        selectedItens = filteredItems
    } else {
    // se não estiver selecionado, adicionar à seleção
        selectedItens.push(itemId)
    }

    // console.log('selectedItems: ', selectedItens)

    // atualizar o campo escondido com os dados selecionados
    collectedItems.value = selectedItens
}