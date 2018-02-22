---
order: 1
title:
  zh-CN: 全局加载组件 
  en-US: Global loading
---

## zh-CN

基础列表。

## en-US

Basic list.

````jsx
import { Loading } from '../../../lib/index';

let loading_props={
    text:'loading...',
    loading:'show'
}

ReactDOM.render(
  <Loading {...loading_props}/>
, mountNode);
````
