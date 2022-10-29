    /*
    Aufgabe: 03 Shoppinglist
    Name: Julia Befus
    Matrikel: 271025
    Datum: 27.10.2022
    Quellen: Aanya Khetarpal, Pia Giovannelli, Paula Jordans, Havva Kilic
    */

    window.addEventListener("load", handleLoad);

    function handleLoad(): void {
    
        document.querySelector("#trash").addEventListener("click", trash);
        document.querySelector("#check").addEventListener("click", check);
        document.querySelector("#newitem").addEventListener("click", item);
    }
    
    //Funktion für das Löschen eines Items (durch Mülleimer)
    function trash(): void {
        console.log("Item wird gelöscht von der Liste");
    }
    
    //Funktion für das abhacken eines Items (durch Checkbox)
    function check(): void {
        console.log("Item wird abgehackt/wurde gekauft");
    }
    
    //Funktion für das hinzufügen eines Items (durch Plus)
    function item(): void {
        console.log("Neues Item wird hinzugefügt");
    }
    