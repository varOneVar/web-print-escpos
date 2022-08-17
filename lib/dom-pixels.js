const ndarray = require('ndarray')

export default function defaultImage(img, w, h) {
    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    const context = canvas.getContext('2d')
    context.drawImage(img, 0, 0, w, h)
    const pixels = context.getImageData(0, 0, w, h)
    return ndarray(new Uint8Array(pixels.data), [w, h, 4], [4, 4*w, 1], 0)
}

