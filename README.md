## 安装

```js
npm install vue-flow-loader --save-dev

```

## 配置
### vue-loader 配置

```js
...
preLoaders:{
    js:'vue-flow-loader'
}
...
```

### .flowconfig 
添加
```txt
[options]
module.file_ext=.vue
```