<template>
  <div class="test">测试组件
    <img :src="img1" alt="">
    <img :src="img2" alt="">
  </div>
</template>

<script>
import logo from '../assets/logo.jpg'
import bg from '../assets/bg.png'
export default {
  data() {
    return {
      img1: logo,
      img2: bg
    }
  }
}
</script>

<style>
.test {
  color: red;
}
.hello {
  color: blue;
}
.test span {
  padding: 50px;
}
</style>
