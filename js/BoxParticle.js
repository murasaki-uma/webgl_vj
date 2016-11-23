var BoxParticle = (function () {
    function BoxParticle(renderer) {
        this.UPDATE = true;
        this.END = false;
        this.gpuparticle = [];
        this.clickCounter = 0;
        this.isUpdate = false;
        this.animateSetting = [];
        this.speed = 1.0;
        this.renderer = renderer;
        this.camera = new THREE.PerspectiveCamera(110, window.innerWidth / window.innerHeight, 1, 50000);
        this.camera.position.y = 0;
        this.camera.position.z = 600;
        this.scene = new THREE.Scene();
        var yStep = 150;
        for (var i = 0; i < 6; i++) {
            var vec = 1;
            if (i % 2 == 0) {
                vec = -1;
            }
            else {
                vec = 1;
            }
            var setting = {
                moveToY: 200
            };
            this.animateSetting.push(setting);
            var position = new THREE.Vector3(yStep * i - (yStep * 6) / 2 + 100, -200, 0);
            this.startUpdate = false;
            var color = new THREE.Color(0xffffff);
            // scene, camera, renderer,width,position,color
            this.gpuparticle.push(new GPGPUParticle(this.scene, this.camera, this.renderer, 100, position, color));
        }
        this.scene.add(new THREE.AmbientLight(0xffffff, 0.5));
        var dLight = new THREE.DirectionalLight(0xffffff, 0.8);
        dLight.position.set(0, 800, 0);
        this.scene.add(dLight);
        var dLight = new THREE.DirectionalLight(0xffffff, 0.8);
        dLight.position.set(0, 0, 300);
        this.scene.add(dLight);
    }
    BoxParticle.prototype.keyUp = function () {
    };
    BoxParticle.prototype.keyDown = function (event) {
    };
    BoxParticle.prototype.initOrbitControls = function () {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableKeys = false;
    };
    BoxParticle.prototype.resize = function () {
        for (var i = 0; i < this.gpuparticle.length; i++) {
            this.gpuparticle[i].resize();
        }
    };
    BoxParticle.prototype.remove = function () {
        //console.log(this.scene.children);
        while (this.scene.children.length != 0) {
            this.scene.remove(this.scene.children[0]);
            if (this.scene.children[0] == THREE.Mesh) {
                this.scene.children[0].geometry.dispose();
                this.scene.children[0].material.dispose();
            }
        }
        ;
    };
    BoxParticle.prototype.endEnabled = function () {
        this.UPDATE = false;
    };
    BoxParticle.prototype.click = function () {
        if (this.clickCounter == 0) {
            this.isUpdate = true;
        }
        // particle start
        //this.gpuparticle[this.clickCounter].startUpdate = true;
        this.clickCounter++;
    };
    BoxParticle.prototype.update = function () {
        //console.log(this.END);
        if (this.UPDATE == false) {
            //this.scene.remove(this.scene.children[0]);
            this.remove();
            if (this.scene.children.length == 0) {
                this.END = true;
            }
        }
        // this.camera.position.z -= 1;
        if (this.isUpdate) {
            for (var i = 0; i < this.gpuparticle.length; i++) {
                // this.gpuparticle[i].position.x += this.animateSetting[i].direction*this.speed;
                if (Math.abs(this.gpuparticle[i].position.x) <= 10) {
                    this.speed = 0.01;
                }
                if (Math.abs(this.gpuparticle[i].position.x) <= 10) {
                    for (var i = 0; i < this.gpuparticle.length; i++) {
                        this.gpuparticle[i].startUpdate = true;
                    }
                }
            }
        }
        for (var i = 0; i < this.gpuparticle.length; i++) {
            this.gpuparticle[i].update();
        }
    };
    return BoxParticle;
}());
//# sourceMappingURL=BoxParticle.js.map