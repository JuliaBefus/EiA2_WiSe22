/*
Aufgabe: 8.2 Vogelhaus
Name: Julia Befus
Matrikel: 271025
Datum: 02.11.2022
Quellen: Aanya Khetarpal, Pia Giovannelli, Paula Jordans, Havva Kilic
*/

namespace Vogelhaus {

    interface Vector {
        x: number;
        y: number;
    }

    // Zufallszahl zwischen minimaler und maximaler Eingabe
    function randomNumber(_min: number, _max: number): number {
        return Math.random() * (_max - _min) + _min;
    }

    window.addEventListener("load", createCanvas);

    let canvas: HTMLCanvasElement;
    export let crc2: CanvasRenderingContext2D;

    function createCanvas(_event: Event): void {

        canvas = <HTMLCanvasElement>document.querySelector("canvas");
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        window.addEventListener("resize", fillCanvas, false);
        window.addEventListener("orientationchange", fillCanvas, false);
        fillCanvas();
    }

    function fillCanvas(): void {

        // Die Leinwandgröße
        canvas.width = window.innerWidth * 0.95;
        canvas.height = window.innerHeight * 0.85;

        let horizon: number = canvas.height * 0.38;
        let posMountains: Vector = { x: 0, y: horizon };

        drawBackground(horizon);
        drawSun({ x: canvas.width * 0.1, y: canvas.height * 0.12 });
        drawCloud({ x: canvas.width * 0.8, y: canvas.height * 0.15 }, { x: 90, y: 50 });
        drawCloud({ x: canvas.width * 0.4, y: canvas.height * 0.2 }, { x: 70, y: 40 });
        drawMountains(posMountains, canvas.height * 0.08, canvas.height * 0.15, "black", "white");
        drawMountains(posMountains, canvas.height * 0.05, canvas.height * 0.09, "#442b0b", "#c09682");

        drawTrees(0, 15);
    }

    function drawBackground(_horizon: number): void {

        // Die Himmelfarbe
        let gradientSky: CanvasGradient = crc2.createLinearGradient(0, 0, 0, _horizon);
        gradientSky.addColorStop(0, "blue");
        gradientSky.addColorStop(1, "turquoise");

        crc2.fillStyle = gradientSky;
        crc2.fillRect(0, 0, canvas.width, _horizon);

        // Die Wiesenfarbe (Schnee)
        let gradientMeadow: CanvasGradient = crc2.createLinearGradient(0, _horizon, 0, canvas.height);
        gradientMeadow.addColorStop(0, "beige");
        gradientMeadow.addColorStop(1, "white");

        crc2.fillStyle = gradientMeadow;
        crc2.fillRect(0, _horizon, canvas.width, canvas.height);
    }

    function drawSun(_position: Vector): void {

        //Die Sonne und ihre Sonnenstrahlen
        let r1: number = canvas.width * 0.02;
        let r2: number = canvas.width * 0.06;
        let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, r1, 0, 0, r2);

        gradient.addColorStop(0, "HSLA(60, 100%, 90%, 1)");
        gradient.addColorStop(1, "HSLA(60, 100%, 60%, 0)");

        // Zeichnung Sonne
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = gradient;
        crc2.arc(0, 0, r2, 0, 2 * Math.PI);
        crc2.fill();
        crc2.restore();
    }

    function drawCloud(_position: Vector, _size: Vector): void {

        // Basispartikel erstellen und färben
        let nParticles: number = 40;
        let radiusParticle: number = 20;
        let particle: Path2D = new Path2D();
        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);

        let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);
        gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
        gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");
        crc2.fillStyle = gradient;

        crc2.save();
        crc2.translate(_position.x, _position.y);

        // Jedem Partikel zufällige Position innerhalb des Wolkenbereichs geben
        for (let drawn: number = 0; drawn < nParticles; drawn++) {

            crc2.save();

            let x: number = (Math.random() - 0.5) * _size.x;
            let y: number = - (Math.random() * _size.y);

            crc2.translate(x, y);
            crc2.fill(particle);
            crc2.restore();
        }
        crc2.restore();
    }

    function drawMountains(_position: Vector, _min: number, _max: number, _colorLow: string, _colorHigh: string): void { 

        // Abstand zwischen Berggipfeln und Tälern
        let stepMin: number = 10;
        let stepMax: number = 20;
        let x: number = 0;

        crc2.save();
        crc2.translate(_position.x, _position.y);

        // Anfang Bergpfad auf der linken Seite
        crc2.beginPath();
        crc2.moveTo(0, 0);
        crc2.lineTo(0, -_max);

        // Zeichne Berge
        do {
            x += stepMin + randomNumber(stepMin, stepMax);
            let y: number = - randomNumber(_min, _max);
            crc2.lineTo(x, y);

        } while (x < canvas.width);

        // Ende Bergpfad auf der rechten Seite
        crc2.lineTo(x, 0);
        crc2.closePath();

        // Die Farbe der Berge
        let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, -_max);
        gradient.addColorStop(0, _colorLow);
        gradient.addColorStop(0.9, _colorHigh);

        crc2.fillStyle = gradient;
        crc2.fill();

        crc2.restore();
    }

    function drawTrees(_min: number, _max: number): void {

        // Der Abstand zwischen den Bäumen
        let stepMin: number = 5;
        let stepMax: number = 15;
        let x: number = 0;

        // Zeichne jeden Baum
        do {
            let y: number = randomNumber(_min, _max);
            crc2.save();
            crc2.translate(x, y + (canvas.height * 0.39));

            let treeTrunk: number = -30; // Baumstammhöhe
            let treeTop: number = -150; // Baumgipfelhöhe
            let treeColor: string[] = ["#008860", "#008860", "#FFFFFF"]; // Grün und Weiß

            let treeSize: number = randomNumber(0.15, 0.2);

            crc2.scale(treeSize, treeSize);

            // Baumstamm
            crc2.fillStyle = "#6d502b"; // Farbe des Baumstammes
            crc2.fillRect(0, 0, 15, treeTrunk);

            // Baumgipfel
            for (let color: number = 0; color < 3; color++) {

                // Dreieck zeichnen und mit Farbe füllen
                crc2.beginPath();
                crc2.moveTo(-50, treeTrunk);
                crc2.lineTo(60, treeTrunk);
                crc2.lineTo(10, treeTop);
                crc2.closePath();
                crc2.fillStyle = treeColor[color];
                crc2.fill();

                // Startposition des nächsten Dreiecks nach oben verschieben
                treeTrunk += -40;
                treeTop += -40;
            }

            x += stepMin + randomNumber(stepMin, stepMax);
            crc2.restore();

        } while (x < canvas.width);
    }
}