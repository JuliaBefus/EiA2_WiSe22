var zufallsgedicht;
(function (zufallsgedicht) {
    /*
    Aufgabe: 01 Zufallsgedicht
    Name: Julia Befus
    Matrikel: 271025
    Datum: 12.10.2022
    Quellen: Aanya Khetarpal, Pia Giovannelli, Paula Jordans, Havva Kilic
    */
    let subjekte = ["Harry", "Hermine", "Ron", "Hagrid", "Snape", "Dumbledore"];
    let prädikate = ["braut", "liebt", "studiert", "hasst", "zaubert", "zerstört"];
    let objekte = ["Zaubertränke", "den Grimm", "Lupin", "Hogwarts", "die Karte des Rumtreibers", "Dementoren"];
    console.log(subjekte);
    console.log(prädikate);
    console.log(objekte);
    for (let kamel = 6; kamel >= 1; kamel--) {
        let letzterSatz = getVerse(subjekte, prädikate, objekte); //hier ist die Reihenfolge wichtig.
        console.log(letzterSatz);
    }
    function getVerse(_subjekte, _prädikate, _objekte) {
        let zufallSubjekte = Math.floor(Math.random());
        let zufallPrädikate = Math.floor(Math.random());
        let zufallObjekte = Math.floor(Math.random());
        let verse = _subjekte[zufallSubjekte] + " " + _prädikate[zufallPrädikate] + " " + _objekte[zufallObjekte] + ".";
        _subjekte.splice(zufallSubjekte, 1);
        _prädikate.splice(zufallPrädikate, 1);
        _objekte.splice(zufallObjekte, 1);
        return verse;
    }
})(zufallsgedicht || (zufallsgedicht = {}));
//# sourceMappingURL=Zufallsgedicht.js.map