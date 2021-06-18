# NekoToDo

Native js implements ToDo Lists —— Neko

## Welcome to 【电脑端：[Neko Todo](http://mjx.ink)】 or 【移动端：[Neko Todo Mobile](http://todo.mjx.ink)】

### 项目介绍

### 项目结构

### 各模块功能点介绍

- #### 基本功能
  - 新增 Todo
  - 删除 Todo
  - 展现列表
  - 全部取消完成 (All Todo)【对于当前过滤块的内容】
  - 全部完成(All Done)【对于当前过滤块的内容】
  - 删除全部已完成(Delete All Done)【对于当前过滤块的内容】
  - localStorage 保存页面状态，在不清除浏览器数据的情况下保存数据，刷新页面可恢复
- #### 高级功能
  - 过滤列表，伪 Tab 块的实现
  - 编辑单条 Todo 内容
- #### 额外功能
  - **星标**(对 Todo 进行收藏)，并可以进行星标过滤
  - **全部删除**(Delete All)【对于当前过滤块的内容】
  - **搜索 Todo**(对 Todo 根据内容进行搜索)，并可**根据过滤 Tab 来筛选搜索内容**
  - **显示 Todo,Done,Star 的总记录数**【对于 Add Todo 显示不受过滤 Tab 影响，对于 Search Todo 根据过滤 Tab 进行实时更新】
  - 对编辑后的 Todo 内容，进行前端友好提示【<span style="color:red">_New !_</span>】，该提示会在最新修改完成 6h 后自动消失
  - 记录 Todo 最新的更新时间，初始时间为添加时间

### HTML 设计

- `index.html`

### CSS 设计

- `main.css`
  主要部分的 css，网页整体的 css 设计，进行响应式支持
- `modal.css`
  模态框整体的 css,进行渐变色与动画设计，进行响应式支持
- `preload.css`
  预加载样式的 css，主要进行预加载动画设计
- `popbtn.css`
  悬浮弹出按钮的 css，主要进行弹出动画设计

### JS 设计

- `localStore.js`
  主要进行 localStorage 的初始化，更新与写入操作，用于前端的数据持久化操作
- `modal.js`
  主要进行模态框开启，关闭，修改保存的逻辑实现，并且实现了空白处（模态框外）点击关闭的效果，并且进行了模态框输入框的内容非空判断
- `preload.js`
  主要进行预加载的控制实现，但页面加载完毕后短暂延迟关闭遮罩层
- `star_bg.js`
  主要进行背景星星的生成与位移控制
- `toastr.js`
  主要进行悬浮提示框的生成
- `todo_main.js`
  Todo 的核心逻辑 JS
- `tool.js`
  工具辅助 JS，为适应本人使用习惯，模仿 Jquery 风格进行部分简化表达

### 参考源码

- #### `vendor/fontawsome-5.13.3/` 参考 100%
  来源：https://fontawesome.com/v5.15/how-to-use/on-the-web/setup/getting-started
- #### `toastr.js` 参考 80%
  来源：https://github.com/mehmetemineker/vanilla-toast
- #### `modal.css` 参考 20%

  来源:https://blog.csdn.net/zl_best/article/details/62423802

- #### `star_bg.js` 参考 20%

  来源：https://www.jq22.com/jquery-info22256

- #### `popbtn.js` 参考 10%
  来源：http://www.dmaku.com/jquery-1273.html
