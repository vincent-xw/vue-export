# js-xlsx-browers

一个针对js-xlsx的简单封装，原项目大而全不利于新手上手，我主要针对前端直接导出做一简单封装。A simple package for js-xlsx

## 基于XLSX.js的前端ms-excle(xml)文件导出调研

###使用方法

####1.0.0

- 在浏览器头引入依赖文件

```html
<script type="text/javascript" src='../../js/common/shim.js'></script>
<script type="text/javascript" src='../../js/common/xlsx.full.min.js'></script>
<script type="text/javascript" src='../../js/common/FileSaver.js'></script>
<script type="text/javascript" src='../../js/common/jquery.export.js'></script>
```
 
- 利用ajax库（axios）或者fetch库获取数据

略

- 简单处理一下需要导出的数据 

```js
	$("#exportTable").click(function(){
		$(this).jQueryExport({
			fileName:"test",
			obj:test
		});
	});
```
>fileName即导出的文件名，obj即需要导出的数据，格式为数组对象。

###原理介绍

>参考[js-xlsx](https://github.com/SheetJS/js-xlsx)库的Writing Workbooks分类下的Browser save file方法

- 使用浏览器自带blob格式的二进制文件以及一个强制下载客户端来实现此功能。

- 例子使用了FileSaver.js

- [shim.js](https://github.com/es-shims/es5-shim)为对ECMA5标准下的部分原生对象的扩展

###遗留问题与改进项

- 当前不支持多维数组，即只能生成一张表。框架支持多张表，这个后续会补充。暂时的需求也没有多张表

- 可自定义的参数比较少，很多配置项写死

>参考文献

[1].[Blob - Web API 接口 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)

[2].[blob_百度百科](https://baike.baidu.com/item/Blob)

[3].[eligrey/FileSaver.js: An HTML5 saveAs() FileSaver implementation](https://github.com/eligrey/FileSaver.js/)

[4].[SheetJS/js-xlsx: SheetJS Community Edition -- Spreadsheet Parser and Writer](https://github.com/SheetJS/js-xlsx)

[5].[Node读写Excel文件探究实践 | Aotu.io「凹凸实验室」](https://aotu.io/notes/2016/04/07/node-excel/index.html)

