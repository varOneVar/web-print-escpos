<template>
  <div id="app">
    app
     <img id="img" crossorigin="*" src="./baidu.png" />
  </div>
</template>

<script>
import Print, { getImage, getDomImage } from '../lib/index'
import image from './baidu.png'
export default {
  name: 'App',
  async mounted() {
    console.log(image, '??')
    const printer = new Print()
    const img = await getImage(image)
    console.log(printer, 'print', img)
    printer.align('ct')
      .image(img, 's8')
      .then(() => { 
        printer.cut()
        console.log(printer.getBuffer(), 111)
      });
      this.$nextTick(() => {
        const imgssss = document.querySelector('#img')
        const { width ,height } = imgssss.getBoundingClientRect()
        console.log(width ,height)
        const scrw = 200
        let scrh = Math.ceil(height * scrw / width)
        scrh = scrh + 8 - (scrh % 8)
        console.log(scrw ,scrh, 222)
        const zzz = getDomImage(imgssss, scrw, scrh)
        console.log(zzz, 222)
      })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
