/*
Aufgabe: 08 Generative Kunst
Name: Julia Befus
Matrikel: 271025
Datum: 23.11.2022
Quellen: Aanya Khetarpal, Pia Giovannelli, Paula Jordans, Havva Kilic
*/

namespace L08_GenerativeKunst {

    window.addEventListener("load", fillCanvas);

    let canvas: HTMLCanvasElement;
    let crc2: CanvasRenderingContext2D;

    function fillCanvas(_event: Event): void {

        canvas = <HTMLCanvasElement>document.querySelector("canvas");
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        crc2.clearRect(0, 0, canvas.width, canvas.height);

        let colorLines: string[] = ["pink", "turquoise", "white"];

        for (let i: number = 0; i < colorLines.length; i++)
            for (let index: number = 0; index < 400; index++) {
                let a: number = randomNumber(0, canvas.width);
                let b: number = randomNumber(0, canvas.height);
                let c: number = randomNumber(0, canvas.width);
                let d: number = randomNumber(0, canvas.height);
                
                crc2.beginPath();
                crc2.strokeStyle = colorLines[i];
                crc2.moveTo(a, b);
                crc2.lineTo(c, d);
                crc2.closePath();
                crc2.stroke();
            }

        let objectAmount: number = randomNumber(30, 300);
        for (let i: number = 0; i < objectAmount; i++) {
            drawRandomObject();
        }

        let newCanvas: HTMLElement = <HTMLElement>document.querySelector("button")!;
        newCanvas.addEventListener("click", fillCanvas);
    }

    function drawRandomObject(): void {

        let x: number = randomNumber(0, canvas.width);
        let y: number = randomNumber(0, canvas.height);

        crc2.save();
        crc2.translate(x, y);

        crc2.fillStyle = randomColor();

        let objectShape: number = randomNumber(0, 3);
        switch (objectShape) {
            case 0:
                randomRectangle();
                break;
            case 1:
                randomCircle();
                break;
            case 2:
                randomPolygon();
                break;
        }

        crc2.restore();
    }

    function randomRectangle(): void {
        let width: number = randomNumber(10, 100);
        let height: number = randomNumber(10, 100);

        crc2.fillRect(0, 0, width, height);
    }

    function randomCircle(): void {
        let size: number = randomNumber(1, 100);

        crc2.beginPath();
        crc2.arc(0, 0, size, 0, 360);
        crc2.closePath();
        crc2.fill();
    }

    function randomPolygon(): void {
        let points: number = randomNumber(3, 8);

        crc2.beginPath();
        for (let i: number = 0; i < points; i++) {
            let x: number = randomNumber(0, 100) - randomNumber(0, 100);
            let y: number = randomNumber(0, 100) - randomNumber(0, 100);
            crc2.lineTo(x, y);
        }
        crc2.closePath();
        crc2.fill();
    }

    function randomNumber(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    function randomColor(): string {
        let letters: string = "0123456789ABCDEF";
        let color: string = "#";
        for (let i: number = 0; i < 8; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}