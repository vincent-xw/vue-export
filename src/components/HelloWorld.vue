<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <code>
      let exportDate = this.$xlsx.utils.json_to_sheet(data.obj, {header:data.header.value});
    </code>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '欢迎使用js-export demo（vue版）'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
