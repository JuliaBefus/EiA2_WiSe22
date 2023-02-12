namespace Feuerwerk {

    // Vektor ist sozusagen die Flugbahn der Partikel

    export class Vector { //Meine Klasse Vector //Die Klasse Vector repräsentiert einen Vektor mit x- und y-Koordinaten
        x: number; //Hier wird eine Eigenschaft x als Typ number definiert.
        y: number; //Hier wird eine weitere Eigenschaft y als Typ number definiert

        //mit dem Konstruktor bauen wir die x und y achse auf
        constructor(_x: number, _y: number) { // Hier wird ein Konstruktor für die Klasse Vector definiert, der zwei Argumente _x und _y vom Typ number akzeptiert.
            this.set(_x, _y); //
        }

        set(_x: number, _y: number): void {
            this.x = _x;
            this.y = _y;
        }

        scale(_factor: number): void { //Die scale-Methode verwendet den übergebenen Faktor _factor, um die x- und y-Werte des Vektors zu multiplizieren. 
            this.x *= _factor;
            this.y *= _factor;
        }

        add(_addend: Vector): void { //Die add-Methode fügt einen anderen Vektor _addend hinzu, indem sie seine x- und y-Werte zu denen des aktuellen Vektors hinzufügt.
            this.x += _addend.x;
            this.y += _addend.y;
        }

        random(_minLength: number, _maxLength: number): void { //Die random-Methode generiert einen zufälligen Vektor mit einer Länge zwischen _minLength und _maxLength und einer zufälligen Richtung
            let length: number = _minLength + Math.random() * (_maxLength - _minLength);
            let direction: number = 1;

            this.set(Math.cos(direction), Math.sin(direction));
            this.scale(length);
        }

        copy(): Vector { 
            return new Vector(this.x, this.y); 
        }
    }
}
