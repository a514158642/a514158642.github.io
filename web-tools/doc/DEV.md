# 开发文档

## 部署开发环境
- 安装node，git
- 克隆仓库 git@github.com:a514158642/csj-web-tools.git
- 在src/index.js中添加新增的工具函数
- 完善[使用文档](USE.md)


## 完善使用文档
- 根据新增的工具函数，在USE.md中补充使用说明。
- 安装gitbook
  ```bash
    npm install gitbook-cli -g
  ```
- 执行 `gitbook init`，这时候可能会卡在“installing gitbook 3.2.3”，切换到淘宝镜像，再执行此命令，慢慢等吧~~~~
- 待初始化完成，执行构建文档命令`gitbook build`，成功后会生成或更新_book下的所有文件，  
若不能执行成功，去C盘用户目录的下 .gitbook\versions\3.2.3\lib\output\website\copyPluginAssets.js ，将文件中所有的confirm改为false。  
再次执行构建命令。
- 克隆官网仓库 git@github.com:a514158642/a514158642.github.io.git
- 将_book下的所有文件，复制粘贴到官网仓库下的web-tools目录下，提交到仓库。