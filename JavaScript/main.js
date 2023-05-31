const adicionarTarefa = document.getElementById('btnAddTarefa');
adicionarTarefa.addEventListener('click', criarTarefa);

const btnAlterar = document.getElementsByClassName('btn_Alterar');
for(let i = 0; i < btnAlterar.length; i++){
    btnAlterar[i].addEventListener('click', ()=>{
        alterarTarefa(listaTarefa.children[i]);
    });
}

function criarTarefa(){
    const novaTarefaInput = document.getElementById('novaTarefaInput');
    const listaTarefa = document.getElementById('listaTarefa');
    const novaTarefaTexto = novaTarefaInput.value.trim();

    if(novaTarefaTexto === ''){
        alert('Digite algo para ser adicionado a lista de tarefas.');
        return;
    };

    const novaTarefaItem = document.createElement('li');
    novaTarefaItem.classList.add('lista_Itens')
    novaTarefaItem.innerHTML = `${novaTarefaTexto} <button class="btn_Excluir" id="btnDeletarTarefa"> Excluir </button> <button class="btn_Alterar" id="btnAlterarTarefa"> Alterar </button>`;
    listaTarefa.appendChild(novaTarefaItem);

    limparInput();

    const btnDeletar = novaTarefaItem.querySelector('.btn_Excluir');
    btnDeletar.addEventListener('click', () => {
        deletarTarefa(novaTarefaItem);
    });

    const btnAlterar = novaTarefaItem.querySelector('.btn_Alterar');
    btnAlterar.addEventListener('click', () =>{
        alterarTarefa(novaTarefaItem);
    })
};

function limparInput(){
    const novaTarefaInput = document.getElementById('novaTarefaInput');
    novaTarefaInput.value = '';
};

function deletarTarefa(li){
    const textoLi = li.textContent;
    const listaTarefa = document.getElementById('listaTarefa');
    const itensTarefa = listaTarefa.getElementsByTagName('li');

    for (let i = 0; i < itensTarefa.length; i++){
        if (itensTarefa[i].textContent === textoLi){
            listaTarefa.removeChild(itensTarefa[i]);
            break;
        };
    };
};

function alterarTarefa(li){
    const textoLi = li.firstChild.textContent;
    const novoTextoInput = document.createElement('input');
    novoTextoInput.value = textoLi;
    novoTextoInput.classList.add('input_Novo');
    li.replaceChild(novoTextoInput, li.firstChild);

    const btnConfirmar = document.createElement('button');
    btnConfirmar.innerHTML = 'Confirmar';
    btnConfirmar.classList.add('btn_Confirmar')
    li.appendChild(btnConfirmar);

    const btnAlterarNovo = document.createElement('button');
    btnAlterarNovo.innerHTML = 'Alterar';
    btnAlterarNovo.classList.add('btn_Alterar');
    li.replaceChild(btnAlterarNovo, li.querySelector('.btn_Alterar'));

    btnConfirmar.addEventListener('click', () => {
        const novoTexto = novoTextoInput.value.trim();
        if(novoTexto != ''){
            li.removeChild(novoTextoInput);
            li.removeChild(btnConfirmar);
            li.innerHTML = `${novoTexto} <button class="btn_Excluir" id="btnDeletarTarefa">Excluir</button> <button class="btn_Alterar" id="btnAlterarTarefa">Alterar</button>`;
            
            const btnDeletar = li.querySelector('.btn_Excluir');
            btnDeletar.addEventListener('click', () =>{
                deletarTarefa(li);
            });
            const btnAlterar = li.querySelector('.btn_Alterar');
            btnAlterar.addEventListener('click', () => {
                alterarTarefa(li);
            });
        }else{
            alert('Digite algo para ser adicionado a lista de tarefas.');
        };
    });
};