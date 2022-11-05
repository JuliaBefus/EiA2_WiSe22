    /*
    Aufgabe: 04 Shoppinglist
    Name: Julia Befus
    Matrikel: 271025
    Datum: 05.11.2022
    Quellen: Aanya Khetarpal, Pia Giovannelli, Paula Jordans, Havva Kilic und Bastian Aberle
    */


namespace shoppinglistA04 {


    export interface Input {
        savedItem: string;
        savedAmount: number;
        savedComment: string;
        savedDate: string;
        savedPurchase: boolean;
    }



    export let savedInputs: Input[] = [

        {
            savedItem: "noodles",
            savedAmount: 4,
            savedComment: "packages",
            savedDate: "03.11.2022",
            savedPurchase: false

        }
    ];

    export let savedItem: string = "";

}