var ASTEROIDS = (function (module) {
    var input = module.Input = {};

    var buffer = [0, 0, 0, 0, 0, 0, 0];

    input.changeKey = function (which, to) {
        switch (which) {
            // left
            case 'ArrowLeft':
            case 'a':
                buffer[0] = to;
                break;

            // up
            case 'ArrowUp':
            case 'w':
                buffer[1] = to;
                break;

            // right
            case 'ArrowRight':
            case 'd':
                buffer[2] = to;
                break;

            // down
            case 'ArrowDown':
            case 's':
                buffer[3] = to;
                break;

            // space bar / pause
            case 'p':
            case ' ':
            case 'Spacebar':
                buffer[4] = to;
                break;

            // Esc / stop
            case 'Escape':
                buffer[5] = to;
                break;

            // Start / restart
            case 'Enter':
                buffer[6] = to;
                break;
        }
    };

    //TODO: attach handlers for keyboard events and populate buffer
    document.addEventListener('keydown', function (e) {
        input.changeKey(e.key, 1)
    });

    document.addEventListener('keyup', function (e) {
        input.changeKey(e.key, 0)
    });

    input.getBuffer = function () {
        return buffer;
    };

    return module;
})(ASTEROIDS || {});