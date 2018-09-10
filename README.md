## 打造自己的库

### 安装
```
$ npm install my-fault
```
### 使用 my-fault
```
import adam from 'my-fault'
```
### Function
### query=(name, querystring)
* 函数用于获取指定查询字符串中指定名称的值
```
adam.query('name', '?name=js') //return 'js'
```

### serialize=(data)
* 用于将对象转换为url字符串的函数
```
adam.serialize({hello: 'js'}) //return '?hello=js'
```
### $ = (selector)
* 模拟jQuery的功能
```
adam.$(selector) //return {DOM|undefined}
```
### removeNode = (node)
* 删除DOM节点的功能
```
adam.removeNode(node) //return {DOM}
```
### insertAfter = (node, target)
* 用于在目标节点之后插入节点节点的功能
```
adam.insertAfter(node, target) //return true or false
```
### addClass = (node, className)
* 添加类名的功能
```
adam.addClass(node, className) //return true or false
```
### removeClass = (node, className)
* 删除类名的功能
```
adam.removeClass(node, className) //return true or false
```
### getAbsoluteUrl = (url)
* 获取页面的绝对路径
```
adam.getAbsoluteUrl('/hhh') //return 'https://github.com/hhh'
```
### debounce = (callback, time)
* 避免震动的功能

### removeItemByIndex = (index, arr)
* 按索引删除项目的功能
```
adam.removeItemByIndex(0,[1,2,3])  //return [2,3]
```
### arrUique = (arr)
* 数组去重
```
adam.arrUique([1,2,2,3])  // return [1,2,3]
```
### adam.arrMax = (arr)
* 数组中最大项
```
adam.arrMax([1,10,3]) //return 10
```
### isObject = (obj)
* 判断是否为对象
```
adam.isObject('12aaa') // return true or false
```
### stringTime = (str)
* 字符串中每个字符出现的次数
```
adam.stringTime('aaasa') // return {a:4,s:1}
```
### randomNum = (num,start,end)
* 随机产生从start - end的num个随机整数
```
adam.randomNum(10,2,32)  return // 2-32的10个随机整数
```
