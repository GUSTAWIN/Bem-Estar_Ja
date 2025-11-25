var userList = [];
var count = 1;

function addUser(name, email) {
    var newUser = { id: count++, name: name, email: email };
    userList.push(newUser);
    localStorage.setItem('userList', JSON.stringify(userList));
    renderUserList();
}

function deleteUser(userId) {
  var updatedUserList = userList.filter(function (user) {
    return user.id !== userId; //retorna todos os elementos que nÃ£o sejam no ID selecionado
  });
  if (updatedUserList.length < userList.length) { //verifica se a lista atualizada Ã© diferente da lista original
    userList = updatedUserList;
    localStorage.setItem('userList', JSON.stringify(userList)); 
    renderUserList();
  } else {
    alert('Usuario nao encontrado.');
  }
}

function deleteAll() {
    userList = [];
    localStorage.setItem('userList', JSON.stringify(userList)); 
    renderUserList();
}

function getUserList() {
    var storedList = JSON.parse(localStorage.getItem('userList'));
    userList = storedList || [];
}

function renderUserList() {
    var userListElement = document.getElementById('userList');
    userListElement.innerHTML = ''; //limpa o conteúdo HTML do elemento patientListElement

    userList.forEach(function (user) {
        var listItem = document.createElement('li');
        //renderiza a lista de pacientes. Itera sobre cada paciente na lista encontrada e cria um <li> para cada paciente
        listItem.innerHTML = '<span class="User-name">' + user.name + '</span> (E-mail: ' + user.email + ') <button class="delete-button" onclick="deleteUser(' + user.id + ')">Excluir</button>';
        userListElement.appendChild(listItem);
    });
}

getUserList();
renderUserList();

document.getElementById('form').addEventListener('submit', function (event) {
  event.preventDefault();
  var nameInput = document.getElementById('nome');
  var emailInput = document.getElementById('email');
  addUser(nome.value, email.value);
  nameInput.value = '';
  emailInput.value = '';
});

document.getElementById('form').addEventListener('rest', function (event) {
  event.preventDefault();
  nameInput.value = '';
  emailInput.value = '';
});

const excluir_Tudo = document.querySelector('#excluir_Tudo');
excluir_Tudo.addEventListener('click', function() {
  deleteAll();
});

const barraDePesquisa = document.querySelector("#pesquisa");
barraDePesquisa.addEventListener("input", () => {
  // Converte o texto digitado para minúsculas
  const textoPesquisa = barraDePesquisa.value.toLowerCase();
  const userList1 = userList;

  // Itera sobre cada item da lista
  itens.forEach((item) => {
    // Converte o texto do item para minúsculas
    const textoItem = item.textContent.toLowerCase();

    // Verifica se o texto do item inclui o texto da pesquisa
    if (textoItem.includes(textoPesquisa)) {
      // Se incluir, exibe o item
      item.style.display = "block";
    } else {
      // Se não incluir, oculta o item
      item.style.display = "none";
    }
  });
});