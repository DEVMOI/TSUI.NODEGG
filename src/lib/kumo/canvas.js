const canvas = (loc, id, context, width, height) => {
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
module.exports = canvas;