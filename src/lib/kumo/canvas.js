(() => {
    'use strict';
    const Canvas = (loc, id, context, width, height) => {
        // initCanvas() {
        const canvas = document.createElement('canvas');
        canvas.id = id || 'CursorLayer';
        canvas.width = width || 800;
        canvas.height = height || 600;
        canvas.style.zIndex = 8;
        canvas.style.position = "absolute";
        canvas.style.border = "1px solid";
        canvas.getContext(context);
        console.log('scene made');
        return document.getElementById(loc).appendChild(canvas);
        // }
    };

if (typeof module != 'undefined') module.exports = { Canvas };
if (typeof module == 'undefined') window.Canvas = { Canvas };
}) ();
