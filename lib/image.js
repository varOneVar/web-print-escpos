'use strict';
import getPixels from "./url-pixels.js";
import defaultImage from './dom-pixels.js'

/**
 * [Image description]
 * @param {[type]} pixels [description]
 */



export class PrintImage {
    pixels;
    data = [];
 
   constructor(pixels) {
     this.pixels = pixels;
 
     const rgbaData = [];
 
     for (let i = 0; i < this.pixels.data.length; i += this.size.colors) {
       rgbaData.push(
         new Array(this.size.colors).fill(0).map((_, b) => this.pixels.data[i + b])
       );
     }
 
     this.data = rgbaData.map(
       ([r, g, b, a]) => a != 0 && r > 200 && g > 200 && b > 200,
     );
   }
 
   get size() {
     return {
       width : this.pixels.shape[0],
       height: this.pixels.shape[1],
       colors: this.pixels.shape[2],
     };
   }
 
   /**
    * [toBitmap description]
    * @param  {[type]} density [description]
    * @return {[type]}         [description]
    */
   toBitmap(density = 24) {
     const result = [];
     let x, y, b, l, i;
     const c = density / 8;
 
     // n blocks of lines
     let n = Math.ceil(this.size.height / density);
 
     for (y = 0; y < n; y++) {
       // line data
       const ld = result[y] = [];
 
       for (x = 0; x < this.size.width; x++) {
         for (b = 0; b < density; b++) {
           i = x * c + (b >> 3);
 
           if (ld[i] === undefined) ld[i] = 0;
 
           l = y * density + b;
           if (l < this.size.height) {
             if (this.data[l * this.size.width + x]) {
               ld[i] += (0x80 >> (b & 0x7));
             }
           }
         }
       }
     }
 
     return {
       data: result,
       density: density
     };
   }
 
   /**
    * [toRaster description]
    * @return {[type]} [description]
    */
   toRaster() {
     const result = [];
     const {width, height} = this.size;
 
     // n blocks of lines
     const n = Math.ceil(width / 8);
 
     for (let y = 0; y < height; y++) {
       for (let x = 0; x < n; x++) {
         for (let b = 0; b < 8; b++) {
           const i = x * 8 + b;
 
           if (result[y * n + x] === undefined) {
             result[y * n + x] = 0;
           }
 
           const c = x * 8 + b;
           if (c < width) {
             if (this.data[y * width + i]) {
               result[y * n + x] += (0x80 >> (b & 0x7));
             }
           }
         }
       }
     }
     return {
       data: result,
       width: n,
       height: height
     };
   }
 }
 

function imgPixels(url, type) {
    return new Promise((resolve, reject) => {
        getPixels(url, type, (error, pixels) => {
          if (error) reject(error);
          else resolve(new PrintImage(pixels));
        });
      })
}
export function domImgPixels(dom, width, height) {
  return new PrintImage(defaultImage(dom, width, height))
}

export default imgPixels