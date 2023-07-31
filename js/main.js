const form = document.getElementById("novoItem"); //pegando id do formulário
//inserindo o elemento dentroa da id lista da ul
const lista = document.getElementById("lista"); //pegando o id da ul

//cirando um array para gravar no storage
//pegando os itens com getItem e passando para objetos porque estava em string la embaixo foi convertido usando JSON.stringify(itens) e ou  [] vazio se não tiver itens pega array []
const itens = JSON.parse(localStorage.getItem("itens")) || [];

// utilizando forEach para verificar os elementos do array
itens.forEach((elemento) => {
  //criando os elementos ao carregar a página
  criaElemento(elemento); //mostra todos os itens do array
});

//comportamento do submit envia informações para outra página
//Foi utilizado evento. preventDefault() para não fazer esse comportamento
//E sim enviar as informações para a mesma página

form.addEventListener("submit", (evento) => {
  evento.preventDefault(); //evitar comportamento do submit
  //testando se funcionou
  //console.log("Funcionou");
  //console.log(evento);//para verificar tudo que esta rodando no javascript informação que preciso
  // input nome e input quantidade são os elementos que preciso
  // console.log(evento); //mostrando tudo no javascript
  //console.log(evento.target.elements["nome"].value); //pegando elementos com nome do input e seu valor que esta dentro formulário
  //console.log(evento.target.elements["quantidade"].value); //pegando elementos com nome do input e seu valor que esta dentro formulário

  const nome = evento.target.elements["nome"];
  const quantidade = evento.target.elements["quantidade"];

    //busrcar elemento se já é criado para atualizar os dados
    const existe = itens.find((elemento) => elemento.nome === nome.value);


  //se criar um objeto tem que converter o objeto para string  com JSON.stringfyiphone xs
  const itemAtual = {
    // criando object
    nome: nome.value,
    quantidade: quantidade.value,
  };
  //verifica se existe atraves do id se existir ele apenas atualiza as informações
  if (existe) {
    itemAtual.id = existe.id;
    atualizaElemento(itemAtual);
    //Refatoração da condicional if else, atualizando um id para cada item
    itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual;
  } else {
    //se não eoncontrar cria um novo elemento
    // percorre para ultimo da lista e inccrementa mais 1 
    // condição ternário
    
    itemAtual.id = itens[itens.length -1] ? (itens[itens.length - 1]).id +1 : 0;
    //passando os elementos nome e quantidade por parâmetro da função criaElemento
    criaElemento(itemAtual);

    itens.push(itemAtual); //utilizando push para gravar no array
  }


  //convertendo objeto itemAtual para String utilizando JSON.stringfy
  localStorage.setItem("itens", JSON.stringify(itens));

  //limpar o input depois que vc digitar e adicionar
  nome.value = "";
  quantidade.value = "";
});

//criando elementos para nossa página da ul class lista
function criaElemento(item) {
  //parametros
  //console.log(nome, quantidade);
  //<li class="item"><strong>7</strong>Camisas</li> exemplo

  //criando um li na página - dentro da ul class lista
  const novoItem = document.createElement("li");
  novoItem.classList.add("item"); //criando class na li

  //criando strong com valor
  const numeroItem = document.createElement("strong");
  numeroItem.innerHTML = item.quantidade; //recebendo a quantidade dentro do elemento
  numeroItem.dataset.id = item.id;
  novoItem.appendChild(numeroItem); //colocando o elemento strong dentro da li
  novoItem.innerHTML += item.nome; // colocando o nome do item dentro da li

  //criando botao delete
  novoItem.appendChild(botaoDeleta(item.id));

  lista.appendChild(novoItem); // inserindo a id lista recebendo novoItem que é o elemento todos que foi criando

  // console.log(novoItem); //mostrando elemento li todo
  //armazenando no navegador apenas strings
}


//atualizar os elementos
function atualizaElemento(item){
  document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

//criando uma função para deletar
function botaoDeleta(id) {
  const elementoBotao = document.createElement("button");
  
  //criando uma classe para o botao para editar no css
  elementoBotao.classList.add("btDelete")
  elementoBotao.innerText = "X";

  elementoBotao.addEventListener("click", function (){
    deletaElemento(this.parentNode, id);

  });

  return elementoBotao;
}

function deletaElemento(tag, id){
  tag.remove();
  // buscando elemento que esta no array itens foi clicado para remover
  itens.splice(itens.findIndex(elemento => elemento.id === id), 1);
    //convertendo objeto itemAtual para String utilizando JSON.stringfy
    localStorage.setItem("itens", JSON.stringify(itens));
}