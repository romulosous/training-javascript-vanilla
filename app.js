var zipCodeField = document.querySelector("#app form input");
var button = document.querySelector("#app form button");
var content = document.querySelector("#app main");

// zipCode = zipCodeField.value;

// zipCode = zipCode.replace(" ", "");
// zipCode = zipCode.replace(".", "");
// zipCode = zipCode.trim();

zipCodeField.addEventListener("keyup", () => {
  if (zipCodeField.value.length < 8) {
    button.classList.add("disabled");
    button.setAttribute("disabled", "");
  } else {
    button.removeAttribute("disabled");
    button.classList.remove("disabled");
  }
});

button.addEventListener("click", run /*,{ once: true }*/);

function run(event) {
  event.preventDefault();
  axios
    .get(`https://viacep.com.br/ws/${zipCodeField.value}/json/`)
    .then((response) => {
      if (response.data.erro) {
        throw new Error("CEP inválido");
      }
      content.innerHTML = "";
      console.log(response.data);
      createLine(response.data.logradouro);
      createLine(response.data.localidade);
      createLine(response.data.uf);
      createLine(response.data.bairro);
    })
    .catch((error) => {
      console.log(error);
      content.innerHTML = "";
      createLine("Ops, algo deu errado!");
    });
}

function createLine(text) {
  var line = document.createElement("p");
  var text = document.createTextNode(text);
  line.appendChild(text);
  content.appendChild(line);
}
