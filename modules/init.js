var ASTEROIDS = (function(module){
    var model = module.Model = {};
    module.loader = new THREE.OBJLoader();
    module.getRandom = function(min, max) {
        return Math.random() * (max - min) + min;
    }
    module.init = function() {
        module.AsteroidManager.init();
        model.asteroids = module.AsteroidManager.generate(10, 100);
        model.player = module.PlayerManager.create();
        module.Renderer.init();
        module.GameManager.loop();
        // module.TimeSync.init(module.GameManager);
    }

    return module;
})(ASTEROIDS || {});
