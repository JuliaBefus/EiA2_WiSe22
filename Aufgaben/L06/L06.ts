/*
Aufgabe: 06 Shoppinglist
Name: Julia Befus
Matrikel: 271025
Datum: 19.11.2022
Quellen: Aanya Khetarpal, Pia Giovannelli, Paula Jordans, Havva Kilic und Bastian Aberle
*/

namespace L06_shoppinglist {

    window.addEventListener("load", handleload);

    export interface Input {
        Product: string;
        Amount: number;
        Comment: string;
        date: string;
        Checkboxdate: boolean;
    }

    interface Item {
        [category: string]: Input[];
    }

    interface FormDataJSON {
        [key: string]: FormDataEntryValue | FormDataEntryValue[];
    }


    async function handleload(): Promise<void> {
        document.querySelector("#add").addEventListener("click", handleaddbutton);

        let response: Response = await fetch("https://webuser.hs-furtwangen.de/~befusjul/Database/?command=find&collection=shoppinglist");
        let report: string = await response.text();
        let inputs: Item = JSON.parse(report);

        loaddata(inputs);

    }

    // Click BUtton Funktion
    function handleaddbutton(): void {
        submitbutton();
        addList();

    }

    
    async function submitbutton(): Promise<void> {
        let formData: FormData = new FormData(document.forms[0]);
        let json: FormDataJSON = {};

        for (let key of formData.keys())
            if (!json[key]) {
                let values: FormDataEntryValue[] = formData.getAll(key);
                json[key] = values.length > 1 ? values : values[0];
            }

        let query: URLSearchParams = new URLSearchParams();
        query.set("command", "insert");
        query.set("collection", "data");
        query.set("data", JSON.stringify(json));
        console.log("data sent");

        let response: Response = await fetch("https://webuser.hs-furtwangen.de/~befusjul/Database/?" + query.toString());
        console.log(response);
        alert("sent");


    }

    //Data aus data.ts
    function loaddata(inputs: Item): void {

        console.log("load data");
        let newlist: any[] = [];

        for (let index in inputs.data) {
            newlist.push(index);
            console.log(index + "index");
        }


        for (let counter of newlist) {
            
            console.log(inputs.data[counter].Product);

            let amount: number = inputs.data[counter].Amount;
            let product: string = inputs.data[counter].Product;
            let comment: string = inputs.data[counter].Comment;

            //Box für "buy next time"
            let element: HTMLInputElement = <HTMLInputElement>document.getElementById("checkboxdate");
            let nextpurchase: string;
            if (element.checked) {
                nextpurchase = " buy";
            } else {
                nextpurchase = " ";
            }

            let dateoftoday: Date = new Date();

            let nextelement: HTMLDivElement = document.createElement("div");
            nextelement.classList.add("inputData");

            nextelement.innerHTML = dateoftoday.toLocaleDateString() + "  " + product + "  " + amount + "  " + comment + "  " + nextpurchase;
            var getelement: HTMLElement = document.querySelector("#alloutputs");
            getelement.appendChild(nextelement);

            //Checkbox hinzugefügt 
            let listcheck: HTMLInputElement = document.createElement("input");
            listcheck.type = "checkbox";
            listcheck.name = "Checkbox1";
            listcheck.className = "checkbox1";
            nextelement.appendChild(listcheck);

            //Trash hinzugefügt 
            let listtrash: HTMLDivElement = document.createElement("div");
            listtrash.innerHTML = "<i id='trash' class='fa-solid fa-trash-can'></i>";
            nextelement.appendChild(listtrash);

            //Edit Icon hinzugefügt
            let listedit: HTMLDivElement = document.createElement("div");
            listedit.className = "edit";
            listedit.innerHTML = "<i id ='edit' class='fa-regular fa-pen-to-square'></i>";
            nextelement.appendChild(listedit);

            listtrash.addEventListener("click", function (): void {
                deletelistelement(nextelement, counter);
            });

            listedit.addEventListener("click", function (): void {
                editlistelement(nextelement, product, amount, comment, counter);
            });

            listcheck.addEventListener("click", function (): void {
                daterefresh(nextelement, product, amount, comment, nextpurchase, counter);
            });
        }
    }

   // Funktion fürs einfügen neuer Einträge in die Liste
    function addList(): void {

        //console.log("add inputs");

        let data: FormData = new FormData(document.forms[0]);
        let product: string = data.get("Product")?.toString()!;
        let amount: number = Number(data.get("Amount")!);
        let comment: string = data.get("Comment")?.toString();

        let dateoftoday: Date = new Date();

        //Box für "buy next time"
        let element: HTMLInputElement = <HTMLInputElement>document.getElementById("checkboxdate");
        let nextpurchase: string;
        if (element.checked) {
            nextpurchase = " buy";
        } else {
            nextpurchase = " ";
        }

        //Einzelne Inputs
        let nextelement: HTMLDivElement = document.createElement("div");
        nextelement.classList.add("inputData");
        nextelement.innerHTML = dateoftoday.toLocaleDateString() + "   " + product + "   " + amount + "   " + comment + "  " + nextpurchase;
        var getelement: HTMLElement = document.querySelector("#alloutputs");
        getelement.appendChild(nextelement);

        //Checkbox hinzugefügt 
        let listcheck: HTMLInputElement = document.createElement("input");
        listcheck.type = "checkbox";
        listcheck.name = "Checkbox1";
        listcheck.className = "checkbox1";
        //listcheck.checked = "checked";
        nextelement.appendChild(listcheck);

        //Trash hinzugefügt 
        let listtrash: HTMLDivElement = document.createElement("div");
        listtrash.innerHTML = "<i id='trash' class='fa-solid fa-trash-can'></i>";
        nextelement.appendChild(listtrash);

        // Edit Icon hinzugefügt
        let listedit: HTMLDivElement = document.createElement("div");
        listedit.className = "edit";
        listedit.innerHTML = "<i id ='edit' class='fa-regular fa-pen-to-square'></i>";
        nextelement.appendChild(listedit);

        listtrash.addEventListener("click", function (): void {
            deletelistelement(nextelement, counter);
        });

        listedit.addEventListener("click", function (): void {
            editlistelement(nextelement, product, amount, comment, counter);
        });

        listcheck.addEventListener("click", function (): void {
            daterefresh(nextelement, product, amount, comment, nextpurchase, counter); //keine Ahnung wieso rot -> funktioniert trotzdem 
        });

        //Inputs werden ausgeleert
        let inputproductname: HTMLInputElement = document.getElementById("inputproduct") as HTMLInputElement;
        inputproductname.value = "";
        let inputamount: HTMLInputElement = document.getElementById("amount") as HTMLInputElement;
        inputamount.value = "";
        let inputcomment: HTMLTextAreaElement = document.getElementById("inputcomment") as HTMLTextAreaElement;
        inputcomment.value = "";

        setTimeout(function (): void {
            location.reload();
        }, 2000);
    }

    async function daterefresh(nextelement: HTMLDivElement, product: string, amount: number, comment: string, nextpurchase: string, counter: number): Promise<void> {
        console.log("date");
        let dateoftodaynew: Date = new Date();
        nextelement.innerHTML = dateoftodaynew.toLocaleDateString() + "  " + product + "  " + amount + "  " + comment + " / " + nextpurchase;

        // Checkbox hinzugefügt
        let listcheck: HTMLInputElement = document.createElement("input");
        listcheck.type = "checkbox";
        listcheck.name = "Checkbox1";
        listcheck.className = "checkbox1";
        nextelement.appendChild(listcheck);

        //Trash hinzugefügt 
        let listtrash: HTMLDivElement = document.createElement("div");
        listtrash.innerHTML = "<i id='trash' class='fa-solid fa-trash-can'></i>";
        nextelement.appendChild(listtrash);

        //Edit Icon hinzugefügt 
        let listedit: HTMLDivElement = document.createElement("div");
        listedit.className = "edit";
        listedit.innerHTML = "<i id ='edit' class='fa-regular fa-pen-to-square'></i>";
        nextelement.appendChild(listedit);

        listtrash.addEventListener("click", function (): void {
            deletelistelement(nextelement, counter);
        });

        listedit.addEventListener("click", function (): void {
            editlistelement(nextelement, product, amount, comment, counter);
        });

        listcheck.addEventListener("click", function (): void {
            daterefresh(nextelement, product, amount, comment, nextpurchase, counter);
        });

        let newdate: string = dateoftodaynew.toLocaleDateString();
        let json: FormDataJSON = {newdate};
        let query: URLSearchParams = new URLSearchParams();
        query.set("command", "update");
        query.set("collection", "data");
        query.set("data", JSON.stringify(json));

        let response: Response = await fetch("https://webuser.hs-furtwangen.de/~befusjul/Database/?" + query.toString()); //DBS empfängt 
        console.log("date refreshed");
    }

   // Löschen von dem Eintrag
    async function deletelistelement(nextelement: HTMLDivElement, counter: number): Promise<void> {

        nextelement.parentElement.removeChild(nextelement);
        let query: URLSearchParams = new URLSearchParams();

        query.set("command", "delete");
        query.set("collection", "data");
        query.set("id", counter.toString());

        let response: Response = await fetch("https://webuser.hs-furtwangen.de/~befusjul/Database/?" + query.toString()); // DBS empfängt
        console.log("delete");

    }

   //Funktion für das Editieren des  Eintrags
    function editlistelement(nextelement: HTMLDivElement, product: string, amount: number, comment: string, counter: number): void {
        console.log("edit list element");
        let input1: HTMLInputElement = document.querySelector("input#inputproduct");
        input1.value = product;
        let input2: HTMLInputElement = document.querySelector("input#amount");
        input2.value = amount.toString();
        let input3: HTMLInputElement = document.querySelector("input#inputcomment");
        input3.value = comment;

        deletelistelement(nextelement, counter);
    }

}
