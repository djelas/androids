var ASTEROIDS = (function(module){
    var model = module.Model = {};
    module.getRandom = function(min, max) {
        return Math.random() * (max - min) + min;
    }
    module.init = function() {
        model.asteroids = module.AsteroidManager.generate(0, 100);
        model.player = module.PlayerManager.create();
        module.Renderer.init();
        module.GameManager.loop();
        // module.TimeSync.init(module.GameManager);
    }

    return module;
})(ASTEROIDS || {});
