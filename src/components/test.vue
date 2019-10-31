<template>
  <div class="test">测试组件
    <!-- <img :src="img1" alt="">
    <img :src="img2" alt=""> -->
    <div class="item">
      <div class="a">aaa</div>
      <div class="b">bbb<span>A</span></div>
    </div>
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
.test .item {
  display: flex;
  /* width: 100%; */
  height: 100px;
  background: #00f;
}
.a {
  flex: 1;
  border: 1px solid #000;
  min-width: 200px;
}
.b {
  flex: 1;
  border: 1px solid red;
  position: relative;
}
.b span {
  position: absolute;
  right: 10px;
  top: 5px;
  color: red;
  cursor: pointer;
  border: 1px solid red;
  transition: all 1s;
  transform-origin: center;
}
.b span:hover {
  /* transform: rotate3d(0, 0, 1, 90deg); */
  transform: rotateZ(90deg);
}
.unuse {
  color: #000;
}
</style>
