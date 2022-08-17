<template>
  <div id="app">
    app
  </div>
</template>

<script>
import Print, { getImage } from '../lib/index'
import image from './baidu.png'
export default {
  name: 'App',
  async created() {
    console.log(image, '??')
    const printer = new Print()
    const img = await getImage(image)
    console.log(printer, 'print', img)
    printer.align('ct')
       .image(img, 's8')
       .then(() => { 
          printer.cut()
       });
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
