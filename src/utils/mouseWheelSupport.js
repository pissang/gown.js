var handlers = {};
/**
 * XXX: replace with MouseWheelManager (see InteractionManager / KeyboardManager)
 * TODO: make it work with PIXI (this is just copied from createjs_ui / WIP)
 * (e.g. get currently selected object using this.stage.interactionManager.hitTest(this, e)
 * and then execute an "onwheel"-callback)
 *
 * enable or disable mouse wheel support for canvas (e.g. for scroller)
 * using HTML 5 scrolling. will do nothing if it is already activated/
 * deactivated
 * based on http://www.sitepoint.com/html5-javascript-mouse-wheel/
 * @param stage the PIXI-stage
 * @param enable true to enable mouse support, false to disable,
 */
function mouseWheelSupport(stage, enable) {
    var canvas = stage.canvas;
    if (enable || enable === undefined) {
        if (handlers._mouseWheelHandler !== undefined) {
            return;
        }
        handlers._mouseWheelHandler = function(event) {
            event = window.event || event;
            var delta = Math.max(-1, Math.min(1,
                (event.wheelDelta || -event.detail)));

            var target = stage.getObjectsUnderPoint(stage.mouseX, stage.mouseY, 1);
            if (!target) {
                return;
            }
            for(var i = 0; i < target.length; i++) {
                var t = target[i];
                t.mouseMove(delta);
                /*
                var evt = new createjs.MouseEvent(
                    "mousewheel", true, false,
                    t.x, t.y, event, -1, true, t.rawX, t.rawY);
                evt.delta = delta;
                t.dispatchEvent(evt);
                */
            }
        };
        if (canvas.addEventListener) {
            canvas.addEventListener('mousewheel',
                handlers._mouseWheelHandler, false);
            canvas.addEventListener('DOMMouseScroll',
                handlers._mouseWheelHandler, false);
        } else if (canvas.attachEvent) {
            canvas.attachEvent('onmousewheel',
                handlers._mouseWheelHandler);
        }
    } else {
        if (handlers._mouseWheelHandler === undefined) {
            return;
        }
        if (canvas.removeEventListener) {
            canvas.removeEventListener('mousewheel',
                handlers._mouseWheelHandler);
            canvas.removeEventListener('DOMMouseScroll',
                handlers._mouseWheelHandler);
        } else if (canvas.detachEvent) {
            canvas.detachEvent('onmousewheel',
                handlers._mouseWheelHandler);
        }
        handlers._mouseWheelHandler = undefined;
    }
}

module.exports = mouseWheelSupport;
