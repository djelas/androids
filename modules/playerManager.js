var ASTEROIDS = (function(module){
        var player;
        module.PlayerManager = {
            create: function() {
                player = new THREE.Object3D();
                player.position = new THREE.Vector3(0, 0 , 0);
                player.speed = 0;
                return player;
            },
            rotate: function(delta, input) {
                if (player) {
                    if (input[0] === 1) {
                        player.rotation.x -= delta * 2;
                    }
                    else if (input[2] === 1) {
                        player.rotation.x += delta * 2;
                    }
                    else if (input[1] === 1) {
                        player.rotation.y += delta * 2;
                    }
                    else if (input[3] === 1) {
                        player.rotation.y -= delta * 2;
                    }
                }
            },
            translate: function(delta) {
                if (player) {
                    player.position.z -= delta * player.speed;
                }
            }
        }
        return module;
})(ASTEROIDS || {});