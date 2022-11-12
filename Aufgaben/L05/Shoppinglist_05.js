/*
Aufgabe: 05 Shoppinglist
Name: Julia Befus
Matrikel: 271025
Datum: 12.11.2022
Quellen: Aanya Khetarpal, Pia Giovannelli, Paula Jordans, Havva Kilic und Bastian Aberle
*/
var shoppinglistA05;
(function (shoppinglistA05) {
    window.addEventListener("load", handleLoad);
    //Aufruf loadData
    //Liste lädt
    async function handleLoad() {
        let button = document.querySelector("button[type=button]");
        let response = await fetch("data.json");
        let entry = await response.text();
        let data = JSON.parse(entry);
        button.addEventListener("click", handleButton);
        clearInputs();
        loadData(data);
    }
    //Button_Handler (Managment)
    function handleButton() {
        loadInput();
        sendData();
    }
    //Austausch client
    async function sendData() {
        let formData = new FormData(document.forms[0]);
        let query = new URLSearchParams(formData);
        await fetch("L05.html?" + query.toString());
        alert("Data sent");
    }
    function loadData(data) {
        for (let index = 0; index < data.length; index++) {
            let item = data[index].item;
            let amount = data[index].amount;
            let date = data[index].date;
            let comment = data[index].comment;
            let purchase = data[index].purchase;
            loadItem(item, amount, date, comment, purchase);
        }
    }
    function loadInput() {
        let formData = new FormData(document.forms[0]);
        let item = formData.get("Item").toString();
        let amount = Number(formData.get("Amount"));
        let date = new Date().toLocaleDateString();
        let comment = formData.get("Area").toString();
        let purchaseCheckbox = formData.get("Checkbox");
        let purchase = "";
        if (purchaseCheckbox == null) {
            purchase = "";
        }
        else {
            purchase = " buy";
        }
        clearInputs();
        loadItem(item, amount, date, comment, purchase);
    }
    function loadItem(item, amount, date, comment, purchase) {
        let newDiv = document.createElement("div");
        newDiv.id = "createDiv";
        let parent = document.querySelector("#output");
        newDiv.className = "genoutput";
        newDiv.innerHTML = date + " " + amount + " " + item + " " + comment + " " + purchase;
        parent.appendChild(newDiv);
        let newContainer = document.createElement("div");
        newContainer.id = "containerIcons";
        newDiv.appendChild(newContainer);
        let newCheckbox = document.createElement("input");
        newCheckbox.type = "checkbox";
        newContainer.appendChild(newCheckbox);
        let newEdit = document.createElement("div");
        newEdit.innerHTML = "<img id='edit' src='./pen-solid.svg'>";
        newContainer.appendChild(newEdit);
        let newTrash = document.createElement("div");
        newTrash.innerHTML = "<img id='trash' src='./trash-solid.svg'>";
        newCheckbox.id = "trash";
        newContainer.appendChild(newTrash);
        newEdit.addEventListener("click", function () {
            editItem(newDiv, item, amount, comment);
        });
        newTrash.addEventListener("click", function () {
            deleteItem(newDiv);
        });
    }
    function deleteItem(newDiv) {
        newDiv.parentElement.removeChild(newDiv);
    }
    function editItem(newDiv, item, amount, comment) {
        let itemx = document.querySelector("input#inputx");
        itemx.value = item;
        let amountx = document.querySelector("input#amountx");
        amountx.value = amount.toString();
        let commentx = document.querySelector("input#commentx");
        commentx.value = comment;
        deleteItem(newDiv);
    }
    function clearInputs() {
        let itemx = document.querySelector("input#inputx");
        itemx.value = "";
        let amountx = document.querySelector("input#amountx");
        amountx.value = "";
        let commentx = document.querySelector("input#commentx");
        commentx.value = "";
    }
})(shoppinglistA05 || (shoppinglistA05 = {}));
//# sourceMappingURL=Shoppinglist_05.js.map