var Feuerwerk;
(function (Feuerwerk) {
    class Firework {
        //das sind Attribute: damit in unserem Feuerwerk auch die Partikel (von Particle.ts) auch wirklich enthalten sind, müssen wir es in Firework.ts konfigurieren (wie eine Art Verknüpfung/Verlinkung)
        particles; // unser Partikel ist ein Array d.h: wir haben nicht nur ein Partikel, sondern viele verschiedene Partikel hintereinander 
        //und jedes einzelne Partikel soll verschiedene Vektorpositionen erhalten. Soll nicht alles auf einen Fleck fliegen, sonder jedes seine eigene Position
        // und diese Funktion (particles: Particle []) muss ein Array sein, damit ich sie später unten (bei update) an verschiedenen Vektoren setze. 
        createdParticles;
        particleConfig;
        counter; // Anzahl der vergangenen Frames seit erschaffung,
        crc2;
        color;
        numberOfParticles;
        position;
        speed;
        // Konstruktor ist dazu da, unsere Klasse(Feuerwerk) zu bauen:
        // Kriegt seine eigene FireworkConfig übergeben, und die ParticleConfig für die Partikel, welche bei der Explosion erschaffen werden
        // Mit constructor werden Instanzen geschaffen
        constructor(config, particleConfig) {
            let canvas = document.querySelector("canvas");
            this.crc2 = canvas.getContext("2d"); //unser Feuerwerk wird in 2D dargestellt 
            // Die Eigenschaften werden der Klasse zugewiesen/ / Sind Verpackung salopp gesagt auf denen Eigenschaften des Feuerwerks bzw. der Partikel stehen
            //das sind Parameter: //hier bauen wir unser Feuerwerk: hier haben wir Attributen (color,numberOfParticles, position und spedd) heruntergenommen und konfiguriert
            this.color = config.color;
            this.numberOfParticles = config.numberOfParticles;
            this.position = new Feuerwerk.Vector(config.positionX, config.positionY); //den Vektor unserer Position, wir holen über die Postionen X und Y automatisch gleich die Positionen raus. d.h dass er es gleich ausrechen kann
            this.speed = config.speed;
            this.particleConfig = particleConfig;
            this.createdParticles = false;
            this.particles = []; // Anzahl der Partikel ist ein leerer Array. 
            // Falls die Farbe schwarz ist, wird eine zufällige Farbe gewählt
            //hier am Ende tun wir in unserer Klasse prüfen:
            if (this.color == "#000000") { //  ob die Farbe von meinen Feuerwerk schwarz ist,
                this.color = "#fff"; // wenn ja soll er eine zufällige Farbe setzen
            }
        }
        draw() {
            // Alle Partikel aus dem Partikel Array werden einmal gezeichnet
            for (let particle of this.particles) { //die ganzen Partikel die wir aufgerufen haben,
                particle.draw(); //springen in die Partikel-Klasse rein und die hat die Funktion draw (die soll das Ganze natürlich zeichnen)
            }
        }
        update() {
            // Selbe if bedingung wie in draw
            if (!this.createdParticles) {
                for (let i = 0; i < this.numberOfParticles; i++) {
                    // gibt dem neuen Partikel eine zufällige Richtung
                    // abhängig von "Ausbreitung der Partikel"
                    let startVelocity = new Feuerwerk.Vector(Math.random() * this.particleConfig.width - this.particleConfig.width / 2, Math.random() * 35 - 10);
                    // Ein neuer Vektor wird für einzelne Partikel zusammengesetzt, damit sie bei jedem Klick auf unserem Bildschirm eine neue Position bekommt. 
                    // Fügt das neue Partikel ins Partikel array hinzu.
                    // Es wird die Position der Rakete ans Partikel übergeben
                    this.particles.push(new Feuerwerk.Particle(this.particleConfig, this.position.copy(), startVelocity));
                }
                this.createdParticles = true; //und wenn keine Partikel zu sehen sind, dann soll er sie danach auf true setzen
                return;
            }
            // Updated alle Partikel
            for (let i = this.particles.length - 1; i >= 0; i--) { // hier holt er sich die Partikel Länge raus
                // Löscht tote Partikel
                // wenn die Elemente (particles) noch am Leben sind, dann will er die toten Partikel, die im Hintergrund nicht mehr zu sehen sind rauslöschen
                // und die splice-Methode ruft die Löschung von den Partikeln an der Stelle i also die Anzahl (wir haben ja die Partikel im Array gespeichert für jeden einzelnen Kreis, haben wir ein Arrayeintrag erzeugt und für jeden dieser einzelnen Arrays wird ein Element gelöscht und d.h. für jedes einzelne Partikel wird hier rausgelöscht)   
                if (!this.particles[i].alive) { // dann geht er hier rein und prüft, ob an der Stelle i die Partikel noch am Leben sind. Wenn die Partikel nicht leben
                    this.particles.splice(i, 1); // splice removed (entfernt) die Elemente von dem Array und die Anzahl der Elemente 
                    continue;
                }
                this.particles[i].update(); // hier holt er alle Partikel aus unserem Array raus und aus dem Array löscht er quasi alle Partikel an der Stelle i. 
            }
        }
    }
    Feuerwerk.Firework = Firework;
})(Feuerwerk || (Feuerwerk = {}));
//# sourceMappingURL=Firework.js.map