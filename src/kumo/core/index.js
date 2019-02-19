let iniCanvas;
export const initCanvas = (loc, id, context, width, height) => {
    const canvas = document.createElement('canvas');
    canvas.id = id || 'CursorLayer';
    canvas.width = width || 800;
    canvas.height = height || 600;
    canvas.style.zIndex = 8;
    canvas.style.position = "absolute";
    canvas.style.border = "1px solid";
    canvas.getContext(context);
    document.getElementById(loc).appendChild(canvas);
    return {
    };
};