var Feuerwerk;
(function (Feuerwerk) {
    class Particle {
        //diese Klasse enthält folgende Eigenschaften:
        alive; //ein boolescher Wert, der angibt, ob das Partikel aktiv ist oder nicht.
        lifetime = 20; //eine numerische Eigenschaft, die angibt, wie lange das Partikel existieren wird.
        position; //ein Vektor, der die x- und y-Position des Partikels auf dem Canvas speichert.
        velocity; //ein Vektor, der die Bewegungsrichtung und -geschwindigkeit des Partikels speichert.
        crc2; //crc2 stellt also einen Zugriffspunkt auf diese Zeichenfläche dar, mit dessen Hilfe man darauf zeichnen kann.
        color; //es speichtert die Farbe des Partikels
        // Quasi das gewicht, bestimmt wie stark die Partikel nach unten gezogen werden. Sollte immer negativ sein.
        downForce; //eine numerische Eigenschaft, die das "Gewicht" des Partikels bestimmt und bestimmt, wie stark es nach unten gezogen wird.
        size; //eine numerische Eigenschaft, die die Größe des Partikels bestimmt.
        //um das gesamte Interface von meinem Feuerwerk zu bauen, benötige ich den Konstruktor (Methode)
        // config: in userem Konstrukor konfiguriere ich einmal das Feuerwerk selber, was ich von der Interfaceklasse hole. (beschreibt Farbe, Größe und Breite des Partikels) 
        // position: Ein Vector-Objekt, das die Startposition des Partikels auf dem Canvas beschreibt
        // startVelocity: Ein Vector-Objekt, das die Anfangsgeschwindigkeit des Partikels beschreibt.
        constructor(config, position, startVelocity) {
            this.position = position;
            this.velocity = startVelocity;
            this.color = config.color;
            this.size = config.size;
            this.alive = true;
            // Falls die Farbe schwarz ist, wird die Farbe zufällig gewählt
            if (this.color == "#000000") { //Die Bedingung prüft, ob die color-Eigenschaft des aktuellen Objekts den Wert "#000000" hat. Wenn dies der Fall ist, wird der Code innerhalb des if-Blockes ausgeführt.
                this.color = "#" + Math.floor(Math.random() * 8000000 + 8000000).toString(16);
                // 1. Math.random() generiert eine Zufallszahl zwischen 0 und 1
                // 2. Math.random() * 8000000 berechnet eine Zufallszahl zwischen 0 und 8000000
                // 3. Math.floor(Math.random() * 8000000 + 8000000) rundet die berechnete Zufallszahl auf die nächste ganze Zahl ab und addiert 8000000, so dass die Ergebniszahl zwischen 8000000 und 16000000 liegt
                // 4. .toString(16) wandelt die ganze Zahl in einen Hexadezimalwert um, der wie folgt aussieht: "0x....", wobei die Punkte eine Folge von Hexadezimalziffern sind.
                // 5. "#" + ... fügt ein "#"-Zeichen vor dem Hexadezimalwert hinzu, um einen gültigen Farbcode zu erhalten.
                // 6. this.color = "#" + ... weist die color-Eigenschaft des aktuellen Objekts diesem Farbcode zu
            }
            // speichert den canvas zur einfacheren benutzung
            let canvas = document.querySelector("canvas"); // hier wird das HTML-Canvas-Element über die Methode "querySelector" gesucht und in eine Variable gespeichert
            this.crc2 = canvas.getContext("2d"); //Mit der Methode "getContext" wird dann aus dem Canvas ein 2D-Renderingkontext abgeleitet, der für die Darstellung der Partikel verwendet wird.
        }
        //Folgendes zu den Methoden (Funktioen): je nachdem welche Methode abgerufen wird, wird diese ausgeführt
        //Methode(Funktion): 
        update() {
            this.position.add(this.velocity); //Jedes Mal, wenn die Methode aufgerufen wird, wird die Position des Partikels verändert, indem seine aktuelle Position mit seiner Geschwindigkeit addiert wird
            this.lifetime -= 1; //Geschwindigkeit wird hier durch liftime value (Wert) bestimmt //Die Lebensdauer des Partikels wird um 1 verringert.
            if (this.lifetime <= 0)
                this.alive = false; // Wenn die Lebensdauer 0 oder weniger erreicht hat, wird das Partikel als "tot" markiert und kann gelöscht werden.
        }
        //Methode(Funktion): 
        draw() {
            if (!this.alive)
                return; //In dieser Zeile wird überprüft, ob die Eigenschaft "this.alive" auf "false" gesetzt ist. Wenn das der Fall ist, wird die Methode sofort mit "return" beendet, ohne weitere Aktionen auszuführen
            // malt einen Kreis (ein einzelner kreis )
            this.crc2.beginPath();
            this.crc2.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI, false); //Diese Zeile zeichnet einen Kreis auf dem Zeichenbereich, basierend auf den aktuellen x- und y-Positionen des Partikels (angegeben durch "this.position.x" und "this.position.y"), seiner Größe (angegeben durch "this.size") und einer Kreisform (angegeben durch den Bereich von 0 bis 2 * Math.PI)
            this.crc2.fillStyle = "#fffff"; //Diese Zeile legt die Füllfarbe für den gezeichneten Kreis fest (in diesem Fall weiß, angegeben durch "#fffff")
            this.crc2.fill(); //Diese Zeile füllt den gezeichneten Kreis mit der zuvor festgelegten Füllfarbe.
            this.crc2.lineWidth = 1; //Diese Zeile legt die Dicke der Linie für den Rand des Kreises fest (in diesem Fall 1 Pixel).
            this.crc2.strokeStyle = this.color; //Diese Zeile legt die Farbe für den Rand des Kreises fest (angegeben durch "this.color").
            this.crc2.stroke(); //Diese Zeile zeichnet den Rand des Kreises mit der zuvor festgelegten Linienbreite und -farbe.
        } //Dies schließt die Methode "draw".
    }
    Feuerwerk.Particle = Particle;
})(Feuerwerk || (Feuerwerk = {}));
//# sourceMappingURL=Particle.js.map