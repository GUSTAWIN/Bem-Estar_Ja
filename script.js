var userList = [];
var count = 1; 


getUserList();
renderUserList();

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
    renderUserList();
}

function getUserList() {
  var storedList = JSON.parse(localStorage.getItem('userList'));
  userList = storedList || [];
}

 //Aceita uma lista opcional. Se não passar nada, usa a lista completa.
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
    
    var listaFiltrada = userList.filter(function(user) {
        return user.name.toLowerCase().includes(termo) || 
               user.email.toLowerCase().includes(termo);
    });

    renderUserList(listaFiltrada);
}

function limparPesquisa() {
    document.getElementById('pesquisa').value = '';
    renderUserList(); // Mostra tudo de novo
}

// --- EVENT LISTENERS ---

document.getElementById('form').addEventListener('submit', function (event) {
  event.preventDefault();
  var nameInput = document.getElementById('nome');
  var emailInput = document.getElementById('email');
  
  if (nameInput.value && emailInput.value) {
      addUser(nameInput.value, emailInput.value);
      nameInput.value = '';
      emailInput.value = '';
  }
});


document.getElementById('form').addEventListener('reset', function (event) {
   
});

document.getElementById('excluir_Tudo').addEventListener('click', deleteAll);

document.getElementById('btnPesquisar').addEventListener('click', realizarPesquisa);

document.getElementById('btnLimparPesquisa').addEventListener('click', limparPesquisa);

// ========================
// ACESSIBILIDADE
// ========================

// Alternar Alto Contraste
document.getElementById("btnContraste").addEventListener("click", function () {
    document.body.classList.toggle("alto-contraste");
});

// Controle de tamanho da fonte
let tamanhoFonteAtual = 16;

document.getElementById("btnAumentarFonte").addEventListener("click", function () {
    tamanhoFonteAtual += 1;
    document.documentElement.style.fontSize = tamanhoFonteAtual + "px";
});

document.getElementById("btnDiminuirFonte").addEventListener("click", function () {
    tamanhoFonteAtual -= 1;

    if (tamanhoFonteAtual < 10) tamanhoFonteAtual = 10;

    document.documentElement.style.fontSize = tamanhoFonteAtual + "px";
});
