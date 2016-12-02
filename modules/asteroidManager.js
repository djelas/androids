var ASTEROIDS = (function (module) {

    var OBJECTS_IN_POOL = 10;
    var mesh;

    function createAsteriod() {
        var loader = new THREE.OBJLoader();
        var container = new THREE.Object3D();
        var texture = THREE.ImageUtils.loadTexture('assets/AM1.jpg');
        var material = new THREE.MeshBasicMaterial({map: texture});

        loader.load( 'assets/asteroid1.obj', function (m) {
            m.children[0].geometry.computeFaceNormals();
            m.children[0].geometry.computeVertexNormals();
            m.children[0].material = material;
            container.add(m);
        });

        return container;
    }

    function calculatePoint(r, s, t) {
        var x = r * Math.cos(s) * Math.sin(t);
        var y = r * Math.sin(s) * Math.sin(t);
        var z = r * Math.cos(t);
        return new THREE.Vector3(x, y, z);
    }

    var generateFlag = false;
    function generate(innerRadius, outerRadius) {
        var result = [];
        if (mesh) {
            for (var i = 0; i < OBJECTS_IN_POOL; i++) {
                var asteroid = createAsteriod();
                //asteroid.scale.set(0.1, 0.1, 0.1);
                var radius = module.getRandom(innerRadius, outerRadius);
                var angle1 = module.getRandom(0, Math.PI * 2);
                var angle2 = module.getRandom(0, Math.PI * 2);
                var point = calculatePoint(radius, angle1, angle2);
                asteroid.position.set(point.x, point.y, point.z);
                result.push(asteroid);
            }
        }
        else {
            generateFlag = arguments;
        }
        return result;
    };
    module.AsteroidManager = {
        init: function() {
            module.loader.load( 'assets/asteroid1.obj', function (m) {
                mesh = m;
                if (generateFlag) {
                    generate.apply(null, generateFlag);
                }
            });
        },
        generate: generate,
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
