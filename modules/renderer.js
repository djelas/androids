var ASTEROIDS = (function (module) {
    var renderer, mesh, scene, camera;
    module.Renderer = {
        init: function () {
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 100);
            camera.position.z = 40;

            var imagePrefix = "assets/purplenebula_";
	          var directions  = ["ft", "lf", "up", "dn", "rt", "bk"];
	          var imageSuffix = ".png";
	          var skyGeometry = new THREE.CubeGeometry( 5000, 5000, 5000 );

            var dir = directions.map(function (a) {
                return  imagePrefix + a + imageSuffix;
            });

            var textureCube = new THREE.CubeTextureLoader().load( dir );

            var cubeShader = THREE.ShaderLib[ "cube" ];
				    var cubeMaterial = new THREE.ShaderMaterial( {
					      fragmentShader: cubeShader.fragmentShader,
					      vertexShader: cubeShader.vertexShader,
					      uniforms: cubeShader.uniforms,
					      depthWrite: false,
					      side: THREE.BackSide
				    } );
				    cubeMaterial.uniforms[ "tCube" ].value = textureCube;
				    var cubeMesh = new THREE.Mesh( new THREE.BoxGeometry( 100, 100, 100 ), cubeMaterial );

            scene = new THREE.Scene();

	          scene.add( cubeMesh );

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
            renderer.render(scene, camera);
        }
    }
    return module;
})(ASTEROIDS || {});
