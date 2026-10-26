function importar() {
  fetch("/mi-page/assets/templates/tags.html") //ia
    .then((res) => res.text()) //ia
    .then((data) => {
      //ia
      document.getElementById("templates").outerHTML = data; //ia
    }); //ia
}
document.addEventListener("DOMContentLoaded", importar); //ia
