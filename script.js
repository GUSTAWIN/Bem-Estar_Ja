var userList = [];
var count = 1;

getUserList();
// Só tenta renderizar a lista se o elemento existir na página
if (document.getElementById('userList')) {
    renderUserList();
}

function addUser(name, email) {
    var newUser = { id: Date.now(), name: name, email: email };
    userList.push(newUser);
    saveAndRender();
}

function deleteUser(userId) {
    var updatedUserList = userList.filter(function (user) {
        return user.id !== userId;
    });

    if (updatedUserList.length < userList.length) {
        userList = updatedUserList;
        saveAndRender();
    } else {
        alert('Usuario nao encontrado.');
    }
}

function deleteAll() {
    if (confirm("Tem certeza que deseja excluir todos os registros?")) {
        userList = [];
        saveAndRender();
    }
}

// Função auxiliar para salvar e renderizar
function saveAndRender() {
    localStorage.setItem('userList', JSON.stringify(userList));
    // Só renderiza se estiver na página de admin
    if (document.getElementById('userList')) {
        renderUserList();
    }
}

function getUserList() {
    var storedList = JSON.parse(localStorage.getItem('userList'));
    userList = storedList || [];
}

function renderUserList(listaParaExibir) {
    var userListElement = document.getElementById('userList');

    // Proteção caso o HTML não tenha carregado a UL
    if (!userListElement) return;

    userListElement.innerHTML = '';

    // Define qual lista usar: a filtrada ou a completa
    var lista = listaParaExibir || userList;

    lista.forEach(function (user) {
        var listItem = document.createElement('li');

        listItem.style.borderBottom = "1px solid #ccc";
        listItem.style.padding = "10px";

        listItem.innerHTML =
            '<strong>' + user.name + '</strong> <br>' +
            '(E-mail: ' + user.email + ') ' +
            '<button class="delete-button" onclick="deleteUser(' + user.id + ')" style="margin-left:10px; color:red;">Excluir</button>';

        userListElement.appendChild(listItem);
    });
}

// --- FUNÇÕES DE PESQUISA ---

function realizarPesquisa() {
    var termo = document.getElementById('pesquisa').value.toLowerCase();

    var listaFiltrada = userList.filter(function (user) {
        return user.name.toLowerCase().includes(termo) ||
            user.email.toLowerCase().includes(termo);
    });

    renderUserList(listaFiltrada);
}

function limparPesquisa() {
    var inputPesquisa = document.getElementById('pesquisa');
    if (inputPesquisa) {
        inputPesquisa.value = '';
        renderUserList(); 
    }
}

// --- EVENT LISTENERS (COM PROTEÇÃO) ---

// Verifica se o formulário existe antes de adicionar o evento (evita erro no index/login)
var formElement = document.getElementById('form');
if (formElement) {
    formElement.addEventListener('submit', function (event) {
        // Se estivermos na página de Admin (que tem lista de usuários), prevenimos o envio e salvamos no LocalStorage
        // Se for Login ou Cadastro, talvez você queira outro comportamento. 
        // Pelo seu código original, ele sempre salvava no LocalStorage.
        
        // Verificamos se é o formulário de Admin olhando se existe o campo de pesquisa na página, 
        // ou você pode adicionar classes específicas nos forms.
        // Vou manter a lógica original: salva se tiver nome e email.
        
        var nameInput = document.getElementById('nome');
        var emailInput = document.getElementById('email');

        if (nameInput && emailInput && nameInput.value && emailInput.value) {
             // Apenas impede o reload se for para salvar no LocalStorage (Admin behavior)
            event.preventDefault();
            addUser(nameInput.value, emailInput.value);
            nameInput.value = '';
            emailInput.value = '';
            alert('Cadastrado com sucesso!');
        }
    });
}

var btnExcluirTudo = document.getElementById('excluir_Tudo');
if (btnExcluirTudo) {
    btnExcluirTudo.addEventListener('click', deleteAll);
}

var btnPesquisar = document.getElementById('btnPesquisar');
if (btnPesquisar) {
    btnPesquisar.addEventListener('click', realizarPesquisa);
}

var btnLimparPesquisa = document.getElementById('btnLimparPesquisa');
if (btnLimparPesquisa) {
    btnLimparPesquisa.addEventListener('click', limparPesquisa);
}

// ========================
// ACESSIBILIDADE (AGORA VAI RODAR EM TODAS)
// ========================

var btnContraste = document.getElementById("btnContraste");
if (btnContraste) {
    btnContraste.addEventListener("click", function () {
        document.body.classList.toggle("alto-contraste");
    });
}

// Controle de tamanho da fonte
let tamanhoFonteAtual = 16;

var btnAumentar = document.getElementById("btnAumentarFonte");
if (btnAumentar) {
    btnAumentar.addEventListener("click", function () {
        tamanhoFonteAtual += 1;
        document.documentElement.style.fontSize = tamanhoFonteAtual + "px";
    });
}

var btnDiminuir = document.getElementById("btnDiminuirFonte");
if (btnDiminuir) {
    btnDiminuir.addEventListener("click", function () {
        tamanhoFonteAtual -= 1;
        if (tamanhoFonteAtual < 10) tamanhoFonteAtual = 10;
        document.documentElement.style.fontSize = tamanhoFonteAtual + "px";
    });
}