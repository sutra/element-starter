<template>
  <div id="app">
    <img src="./assets/logo.png" alt="Logo">
    <div>
      <div class="long-string" aria-hidden="true">
        This is a very long inline string intended to push the following select to the right side of the screen.
        This is a very long inline string intended to push the following select to the right side of the screen.
        This is a very long inline string intended to push the following select to the right side of the screen.
        This is a very long inline string intended to push the following select to the right side of the screen.
      </div>
      <el-select v-model="value" placeholder="Select">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button @click="startHacking">Start</el-button>
    </div>

    el-form + el-row + el-col + el-form-item + el-select + el-option
    <div style="text-align: left; border: 1px solid #ccc; padding: 10px; margin-top: 20px;">
      <el-form :inline="false">
        <el-row>
          <el-col :span="8" style="border: 1px solid red;">111
          </el-col>
          <el-col :span="8" style="border: 1px solid green;">222
          </el-col>
          <el-col :span="8" style="border: 1px solid blue;">
            <el-form-item style="border: 1px solid yellow;">
              <appendable-select v-model="value" placeholder="请选择" :popper-append-to-body="false">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </appendable-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    el-row + el-col + el-select + el-option
    <div style="text-align: left; border: 1px solid #ccc; padding: 10px; margin-top: 20px;">
      <el-row>
        <el-col :span="8" style="border: 1px solid red;">111
        </el-col>
        <el-col :span="8" style="border: 1px solid green;">222
        </el-col>
        <el-col :span="8" style="border: 1px solid blue;">
          <el-select v-model="value" placeholder="请选择" :popper-append-to-body="false">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
    </div>

    el-form + el-form-item + el-select + el-option
    <el-form :inline="true">
      <el-form-item style="border: 1px solid red;">
        This is a very long inline string intended to push the following select to the right side of the screen.
      </el-form-item>
      <el-form-item style="border: 1px solid green;">
        This is a very long inline string intended to push the following select to the right side of the screen.
      </el-form-item>
      <el-form-item style="border: 1px solid yellow; position: static;">
        <appendable-select
          v-model="value"
          placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </appendable-select>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      value: '',
      options: [
        {
          value: 'option1',
          label:
            'This is an extremely long option label intended to exceed any typical screen width. ' +
            'This is an extremely long option label intended to exceed any typical screen width. ' +
            // 'This is an extremely long option label intended to exceed any typical screen width. ' +
            'This is an extremely long option label intended to exceed any typical screen width.'
        },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' }
      ]
    }
  },
  /*
  mounted() {
    this._onScroll = () => {
      if (this.$refs.mySelect && this.$refs.mySelect.updatePopper) {
        this.$refs.mySelect.updatePopper(); // Element UI 的 select 暴露此方法
      }
    };
    window.addEventListener('scroll', this._onScroll, true); // use capture to catch inner scrolls
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this._onScroll, true);
  },
  */
  methods: {
    startHacking () {
      this.$notify({
        title: 'It works!',
        type: 'success',
        message: 'We\'ve laid the ground work for you. It\'s time for you to build something epic!',
        duration: 5000
      })
    }
  }
}
</script>

<style>
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}
.long-string {
  display: inline-block;
  /* white-space: nowrap; */
  overflow: visible;
}

/*
.el-select-dropdown__item {
  height: auto;
  white-space: normal;
  word-break: break-word;
  line-height: 1.5;
  padding: 8px 20px;
}
*/

/*
.el-form-item__content {
  position: static;
}
*/
</style>
