namespace zufallsgedicht {

    /*
    Aufgabe: 01 Zufallsgedicht
    Name: Julia Befus
    Matrikel: 271025
    Datum: 12.10.2022
    Quellen: Aanya Khetarpal, Pia Giovannelli, Paula Jordans
    */

    let subjekte: string[] = ["Harry", "Hermine", "Ron", "Hagrid", "Snape", "Dumbledore"];
    let prädikate: string[] = ["braut", "liebt", "studiert", "hasst", "zaubert", "zerstört"];
    let objekte: string[] = ["Zaubertränke", "den Grimm", "Lupin", "Hogwarts", "die Karte des Rumtreibers", "Dementoren"];

    console.log(subjekte);
    console.log (prädikate);
    console.log (objekte);

    for (let kamel: number = 6; kamel >= 1; kamel--) {
        let letzterSatz: string = getVerse(subjekte, prädikate, objekte);
        console.log(letzterSatz);
    }

    function getVerse(_subjekte: string[], _prädikate: string[], _objekte: string[]): string {
        let zufallSubjekte: number = Math.floor(Math.random() * _subjekte.length);
        let zufallPrädikate: number = Math.floor(Math.random() * _subjekte.length);
        let zufallObjekte: number = Math.floor(Math.random() * _subjekte.length);

        let verse: string = _subjekte[zufallSubjekte] + " " + _prädikate[zufallPrädikate] + " " + _objekte[zufallObjekte] + ".";

        _subjekte.splice(zufallSubjekte, 1);
        _prädikate.splice(zufallPrädikate, 1);
        _objekte.splice(zufallObjekte, 1);

        return verse;
    }
}

