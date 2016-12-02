var ASTEROIDS = (function(module){
    var game = module.GameManager = {};
    var isPaused = false;
    var clock = new THREE.Clock();

    //TODO: GameManager implementation, game loop that invokes methods based on state and time delta
    game.loop = function() {
        requestAnimationFrame(game.loop);
        var timedelta = clock.getDelta();
        if (!isPaused) {
            var buffer = module.Input.getBuffer();
            module.Renderer.render(timedelta);
        } else {
            module.Renderer.render(0);
        }
        //TODO: state machine implementation
    }

    return module;
})(ASTEROIDS || {});
