
## 一些知识点

只有以 VITE_ 开头的变量会被嵌入到客户端侧的包中，你可以在项目代码中这样访问它们：
console.log(import.meta.env.VITE_PROT);
以 VITE_GLOB_* 开头的的变量，在打包的时候，会被加入_app.config.js配置文件当中.


