var Feuerwerk;
(function (Feuerwerk) {
    class Firework {
        particles;
        createdParticles;
        particleConfig;
        counter;
        crc2;
        color;
        numberOfParticles;
        position;
        speed;
        constructor(config, particleConfig) {
            let canvas = document.querySelector("canvas");
            this.crc2 = canvas.getContext("2d");
            this.color = config.color;
            this.numberOfParticles = config.numberOfParticles;
            this.position = new Feuerwerk.Vector(config.positionX, config.positionY);
            this.speed = config.speed;
            this.particleConfig = particleConfig;
            this.createdParticles = false;
            this.particles = [];
            if (this.color == "#000000") {
                this.color = "#fff";
            }
        }
        draw() {
            for (let particle of this.particles) {
                particle.draw();
            }
        }
        update() {
            if (!this.createdParticles) {
                for (let i = 0; i < this.numberOfParticles; i++) {
                    let startVelocity = new Feuerwerk.Vector(Math.random() * this.particleConfig.width - this.particleConfig.width / 2, Math.random() * 35 - 10);
                    this.particles.push(new Feuerwerk.Particle(this.particleConfig, this.position.copy(), startVelocity));
                }
                this.createdParticles = true;
                return;
            }
            for (let i = this.particles.length - 1; i >= 0; i--) {
                if (!this.particles[i].alive) {
                    this.particles.splice(i, 1);
                    continue;
                }
                this.particles[i].update();
            }
        }
    }
    Feuerwerk.Firework = Firework;
})(Feuerwerk || (Feuerwerk = {}));
//# sourceMappingURL=Firework.js.map