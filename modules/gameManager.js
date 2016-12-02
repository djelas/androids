var ASTEROIDS = (function(module){
    var game = module.GameManager = {};
    var isPaused = false;
    var toogled = false;
    var clock = new THREE.Clock();

    //TODO: GameManager implementation, game loop that invokes methods based on state and time delta
    game.loop = function() {
        requestAnimationFrame(game.loop);
        var timedelta = clock.getDelta();
        var buffer = module.Input.getBuffer();
        module.PlayerManager.rotate(timedelta, buffer);
        module.PlayerManager.translate(timedelta);
        if (buffer[4] === 0) {
            toogled = false;
        }
        if (!isPaused) {
            
            if (buffer[4] === 1 && !toogled) {
                toogled = true;
                isPaused = true;
            }
            module.Renderer.render(timedelta);
        } else {
            if (buffer[4] === 1 && !toogled) {
                toogled = true;
                isPaused = false;
            }
            module.Renderer.render(0);
        }
        //TODO: state machine implementation
    }

    return module;
})(ASTEROIDS || {});
