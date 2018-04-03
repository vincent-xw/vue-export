# vue-export

> 这个仓库是基于[SheetJS/js-xlsx](https://github.com/SheetJS/js-xlsx)与[protobi/js-xlsx](https://github.com/protobi/js-xlsx)的使用示例

## 使用方法

>安装依赖

	npm install file-saver --save
	npm install xlsx --save

注：需要升级node版本至lts,否则npm版本过旧会安装莫名其妙的旧版file-saver影响导出功能。

### 基础用法

```js
// 生成数据
let exportData = this.$xlsx.utils.json_to_sheet(data.obj, {header:data.header.value});
// 构建 workbook 对象
var wb = {
    SheetNames: ['Sheet1'],
    Sheets: {
        'Sheet1': Object.assign({}, exportDate, data.merge , merge)
    }
};
var wbout = this.$xlsx.write(wb,{ bookType: 'xlsx', type: 'binary' });
function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}
var fileName = data.fileName + ".xlsx" || (new Date()).getTime() + ".xlsx";
this.$fileSaver.saveAs(new Blob([s2ab(wbout)], { type: "" }), fileName);
```
其中，main.js文件中的配置

```js
	import fileSaver from 'file-saver'
	import xlsx from 'xlsx'

	Vue.prototype.$xlsx = xlsx;
	Vue.prototype.$fileSaver = fileSaver;
	Vue.prototype.$export = globalconf.xlsxExport;
```

接着就可以使用``this.$xlsx.export(obj);``来实现导出功能

### 扩展功能——表格添加表头

>当使用``XLSX.utils.json_to_sheet()``的时候，没法通过构造带有表头的数据。而官方提供``XLSX.utils.sheet_add_json()``只可以添加在当前表格中的指定位置开始添加，但是如果原始表格存在数据则会覆盖原始数据。

官方是提供了手动生成表格数据的教程的，遇到这个情况我们完全可以自己构造方法来生成带有表头数据的表格数据，不过从一切犯懒的前提下，查询官方issue的提问找到了一个比较完美的解决方案

```js
// 生成数据
let heading = [];
if(data.tableTitle){
    heading.push([data.tableTitle]);
    heading.push(data.header.value);
}else{
    heading.push(data.header.value);
}
let exportData = this.$xlsx.utils.json_to_sheet(heading, { skipHeader: true});
this.$xlsx.utils.sheet_add_json(exportData, data.obj, {
    header: data.header.value,
    skipHeader: true,
    origin: heading.length
});
```

思路即是先生成表头数据，然后通过``XLSX.utils.sheet_add_json()``来添加数据。

添加了表头是一般都是需要将A1:B1的单元格进行合并，合并至当前表格最宽的位置。所以这里引入合并单元格的方式

```js
// 判定merge
let merge = {
    "!merges":[]
};
if(data.merge){
    merge["!merges"] = merge["!merges"].concat(data.merge)
}

// 判定表头合并：如果存在表头就合并
if (heading.length > 1){
    merge["!merges"] = merge["!merges"].concat([{
        s:{
            r:0,
            c:0
        },
        e:{
            r:0,
            c:heading[1].length-1
        }
    }])
}
```

### 样式引入

[SheetJS/js-xlsx](https://github.com/SheetJS/js-xlsx)库是不支持样式的添加，所以有朋友fork了库做了更新以支持导出的文件带样式。但是实践需要做出一些配置，首先看代码样式的添加

```js
for (let a in exportData) {
    if (exportData[a] instanceof Object) {
        exportData[a].s = { 
            alignment: {
                vertical: "center",
                horizontal: "center",
                indent: 0,
                wrapText: true
            },
            font: {
                name: 'Times New Roman',
                sz: 16,
                color: { rgb: "#FF000000" },
                bold: false,
                italic: false,
                underline: false
            }
         }
    }
}
```
demo是针对所有的单元格进行了同样的样式进行设置。针对性设置可以根据自己需求进行设置

#### 针对配置

[protobi/js-xlsx](https://github.com/protobi/js-xlsx)通过npm安装以后会直接反馈module not found 错误。这个时候可以配置webpack进行适配。并且，[protobi/js-xlsx](https://github.com/protobi/js-xlsx)的json_to_sheet方法not defined不知道为何，所以这块的引入也要单独做适配。

具体需要做的是：

- 修改webpack配置,屏蔽掉对应module的报错，事实上纯前端导出不需要fs库。导入未知

```js
	module.exports = {
	    // (...)
	    plugins: [
	        // (...)
	        new webpack.IgnorePlugin(/cptable/)
	    ],
	    node: {
	        fs: "empty"
	    },
	    externals: [
	        {  "./cptable": "var cptable",  "./jszip": "jszip" }
	    ]
	};
```

- 针对性引入``xlsx``和``xlsx-style``

	npm install xlsx-style --save

```js
import xlsxStyle from 'xlsx-style'

Vue.prototype.$xlsx = xlsx;
Vue.prototype.$xlsxStyle = xlsxStyle;

//修改配置文件里面
var wbout = this.$xlsxStyle.write(wb,{ bookType: 'xlsx', type: 'binary' });
```
至此。本次前端导出的调研到此，做自我总结的同时希望能帮到你