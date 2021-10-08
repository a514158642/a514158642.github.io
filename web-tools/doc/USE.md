# 使用文档

## 引入csj-web-tools
- node环境 或 自动化工程
```javascript
import tools from 'csj-web-tools'
```
- windows环境 或 浏览器环境
```javascript
<script type="module">
      import tools from "https://unpkg.com/csj-web-tools/src/index.js"
</script>
```  

## API

> ### sleep(ms) 


  &nbsp;&nbsp;&nbsp;&nbsp;n秒后执行  
  
  ###### 参数
  - ms 
    执行程序延迟毫秒数。默认值为0。

  
  ###### 返回值
  - null  


  ###### 示例
  ```javascript  
    // 200毫秒后，打印hello world
    tools.sleep(200).then(res=>{
      console.log("hello world")
    })
  ```

> ### getLocal(key) 
  
  
  &nbsp;&nbsp;&nbsp;&nbsp;获取localStorage的数据对象,传key时获取指定字段的值，不传key时返回整个数据对象。

  ###### 参数
  - key 
    默认值为null；非必传；指定要从localStorage数据对象中获取的字段。

  
  ###### 返回值
  - Object
  localStorage数据对象或指定字段的值。


  ###### 示例
  ```javascript
    // 获取整个localStorage存储的数据对象  
    // 注意这里的“整个”是指通过本工具类存入localStorage的数据，而非浏览器localStorage自身所有的数据
    // 假设已存储  {name:"benboerba"}
    tools.getLocal() //返回 {name:"benboerba"}
    tools.getLocal("name") // 返回 benboerba
  ```

> ### setLocal(obj) 
  
  
  &nbsp;&nbsp;&nbsp;&nbsp;存储localStorage的数据对象，并与已经存储的数据进行合并覆盖

  ###### 参数
  - obj 
    默认值为{}；必传；要存储到localStorage中的数据对象。


  ###### 返回值
  - null


  ###### 示例
  ```javascript  
    // 存储数据到localStorage中，会与已存储的进行合并覆盖
    //假设已存储  {name:"benboerba",age:12}
    
    tools.setLocal({
      name:"baboerben",
      sex:"男"
    })

    tools.getLocal() // 返回 {name:"baboerben",age:12,sex:"男"}
  ```


> ### clearLocal(key) 


  &nbsp;&nbsp;&nbsp;&nbsp;删除localStorage的数据对象，不传key时删除整个对象，传key时删除指定字段

  ###### 参数
  - key 
    默认值为null；非必传；要从localStorage中删除的字段。


  ###### 返回值
  - null


  ###### 示例
  ```javascript
    //假设已存储  {name:"baboerben",age:12,sex:"男"}
    
    tools.clearLocal("age")
    tools.getLocal() // 返回 {name:"baboerben",sex:"男"}

    tools.clearLocal()
    tools.getLocal() // 返回 {}
  ```


> ### getSession(key) 


  &nbsp;&nbsp;&nbsp;&nbsp;获取sessionStorage的数据对象,传key时获取指定字段的值，不传key时返回整个数据对象

  ###### 参数
  - key 
    默认值为null；非必传；指定要从sessionStorage数据对象中获取的字段。


  ###### 返回值
  - Object
  sessionStorage数据对象或指定字段的值。


  ###### 示例
  ```javascript
    // 获取整个sessionStorage存储的数据对象  
    //注意这里的“整个”是指通过本工具类存入sessionStorage的数据，而非浏览器sessionStorage自身所有的数据

    //假设已存储  {name:"benboerba"}

    tools.getSession() //返回 {name:"benboerba"}

    tools.getSession("name") // 返回 benboerba
  ```


> ### setSession(obj) 


  &nbsp;&nbsp;&nbsp;&nbsp;存储sessionStorage的数据对象，并与已经存储的数据进行合并覆盖

  ###### 参数
  - obj 
    默认值为{}；必传；要存储到sessionStorage中的数据对象。


  ###### 返回值
  - null


  ###### 示例
  ```javascript
    // 存储数据到sessionStorage中，会与已存储的进行合并覆盖
    //假设已存储  {name:"benboerba",age:12}
    
    tools.setSession({
      name:"baboerben",
      sex:"男"
    })

    tools.getSession() // 返回 {name:"baboerben",age:12,sex:"男"}
  ```

> ### clearSession(key) 


  &nbsp;&nbsp;&nbsp;&nbsp;删除sessionStorage的数据对象，不传key时删除整个对象，传key时删除指定字段


  ###### 参数
  - key 
    默认值为null；非必传；要从sessionStorage中删除的字段。


  ###### 返回值
  - null


  ###### 示例
  ```javascript
    //假设已存储  {name:"baboerben",age:12,sex:"男"}
    
    tools.clearSession("age")
    tools.getSession() // 返回 {name:"baboerben",sex:"男"}

    tools.clearSession()
    tools.getSession() // 返回 {}
  ```

> ### getObjectType(obj) 


  &nbsp;&nbsp;&nbsp;&nbsp;获取obj的类型


  ###### 参数
  - obj 
    默认值为null；必传；要获取类型的目标对象。


  ###### 返回值
  - String
  参数obj的类型字符串


  ###### 示例
  ```javascript
    tools.getObjectType({}) // 返回 Object
    tools.getObjectType('sdf') // 返回 String
  ```


> ### deepCompare(source, target, config = {}) 


  &nbsp;&nbsp;&nbsp;&nbsp;深比较两个对象,适用于表单对象的比较<font color=red>（目前最多支持嵌套两层对象的比较,待完善）</font>


  ###### 参数
  - source 
    默认值为null；必传；源对象。
  - target 
    默认值为null；必传；目标对象。
  - config 
    默认值为{}；非必传；配置参数。
    - compareKeys  
      默认值为[]；指定要比较的字段。
    - isIgnoreSort  
      默认值为true；比较数组时是否忽略排序。

      
  ###### 返回值
  - Boolean
  true || false


  ###### 示例
  ```javascript
    let a={
      name:'benboerba',
      age:12
    }

    let b={
      name:'baboerben',
      age:12
    }

    let c={
      age:12,
      name:'benboerba'
    }

    let d=[1,2,3]
    
    let e=[3,2,1]

    tools.deepCompare(a,b) // 返回 false
    tools.deepCompare(a,c) // 返回 true
    tools.deepCompare(a,b,{compareKeys:['age']}) // 返回 true
    tools.deepCompare(d,e,{isIgnoreSort:false}) // 返回 false
    tools.deepCompare(d,e,{isIgnoreSort:true}) // 返回 true
  ```

> ### parseDate(date) 


  &nbsp;&nbsp;&nbsp;&nbsp;转换日期格式,不传date时，基于当前时间转换<font color=red>（目前仅支持输出YYYY-MM-DD hh:mm:ss，功能待丰富）</font>


  ###### 参数
  - date 
    默认值为null；非必传；时间字符串或毫秒。


  ###### 返回值
  - String
  YYYY-MM-DD hh:mm:ss 


  ###### 示例
  ```javascript
    tools.parseDate(6156481580000) // 返回 2021-12-21 14:45:00
    tools.parseDate('2010-10-23') // 返回 2010-10-23 00:00:00
    tools.parseDate() // 返回 2021-09-30 16:48:35
  ```

> ### getUrlParams() 


  &nbsp;&nbsp;&nbsp;&nbsp;将当前url参数转换为json对象


  ###### 参数
  - null


  ###### 返回值
  - Object
  转换后的参数对象


  ###### 示例
  ```javascript
    //假设当前url地址为 www.baidu.com?name=benboerba&age=12&sex=男
    getUrlParams() // 返回 {name:"benboerba",age:12,sex:"男"}
  ```