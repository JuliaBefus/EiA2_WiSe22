/*
 Aufgabe: Abschlussarbeit: Feuerwerk!
 Name: Julia Befus
 Matrikel: 271025
 Datum: 29.01.2023
 Quellen: 
*/

namespace Feuerwerk {

    //das window ist unser Browserfenster, 
    // ein handleload ist ein Argument das ein Ergeinis beim laden aufrufen kann
    // window.addEventListener("load", handleload) überprüft ob meine Seite vollständig geladen ist 
    // ein EventListener ist eine Funktion, die ausgeführt wird, wenn ein bestimmtes Ereignis ausgelöst wird. In unserem Ereignis wird das Ereignis "load" aufgerufen.
    // also jedes Mal wenn ich "load" aufrufe, wird die gesamte Datei (index.html z.b) geladen anhad der load-Funktion
    // damit das Feuerwerk überhaupt darauf achtet, dass die Seite geladen wird (window) deshalb wird das geschrieben:  window.addEventListener("load", handleload);
    window.addEventListener("load", handleload);

    // hier wird dem Computer gesagt, was canvas, etc. ist. 
    // das hier ist die Grundeinstellung (let canvas bis let rect). Die ist dafür da, dass das Fenster (canvas) überhaut funktioniert 
    let canvas: HTMLCanvasElement;
    let crc2: CanvasRenderingContext2D;
    let fireworks: Firework[] = []; //leeres Array, weil es mit den Partikeln gefüllt wird 
    let rect: DOMRect; //let rect ist ja ein Variablenname und das DOMRect ist eine eingebudende Funktionalität die height, width und x und y koordinaten ließt. 

    // vom Benutzer einstellbaren Variablen
    // das alles finden wir auch in der Index-HTML vor mit den Slidern usww.
    // Default-Einstellungen: d.h jedes Mal wenn ich die Seite neu lade, werden dann die unteren "Standardeinstellungen" wieder neu geladen. 
    let name: string = "Mein Feuerwerk";

    let color: string = "#ff0000";
    let red: number = 255;
    let green: number = 0;
    let blue: number = 0;

    let numberOfParticles: number = 50;
    let speed: number = 5;
    let size: number = 1;
    let width: number = 10;


    // Alle Inputs für die obigen Variablen
    // damit unser TS mit den obigen Variablen arbeiten kann, zieht unser input aus der HTML-Seite mit getElementById die einzelnen Variablen hinaus als HTMLInputElement
    // getElementById holt sich z.b. meinen namen aus meinem document (d.h. aus meiner HTML-Datei) raus unmd setzt den neu fest. D.h: wir haben hier einen neuen nameInput:
    // D.h: hier setze ich meine neuen Variablen sozusagen fest!!!
    let nameInput: HTMLInputElement = document.getElementById("name") as HTMLInputElement;

    let redInput: HTMLInputElement = document.getElementById("red") as HTMLInputElement;
    let greenInput: HTMLInputElement = document.getElementById("green") as HTMLInputElement;
    let blueInput: HTMLInputElement = document.getElementById("blue") as HTMLInputElement;

    let numberOfParticlesInput: HTMLInputElement = document.getElementById("numberOfParticles") as HTMLInputElement;
    let speedInput: HTMLInputElement = document.getElementById("speed") as HTMLInputElement;

    let sizeInput: HTMLInputElement = document.getElementById("size") as HTMLInputElement;
    let widthInput: HTMLInputElement = document.getElementById("width") as HTMLInputElement;




    // Gibt den obigen inputs die richtigen Event listener
    // damit unsere Speicherung erfolgen kann, benötigen wir den EventListener "change", um Veränderungen zu erkennen 

    nameInput.addEventListener("change", changeName);

    redInput.addEventListener("change", changeRed);
    greenInput.addEventListener("change", changeGreen);
    blueInput.addEventListener("change", changeBlue);

    numberOfParticlesInput.addEventListener("change", changeNumberOfParticles);
    speedInput.addEventListener("change", changeSpeed);
    sizeInput.addEventListener("change", changeSize);
    widthInput.addEventListener("change", changeWidth);




    // Alle Funktionen für die obigen Event Listener,
    // und hier werden unsere erkannten Veränderungen umbenannt und abespeichert. Dafür machen wird die Funktion
    // hier haben wir eine Funktion changeName und die setzt den Namen fest mit dem neuen Namen von dem obigen Input. 
    function changeName(): void {
        name = nameInput.value;
    }

    // wir haben hier drei Werte rot, grün und blau. Um diese Werte zu ermitteln, gibt es da unten diesen #-Wert:
    // mit dieser Funktion können wir am slider die 3 Farben mischen, um am Ende eine einzige vermischte Farbe zu haben 
    // Es wandelt die RGB-Werte (rot, grün, blau) in den Hexadezimalwert um und speichert diesen in der Variablen "color". Dann wird die neue Farbe dem Hintergrund des HTML-Elements zugewiesen.
    function updateColor(): void {
        let redColor: string = red.toString(16);
        if (redColor.length < 2) redColor = "0" + redColor;

        let greenColor: string = green.toString(16);
        if (greenColor.length < 2) greenColor = "0" + greenColor;

        let blueColor: string = blue.toString(16);
        if (blueColor.length < 2) blueColor = "0" + blueColor;

        color = "#" + redColor + greenColor + blueColor; // hier holen wir uns die rote, die grüne und die blaue Farbe raus und deklarieren es als #-Wert. diesen #-Wert gibt es, um die Color jedesmal anzupassen. 
        document.getElementById("color").style.backgroundColor = color; //d.h. wir haben ja oben die default-Eisntellung -> let color: string = "#ff0000" festgelegt von unserem Feuerwerk und hier setzen wir die einzelne color neu fest, indem wir style.backgroundColor auf = color setzen.
    }
    function changeRed(): void { //hier ändert sich der Wert //Diese Funktion ändert den Wert für die rote Farbe. 
        red = parseInt(redInput.value); //parsen // hier wird die neue Farbe geholt //hier wird der rgb-wert zum hex-wert //Der neue Wert wird aus einem HTML-Eingabefeld mit der ID "redInput" gelesen und in einen Integer-Wert umgewandelt
        updateColor(); // und updated (aktualisiert) die Farbe //Dann wird die updateColor()-Funktion aufgerufen, um die Farbe zu aktualisieren.
    }
    function changeGreen(): void { //hier ändert sich der Wert //Diese Funktion ändert den Wert für die grüne Farbe
        green = parseInt(greenInput.value); //Der neue Wert wird aus einem HTML-Eingabefeld mit der ID "greenInput" gelesen und in einen Integer-Wert umgewandelt
        updateColor(); // Dann wird die updateColor()-Funktion aufgerufen, um die Farbe zu aktualisieren.
    }
    function changeBlue(): void { //hier ändert sich der Wert //Diese Funktion ändert den Wert für die blaue Farbe
        blue = parseInt(blueInput.value);
        updateColor();
    }
    function changeNumberOfParticles(): void { //Diese Funktion ändert den Wert für die Anzahl der Partikel. 
        numberOfParticles = parseInt(numberOfParticlesInput.value);
    }
    function changeSpeed(): void { //Diese Funktion ändert den Wert für die Geschwindigkeit
        speed = parseInt(speedInput.value);
    }
    function changeSize(): void { //Diese Funktion ändert den Wert für die Größe
        size = parseInt(sizeInput.value);
    }
    function changeWidth(): void { //Diese Funktion ändert den Wert für die Ausbreitung
        width = parseInt(widthInput.value);
    }


    // Wird ausgeführt wenn die Seite geladen ist
    function handleload(): void { // Die Funktion handleload wird aufgerufen, wenn die Seite geladen ist.
        canvas = document.querySelector("canvas"); //In dieser Funktion wird ein Canvas-Element ausgewählt mit document.querySelector("canvas") und in der Variablen canvas gespeichert
        rect = canvas.getBoundingClientRect(); //Die Variable rect wird mit dem Ergebnis von canvas.getBoundingClientRect() zugewiesen, das die Größe und Position des Canvas im Verhältnis zur Ansicht gibt
        if (!canvas) { // Es wird eine Überprüfung durchgeführt, um zu sehen, ob die Variable canvas einen Wert hat
            // Wenn dies nicht der Fall ist
            console.log("No Canvas!"); // wird die Nachricht "No Canvas!" in die Konsole geloggt
            return; // und die Funktion kehrt zurück.
        }
        canvas.addEventListener("click", handleClick);

        // Event Listener für das Speichern der Feuerwerke
        document.getElementById("save").addEventListener("click", saveFirework);

        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");


        // Lädt die gespeicherten Feuerwerke aus der Datenbank
        loadFireworkNames();

        // updated den canvas alle 20 millisekunden
        setInterval(update, 20);
    }
    // Erschafft bei klicken auf den Canvas ein Feuerwerk
    function handleClick(e: MouseEvent): void {
        let fireworkConfig: FireworkConfig = {
            color: color,
            numberOfParticles: numberOfParticles,
            positionX: e.clientX - rect.left,
            positionY: e.clientY - rect.top,
            speed: speed
        };

        let particleConfig: ParticleConfig = {
            color: color,
            size: size,
            width: width
        };

        fireworks.push(new Firework(fireworkConfig, particleConfig));
    }


    // Malt den hintergrund (leicht Transparent damit die Raketen eine Spur hinterlassen)
    function drawBackground(): void {
        let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, crc2.canvas.height); //gradient ist sowas wie transparenz
        gradient.addColorStop(0, "#05050555"); //Das vierte Zahlenpaar (die 55) geben die Transparenz an
        gradient.addColorStop(0.62, "#00002255");
        gradient.addColorStop(1, "#00003355");

        crc2.fillStyle = gradient;
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
    }

    function update(): void {
        drawBackground(); //Funktionsaufruf

        for (let i: number = fireworks.length - 1; i >= 0; i--) {
            // Löscht das Feuerwerk falls es schon explodiert ist und alle seine Partikel gelöscht hat            
            if (fireworks[i].createdParticles && fireworks[i].particles.length == 0) {
                fireworks.splice(i, 1);
                continue;
            }

            // Malt und updated jedes Feuerwerk
            fireworks[i].draw();
            fireworks[i].update();
        }

    }




    // Alle Parameter welche auf dem Server Gespeichert werden als Objekt
    interface SaveConfig {
        name: string;
        color: string;
        red: number;
        green: number;
        blue: number;
        numberOfParticles: number;
        speed: number;
        size: number;
        width: number;
    }

    // Speichert ein Feuerwerk auf dem Server
    async function saveFirework(): Promise<void> {
        let data: SaveConfig = {
            name: name,
            color: color,
            red: red,
            green: green,
            blue: blue,
            numberOfParticles: numberOfParticles,
            speed: speed,
            size: size,
            width: width
        };

        let query: URLSearchParams = new URLSearchParams();
        query.set("command", "insert");
        query.set("collection", "firefirework");
        query.set("data", JSON.stringify(data));

        let response: Response = await fetch("https://webuser.hs-furtwangen.de/~befusjul/Database/index.php?" + query.toString());

        // Lädt anschließend die neue Feuerwerkliste nochmal vom Server runter
        loadFireworkNames();
    }

    // Interface für die Antwort des Servers
    interface Items {
        [category: string]: SaveConfig;
    }


    // Lädt die gespeicherten Feuerwerke vom Server runter und zeigt sie an
    async function loadFireworkNames(): Promise<void> {
        let query: URLSearchParams = new URLSearchParams();
        query.set("command", "find");
        query.set("collection", "firefirework");

        let response: Response = await fetch("https://webuser.hs-furtwangen.de/~befusjul/Database/index.php?" + query.toString());
        let raw: string = await response.text();

        let data: Items = JSON.parse(raw).data;

        // Liste der Feuerwerke im HTML
        let availables: HTMLElement = document.getElementById("available");

        // Löscht alle einträge bis auf die Template
        while (availables.childElementCount > 1) {
            availables.removeChild(availables.lastChild);
        }

        // Erstellt für jedes gespeicherte Feuerwerk ein HTML Element und fügt es der Seite hinzu 
        for (let key in data) {
            // Dupliziert das Template Element
            let newElement: HTMLElement = availables.firstElementChild.cloneNode(true) as HTMLElement;

            // Ändert den namen
            newElement.firstChild.textContent = data[key].name;
            // macht es sichtbar
            newElement.style.display = "";
            // fügt unten eine Trennlinie hinzu
            newElement.style.borderBottom = "1px solid black";

            // Speichert die ID des Datenbank eintrags auf dem Html element, damit sie in der Löschen und Laden funktion benutzt werden kann
            newElement.querySelector(".load").setAttribute("itemId", key);
            newElement.querySelector(".delete").setAttribute("itemId", key);


            newElement.querySelector(".load").addEventListener("click", loadFirework);
            newElement.querySelector(".delete").addEventListener("click", deleteFirework);

            // fügt das Element der Seite hinzu
            availables.appendChild(newElement);
        }
    }


    // Lädt das ausgewählte Feuerwerk in das Programm
    async function loadFirework(): Promise<void> {
        let query: URLSearchParams = new URLSearchParams();
        query.set("command", "find");
        query.set("collection", "firefirework");
        query.set("id", this.getAttribute("itemId"));

        let response: Response = await fetch("https://webuser.hs-furtwangen.de/~befusjul/Database/index.php?" + query.toString());
        let raw: string = await response.text();

        let data: Items = JSON.parse(raw).data;
        let loadedConfig: SaveConfig = data[this.getAttribute("itemId")];

        // Aktualisiert alle wichtigen Variablen
        name = loadedConfig.name;
        color = loadedConfig.color;
        red = loadedConfig.red;
        green = loadedConfig.green;
        blue = loadedConfig.blue;
        numberOfParticles = loadedConfig.numberOfParticles;
        speed = loadedConfig.speed;
        size = loadedConfig.size;
        width = loadedConfig.width;

        // Setzt die Slider auf die richtigen Werte
        nameInput.value = loadedConfig.name;
        redInput.value = loadedConfig.red.toString();
        greenInput.value = loadedConfig.green.toString();
        blueInput.value = loadedConfig.blue.toString();
        numberOfParticlesInput.value = loadedConfig.numberOfParticles.toString();
        speedInput.value = loadedConfig.speed.toString();
        sizeInput.value = loadedConfig.size.toString();
        widthInput.value = loadedConfig.width.toString();

        // Aktualisiert die Farbbox
        updateColor();
    }

    // Löscht Feuerwerke vom Server
    async function deleteFirework(): Promise<void> {
        let query: URLSearchParams = new URLSearchParams();
        query.set("command", "delete");
        query.set("collection", "firefirework");
        query.set("id", this.getAttribute("itemId"));

        let response: Response = await fetch("https://webuser.hs-furtwangen.de/~befusjul/Database/index.php?" + query.toString());
        let raw: string = await response.text();

        // Lädt anschließend die aktualisierte Liste der Feuerwerke runter
        loadFireworkNames();
    }
}