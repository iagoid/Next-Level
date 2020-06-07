function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]") 

    //acessa os sites dos estados
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() ) //função anonima retornando valor
    .then( states => {

        //pega um estados dos states e atribui a variavel state
        for(const state of states){
            //atribui aos options o value como id e o texto como o nome do estado
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }

    })
}
populateUFs()

function getCities(event){
    const citySelect = document.querySelector("[name=city]") 
    const stateInput = document.querySelector("[name=state]") 

    //pega o valor da UF
    const ufValue = event.target.value

    //pegar o option selecionado e dar o value  como nome do Estado
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    //limpa o campo das cidades
    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() ) //função anonima retornando valor
    .then( cities  => {
        
        //pega um estados dos states e atribui a variavel state
        for(const city of cities){
            //atribui aos options o value como id e o texto como o nome do estado
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        
        //Desbloqueia o botão
        citySelect.disabled = false
    })
}

//pega o seletor com name uf
document
    .querySelector("select[name=uf]")
    //chama a função quando ocorre uma mudança
    .addEventListener("change", getCities)


//Itens de Coleta
//pegar todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li")

//pega a mudança ocasionada pelo click e chama a função
for (const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}


const colectedItems = document.querySelector("input[name=items")

let selectedItems = []

function handleSelectedItem(event){
    const itemLi = event.target
    //adicionar ou remover uma classe com JavaScript
    itemLi.classList.toggle("selected")



    //pega os numeros do data-id 
    const itemId = itemLi.dataset.id
    console.log("ITEM ID: ", itemId)

    //verificar se existem items selecionado
    //pegar items selecionados
    //cria 
    const alreadySelected = selectedItems.findIndex( item =>{
        //verificando e encontrando se o item clicado é igual à um item já na lista
        //retornando True or False
        const itemFound = item == itemId 
        return itemFound
    })
    //se já estiver selecionado tirar da seleção
    if( alreadySelected >= 0 ){
        //tirar da seleção
        //cria um novo array filtrado no momento queo return for false
        const filteredItems = selectedItems.filter( item =>  {
            itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else{
        //se não estiver selecionado selecionar a seleção
        selectedItems.push(itemId)
    }
    console.log("selectedItems: ",selectedItems)


    colectedItems.value = selectedItems

}