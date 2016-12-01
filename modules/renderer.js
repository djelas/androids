var ASTEROIDS = (function(module){
        var renderer, mesh, scene, camera;
        module.Renderer = {
            init: function() {
                scene = new THREE.Scene();
            
                camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
                camera.position.z = 1000;
            
                var geometry = new THREE.BoxGeometry( 200, 200, 200 );
                var material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
            
                mesh = new THREE.Mesh( geometry, material );
                scene.add( mesh );
            
                renderer = new THREE.WebGLRenderer();
                renderer.setSize( window.innerWidth, window.innerHeight );
            
                document.body.appendChild( renderer.domElement );
            },
            render: function() {
            
                mesh.rotation.x += 0.01;
                mesh.rotation.y += 0.02;
            
                renderer.render( scene, camera );
            }
        }
        return module;
})(ASTEROIDS || {});