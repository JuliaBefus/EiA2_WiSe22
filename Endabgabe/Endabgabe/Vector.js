var Feuerwerk;
(function (Feuerwerk) {
    // Vektor ist sozusagen die Flugbahn der Partikel
    class Vector {
        x; //Hier wird eine Eigenschaft x als Typ number definiert.
        y; //Hier wird eine weitere Eigenschaft y als Typ number definiert
        //mit dem Konstruktor bauen wir die x und y achse auf
        constructor(_x, _y) {
            this.set(_x, _y); //
        }
        set(_x, _y) {
            this.x = _x;
            this.y = _y;
        }
        scale(_factor) {
            this.x *= _factor;
            this.y *= _factor;
        }
        add(_addend) {
            this.x += _addend.x;
            this.y += _addend.y;
        }
        random(_minLength, _maxLength) {
            let length = _minLength + Math.random() * (_maxLength - _minLength);
            let direction = 1;
            this.set(Math.cos(direction), Math.sin(direction));
            this.scale(length);
        }
        copy() {
            return new Vector(this.x, this.y);
        }
    }
    Feuerwerk.Vector = Vector;
})(Feuerwerk || (Feuerwerk = {}));
//# sourceMappingURL=Vector.js.map