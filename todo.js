"use strict";
const itemsArray = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [];
console.log(itemsArray);

document.querySelector("#enter").addEventListener("click", () => {
  const item = document.querySelector("#item");
  createItem(item);
  item.value = "";
});

function displayItems() {
  let items = "";
  for (let i = 0; i < itemsArray.length; i++) {
    items += ` <div class="item">
        <div class="input-controller">
          <textarea disabled>${itemsArray[i]}</textarea>
          <div class="edit-controller">
            <i class="fa-solid fa-check checkBtn"></i>
            <i class="fa-solid fa-pen-to-square editBtn"></i>
            <i class="fa-solid fa-xmark deleteBtn"></i>
          </div>
        </div>
        <div class="update-controller">
          <button class="saveBtn">Save</button>
          <button class="cancelBtn">Cancel</button>
        </div>
      </div>`;
  }
  document.querySelector(".to-do-list").innerHTML = items;
  activateDeleteListeners();
  activateEditListeners();
  activateSaveListeners();
  activateCancelListeners();
  activateCheckListeners();
}

function activateCheckListeners() {
  const checkBtn = document.querySelectorAll(".checkBtn");
  checkBtn.forEach((cb, i) => {
    cb.addEventListener("click", moveItemToCompleted);
    //   cb.addEventListener("click", () => {
    //   moveItemToCompleted(i);
    // });
  });
}

/*function moveItemToCompleted(i) {
  const completedList = document.querySelector(".completed-list");
  const itemToMove = document.querySelector(".item")[i];
  completedList.appendChild(itemToMove);
  itemsArray[i].completed = true;
  localStorage.setItem("items", JSON.stringify(itemsArray));
}*/

function moveItemToCompleted(evt) {
  console.log("hej", evt.target.parentElement.parentElement.parentElement);
  //console.log("hej", evt.currentTarget);
  const itemToMove = evt.target.parentElement.parentElement.parentElement;

  const completedList = document.querySelector(".completed-list");
  //const toDoList = document.querySelector(".to-do-list");
  completedList.appendChild(itemToMove);
  localStorage.setItem("item", JSON.stringify(itemsArray));
}

//localStorage.setItem("items", JSON.stringify(itemsArray));

/*if (i >= 0 && i < itemsArray.length) {
    const itemToMove = toDoList.querySelector(".item");
    if (itemToMove) {
      toDoList.removeChild(itemToMove); // Fjern fra den aktuelle liste
      completedList.appendChild(itemToMove); // Tilføj til den færdiggjorte liste
      itemsArray[i].completed = true;
      localStorage.setItem("items", JSON.stringify(itemsArray));
      updateLocalStorage();
    }
  }
}*/

function activateDeleteListeners() {
  let deleteBtn = document.querySelectorAll(".deleteBtn");
  deleteBtn.forEach((db, i) => {
    db.addEventListener("click", () => {
      deleteItem(i);
      console.log("jeg har lavet klik");
    });
  });
}

function deleteItem(i) {
  itemsArray.splice(i, 1);
  localStorage.setItem("items", JSON.stringify(itemsArray));
  location.reload();
}

function activateEditListeners() {
  const editBtn = document.querySelectorAll(".editBtn");
  const updateController = document.querySelectorAll(".update-controller");
  const inputs = document.querySelectorAll(".input-controller textarea");
  editBtn.forEach((eb, i) => {
    eb.addEventListener("click", () => {
      updateController[i].style.display = "block";
      inputs[i].disabled = false;
    });
  });
}

function activateSaveListeners() {
  const saveBtn = document.querySelectorAll(".saveBtn");
  const inputs = document.querySelectorAll(".input-controller textarea");
  saveBtn.forEach((sb, i) => {
    sb.addEventListener("click", () => {
      updateItems(inputs[i].value, i);
    });
  });
}

function updateItems(text, i) {
  itemsArray[i] = text;
  localStorage.setItem("items", JSON.stringify(itemsArray));
  location.reload();
}

function activateCancelListeners() {
  const cancelBtn = document.querySelectorAll(".cancelBtn");
  const updateController = document.querySelectorAll(".update-controller");
  const inputs = document.querySelectorAll(".input-controller textarea");
  cancelBtn.forEach((cb, i) => {
    cb.addEventListener("click", () => {
      updateController[i].style.display = "none";
      inputs[i].disabled = true;
    });
  });
}

function createItem(item) {
  itemsArray.push(item.value);
  localStorage.setItem("items", JSON.stringify(itemsArray));
  location.reload();
}

function displayDate() {
  let date = new Date();
  date = date.toString().split(" ");
  console.log(date);
  document.querySelector("#date").innerHTML = date[1] + " " + date[2] + " " + date[3];
}

window.onload = function () {
  displayDate();
  displayItems();
};
