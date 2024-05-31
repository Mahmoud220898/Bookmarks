var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var sitesList;
var add = document.getElementById("add");

if (localStorage.getItem("sitesList") == null) {
  sitesList = [];
} else {
  sitesList = JSON.parse(localStorage.getItem("sitesList"));
  display(sitesList);
}

function addsite() {
  if (validUrl() == true && validName() == true) {
    var site = {
      name: siteName.value,
      Url: siteUrl.value,
    };
    sitesList.push(site);
    display(sitesList);
    localStorage.setItem("sitesList", JSON.stringify(sitesList));
    clearForm();
  }
}

function display(site) {
  var cartona = ``;
  for (var i = 0; i < site.length; i++) {
    cartona += `<tr>
    <td>${i + 1}</td>
    <td>${site[i].newName ? site[i].newName : site[i].name}</td>
    <td>                                   
    <a href="https://${
      site[i].Url
    }"><button type="button"  id="visit" class="btn visitbtn text-white btn-sm px-3"><i class="fa-solid fa-eye px-1 "></i>Visit</button></a>
    </td>
    <td>
    <button onclick='deletesite(${i})' class="btn btn-danger btn-sm px-3 "><i class="fa-solid fa-trash-can px-1"></i>Delete</button>
    </td>
    </tr>`;
  }
  document.getElementById("tBody").innerHTML = cartona;
}

function clearForm() {
  siteName.value = "";
  siteUrl.value = "";
}

function deletesite(parameter) {
  sitesList.splice(parameter, 1);
  localStorage.setItem("sitesList", JSON.stringify(sitesList));
  display(sitesList);
}

function searchByName(term) {
  var foundedItem = [];
  for (var i = 0; i < sitesList.length; i++) {
    if (sitesList[i].name.toLowerCase().includes(term.toLowerCase()) == true) {
      sitesList[i].newName = sitesList[i].name
        .toLowerCase()
        .replace(
          term.toLowerCase(),
          `<span class="text-danger">${term}</span>`
        );
      foundedItem.push(sitesList[i]);
    }
  }
  display(foundedItem);
}

function validName() {
  var regex = /^[a-zA-Z1-9\-\.]+$/;
  if (regex.test(siteName.value) == true) {
    siteName.style.border = "none";
    console.log("Valid name");
    siteName.classList.replace("d-block", "d-none");
    Name.classList.replace("d-block", "d-none");

    return true;
  } else {
    console.log("Invalid name");
    Name.classList.replace("d-none", "d-block");
    siteName.style.border = ".3125rem solid red";
    return false;
  }
}
function validUrl() {
  var regex = /^(www\.)([a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,5})$/i;
  if (regex.test(siteUrl.value) == true) {
    siteUrl.style.border = "none";
    url.classList.replace("d-block", "d-none");

    console.log("Valid URL");
    return true;
  } else {
    console.log("Invalid URL");
    url.classList.replace("d-none", "d-block");
    siteUrl.style.border = ".3125rem solid red";
    return false;
  }
}
