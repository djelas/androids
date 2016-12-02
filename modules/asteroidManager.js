var ASTEROIDS = (function (module) {

    var OBJECTS_IN_POOL = 100;

    function createAsteriod() {
        var loader = new THREE.OBJLoader();
        var container = new THREE.Object3D();
        var material = new THREE.MeshBasicMaterial(
            {map: THREE.ImageUtils.loadTexture('assets/AM1.jpg')});
            // {color: 0x00ff00});
        loader.load( 'assets/asteroid1.obj' , function ( mesh ) {
            console.log(mesh);
            mesh.children[0].geometry.computeFaceNormals();
            mesh.children[0].geometry.computeVertexNormals();
            mesh.children[0].material = material;
            container.add( mesh );
        });
        return container;
    }

    function calculatePoint(r, s, t) {
        var x = r * Math.cos(s) * Math.sin(t);
        var y = r * Math.sin(s) * Math.sin(t);
        var z = r * Math.cos(t);
        return new THREE.Vector3(x, y, z);
    }

    module.AsteroidManager = {
        generate: function (innerRadius, outerRadius) {
            var result = [];
            for (var i = 0; i < OBJECTS_IN_POOL; i++) {
                var asteroid = createAsteriod();
                asteroid.scale.set(0.1, 0.1, 0.1);
                var radius = module.getRandom(innerRadius, outerRadius);
                var angle1 = module.getRandom(0, Math.PI * 2);
                var angle2 = module.getRandom(0, Math.PI * 2);
                var point = calculatePoint(radius, angle1, angle2);
                asteroid.position.set(point.x, point.y, point.z);
                result.push(asteroid);
            }
            return result;
        },
        animate: function (timedelta) {
            var asteroids = module.Model.asteroids;
            for (var i = 0; i < asteroids.length; i++) {
                asteroids[i].rotation.x += module.getRandom(1, 5) * timedelta / 5 * i / asteroids.length;
                asteroids[i].rotation.y += module.getRandom(1, 5) * timedelta / 5 * i / asteroids.length;
            }
        }
    }
    return module;
})(ASTEROIDS || {});
