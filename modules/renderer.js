var ASTEROIDS = (function (module) {
    var renderer, mesh, scene, camera;

    function calculatePoint(r, s, t) {
        x = r * Math.cos(s) * Math.sin(t)
        y = r * Math.sin(s) * Math.sin(t)
        z = r * Math.cos(t)
        return new THREE.Vector3(x, y, z);
    }

    module.Renderer = {
        init: function () {
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 100);
            camera.position.z = 40;

            /*
            var geometry = new THREE.BoxGeometry( 200, 200, 200 );
            var material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
            scene = new THREE.Scene();
            mesh = new THREE.Mesh( geometry, material );
            scene.add( mesh );
            //*/
            scene = new THREE.Scene();
            module.Model.asteroids.map(function (item) {
                scene.add(item);
            });
            var lights = [];
            lights[0] = new THREE.PointLight(0xffffff, 1, 0);
            lights[1] = new THREE.PointLight(0xffffff, 1, 0);
            lights[2] = new THREE.PointLight(0xffffff, 1, 0);

            lights[0].position.set(0, 200, 0);
            lights[1].position.set(100, 200, 100);
            lights[2].position.set(- 100, - 200, - 100);

            scene.add(lights[0]);
            scene.add(lights[1]);
            scene.add(lights[2]);

            renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);

            document.body.appendChild(renderer.domElement);
        },
        render: function (timedelta) {
            module.AsteroidManager.animate(timedelta);
            var playerPosition = module.Model.player.position;
            var playerRotation = module.Model.player.rotation.toVector3();
            camera.position.copy(playerPosition);
            camera.lookAt(module.Model.player.localToWorld(new THREE.Vector3(playerRotation.x, playerRotation.y, playerRotation.z - 1)));
            renderer.render(scene, camera);
        }
    }
    return module;
})(ASTEROIDS || {});
