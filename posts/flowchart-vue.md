---
title: '基于 Vue.js 的流程设计器 Flowchart Vue'
date: '2022-01-02 23:30:13'
tags:
- Vue.js
---
用 [D3.js](https://d3js.org/) 的几个基础 API 实现的流程设计器，基础的拖动、选择器其实用原生的 JavaScript 就可以实现，有点杀鸡用牛刀的感觉，而且依赖不是那么纯净：

```
"dependencies": {
    "d3": "^5.15.0",
    "vue": "^2.5.22",
    "vue-i18n": "^8.17.1"
}
```

但还是禁不住手痒。

### GitHub

[https://github.com/joyceworks/flowchart-vue](https://github.com/joyceworks/flowchart-vue)

### 效果图

{% asset_img image.png 图片 %}

### 使用方式

```shell script
yarn add flowchart-vue
```

```vue
<template>
    <div id="app">
        <button type="button" @click="$refs.chart.add(10, 10)">
            添加
        </button>
        <button type="button" @click="$refs.chart.remove()">
            删除
        </button>
        <button type="button" @click="$refs.chart.editCurrent()">
            编辑
        </button>
        <button type="button" @click="$refs.chart.save()">
            保存
        </button>
        <flowchart :nodes="nodes" :connections="connections" @editnode="handleEditNode"
                    @editconnection="handleEditConnection" @save="handleChartSave" ref="chart">
        </flowchart>
    </div>
</template>
<script>
  import Vue from 'vue';
  import FlowChart from 'flowchart-vue';

  Vue.use(FlowChart);

  export default {
    name: 'App',
    data: function() {
      return {
        nodes: [
          {id: 1, x: 140, y: 270, name: 'Start', type: 'start'},
          {id: 2, x: 540, y: 270, name: 'End', type: 'end'},
        ],
        connections: [
          {
            source: {id: 1, position: 'right'},
            destination: {id: 2, position: 'left'},
            id: 1,
            type: 'pass',
          },
        ],
      };
    },
    methods: {
      handleChartSave(nodes, connections) {
        // axios.post(url, {nodes, connections}).then(resp => {
        //   this.nodes = resp.data.nodes;
        //   this.connections = resp.data.connections;
        //   // 流程图会随着this.nodes, this.connections 值发生改变自动刷新
        // });
      },
      handleEditNode(node) {
      },
      handleEditConnection(connection) {
      },
    }
  };
</script>
```

更多代码请参考 [src/views/App.vue](https://github.com/joyceworks/flowchart-vue/blob/master/src/views/App.vue).

### Demo

- [GitHub Pages](https://joyceworks.github.io/flowchart-vue/)

- 开发环境

  ``` shell
  git clone https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/27/171b90a3278a4f18.git~tplv-t2oaga2asx-image.image
  cd flowchart-vue
  yarn install
  yarn run serve
  ```
  
  在浏览器打开`http://localhost:端口号/`。

### API

见 [Wiki](https://github.com/joyceworks/flowchart-vue/wiki).
