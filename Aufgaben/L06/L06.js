/*
Aufgabe: 06 Shoppinglist
Name: Julia Befus
Matrikel: 271025
Datum: 19.11.2022
Quellen: Aanya Khetarpal, Pia Giovannelli, Paula Jordans, Havva Kilic und Bastian Aberle
*/
var L06_shoppinglist;
(function (L06_shoppinglist) {
    window.addEventListener("load", handleload);
    async function handleload() {
        document.querySelector("#add").addEventListener("click", handleaddbutton);
        let response = await fetch("https://webuser.hs-furtwangen.de/~befusjul/Database/?command=find&collection=shoppinglist");
        let report = await response.text();
        let inputs = JSON.parse(report);
        loaddata(inputs);
    }
    // Click BUtton Funktion
    function handleaddbutton() {
        submitbutton();
        addList();
    }
    async function submitbutton() {
        let formData = new FormData(document.forms[0]);
        let json = {};
        for (let key of formData.keys())
            if (!json[key]) {
                let values = formData.getAll(key);
                json[key] = values.length > 1 ? values : values[0];
            }
        let query = new URLSearchParams();
        query.set("command", "insert");
        query.set("collection", "data");
        query.set("data", JSON.stringify(json));
        console.log("data sent");
        let response = await fetch("https://webuser.hs-furtwangen.de/~befusjul/Database/?" + query.toString());
        console.log(response);
        alert("sent");
    }
    //Data aus data.ts
    function loaddata(inputs) {
        console.log("load data");
        let newlist = [];
        for (let index in inputs.data) {
            newlist.push(index);
            console.log(index + "index");
        }
        for (let counter of newlist) {
            console.log(inputs.data[counter].Product);
            let amount = inputs.data[counter].Amount;
            let product = inputs.data[counter].Product;
            let comment = inputs.data[counter].Comment;
            //Box für "buy next time"
            let element = document.getElementById("checkboxdate");
            let nextpurchase;
            if (element.checked) {
                nextpurchase = " buy";
            }
            else {
                nextpurchase = " ";
            }
            let dateoftoday = new Date();
            let nextelement = document.createElement("div");
            nextelement.classList.add("inputData");
            nextelement.innerHTML = dateoftoday.toLocaleDateString() + "  " + product + "  " + amount + "  " + comment + "  " + nextpurchase;
            var getelement = document.querySelector("#alloutputs");
            getelement.appendChild(nextelement);
            //Checkbox hinzugefügt 
            let listcheck = document.createElement("input");
            listcheck.type = "checkbox";
            listcheck.name = "Checkbox1";
            listcheck.className = "checkbox1";
            nextelement.appendChild(listcheck);
            //Trash hinzugefügt 
            let listtrash = document.createElement("div");
            listtrash.innerHTML = "<i id='trash' class='fa-solid fa-trash-can'></i>";
            nextelement.appendChild(listtrash);
            //Edit Icon hinzugefügt
            let listedit = document.createElement("div");
            listedit.className = "edit";
            listedit.innerHTML = "<i id ='edit' class='fa-regular fa-pen-to-square'></i>";
            nextelement.appendChild(listedit);
            listtrash.addEventListener("click", function () {
                deletelistelement(nextelement, counter);
            });
            listedit.addEventListener("click", function () {
                editlistelement(nextelement, product, amount, comment, counter);
            });
            listcheck.addEventListener("click", function () {
                daterefresh(nextelement, product, amount, comment, nextpurchase, counter);
            });
        }
    }
    // Funktion fürs einfügen neuer Einträge in die Liste
    function addList() {
        //console.log("add inputs");
        let data = new FormData(document.forms[0]);
        let product = data.get("Product")?.toString();
        let amount = Number(data.get("Amount"));
        let comment = data.get("Comment")?.toString();
        let dateoftoday = new Date();
        //Box für "buy next time"
        let element = document.getElementById("checkboxdate");
        let nextpurchase;
        if (element.checked) {
            nextpurchase = " buy";
        }
        else {
            nextpurchase = " ";
        }
        //Einzelne Inputs
        let nextelement = document.createElement("div");
        nextelement.classList.add("inputData");
        nextelement.innerHTML = dateoftoday.toLocaleDateString() + "   " + product + "   " + amount + "   " + comment + "  " + nextpurchase;
        var getelement = document.querySelector("#alloutputs");
        getelement.appendChild(nextelement);
        //Checkbox hinzugefügt 
        let listcheck = document.createElement("input");
        listcheck.type = "checkbox";
        listcheck.name = "Checkbox1";
        listcheck.className = "checkbox1";
        //listcheck.checked = "checked";
        nextelement.appendChild(listcheck);
        //Trash hinzugefügt 
        let listtrash = document.createElement("div");
        listtrash.innerHTML = "<i id='trash' class='fa-solid fa-trash-can'></i>";
        nextelement.appendChild(listtrash);
        // Edit Icon hinzugefügt
        let listedit = document.createElement("div");
        listedit.className = "edit";
        listedit.innerHTML = "<i id ='edit' class='fa-regular fa-pen-to-square'></i>";
        nextelement.appendChild(listedit);
        listtrash.addEventListener("click", function () {
            deletelistelement(nextelement, counter);
        });
        listedit.addEventListener("click", function () {
            editlistelement(nextelement, product, amount, comment, counter);
        });
        listcheck.addEventListener("click", function () {
            daterefresh(nextelement, product, amount, comment, nextpurchase, counter); //keine Ahnung wieso rot -> funktioniert trotzdem 
        });
        //Inputs werden ausgeleert
        let inputproductname = document.getElementById("inputproduct");
        inputproductname.value = "";
        let inputamount = document.getElementById("amount");
        inputamount.value = "";
        let inputcomment = document.getElementById("inputcomment");
        inputcomment.value = "";
        setTimeout(function () {
            location.reload();
        }, 2000);
    }
    async function daterefresh(nextelement, product, amount, comment, nextpurchase, counter) {
        console.log("date");
        let dateoftodaynew = new Date();
        nextelement.innerHTML = dateoftodaynew.toLocaleDateString() + "  " + product + "  " + amount + "  " + comment + " / " + nextpurchase;
        // Checkbox hinzugefügt
        let listcheck = document.createElement("input");
        listcheck.type = "checkbox";
        listcheck.name = "Checkbox1";
        listcheck.className = "checkbox1";
        nextelement.appendChild(listcheck);
        //Trash hinzugefügt 
        let listtrash = document.createElement("div");
        listtrash.innerHTML = "<i id='trash' class='fa-solid fa-trash-can'></i>";
        nextelement.appendChild(listtrash);
        //Edit Icon hinzugefügt 
        let listedit = document.createElement("div");
        listedit.className = "edit";
        listedit.innerHTML = "<i id ='edit' class='fa-regular fa-pen-to-square'></i>";
        nextelement.appendChild(listedit);
        listtrash.addEventListener("click", function () {
            deletelistelement(nextelement, counter);
        });
        listedit.addEventListener("click", function () {
            editlistelement(nextelement, product, amount, comment, counter);
        });
        listcheck.addEventListener("click", function () {
            daterefresh(nextelement, product, amount, comment, nextpurchase, counter);
        });
        let newdate = dateoftodaynew.toLocaleDateString();
        let json = { newdate };
        let query = new URLSearchParams();
        query.set("command", "update");
        query.set("collection", "data");
        query.set("data", JSON.stringify(json));
        let response = await fetch("https://webuser.hs-furtwangen.de/~befusjul/Database/?" + query.toString()); //DBS empfängt 
        console.log("date refreshed");
    }
    // Löschen von dem Eintrag
    async function deletelistelement(nextelement, counter) {
        nextelement.parentElement.removeChild(nextelement);
        let query = new URLSearchParams();
        query.set("command", "delete");
        query.set("collection", "data");
        query.set("id", counter.toString());
        let response = await fetch("https://webuser.hs-furtwangen.de/~befusjul/Database/?" + query.toString()); // DBS empfängt
        console.log("delete");
    }
    //Funktion für das Editieren des  Eintrags
    function editlistelement(nextelement, product, amount, comment, counter) {
        console.log("edit list element");
        let input1 = document.querySelector("input#inputproduct");
        input1.value = product;
        let input2 = document.querySelector("input#amount");
        input2.value = amount.toString();
        let input3 = document.querySelector("input#inputcomment");
        input3.value = comment;
        deletelistelement(nextelement, counter);
    }
})(L06_shoppinglist || (L06_shoppinglist = {}));
//# sourceMappingURL=L06.js.map