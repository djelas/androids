var ASTEROIDS = (function (module) {

    var OBJECTS_IN_POOL = 100;

    function createAsteriod() {
        var geometry = new THREE.SphereGeometry(module.getRandom(0, 10), 32, 32);
        //var material = new THREE.MeshPhongMaterial( { color: 0xdddddd, specular: 0x009900, shininess: 30, shading: THREE.FlatShading } )
        //var material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
        var material = new THREE.MeshPhongMaterial({
            color: 0x156289,
            emissive: 0x072534,
            side: THREE.DoubleSide,
            shading: THREE.FlatShading
        })
        var sphere = new THREE.Mesh(geometry, material);
        return sphere;
    }

    function calculatePoint(r, s, t) {
        x = r * Math.cos(s) * Math.sin(t)
        y = r * Math.sin(s) * Math.sin(t)
        z = r * Math.cos(t)
        return new THREE.Vector3(x, y, z);
    }

    module.AsteroidManager = {
        generate: function (innerRadius, outerRadius) {
            var result = [];
            for (var i = 0; i < OBJECTS_IN_POOL; i++) {
                var asteroid = createAsteriod();
                var radius = module.getRandom(innerRadius, outerRadius);
                var angle1 = module.getRandom(0, Math.PI * 2);
                var angle2 = module.getRandom(0, Math.PI * 2);
                var point = calculatePoint(radius, angle1, angle2);
                asteroid.position.set(point.x, point.y, point.z);
                result.push(asteroid);
            }
            return result;
        },
        animate: function () {
            var asteroids = module.Model.asteroids;
            for (var i = 0; i < asteroids.length; i++) {
                asteroids[i].rotation.x += module.getRandom(0.01, 0.1);
                asteroids[i].rotation.y += module.getRandom(0.01, 0.1);
            }
        }
    }
    return module;
})(ASTEROIDS || {});