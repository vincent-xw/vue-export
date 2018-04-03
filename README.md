# vue-export

> 这个仓库是基于[SheetJS/js-xlsx](https://github.com/SheetJS/js-xlsx)与[protobi/js-xlsx](https://github.com/protobi/js-xlsx)的使用示例

## 使用方法

>安装依赖

	npm install file-saver --save
	npm install xlsx --save

注：需要升级node版本至lts,否则npm版本过旧会安装莫名其妙的旧版file-saver影响导出功能。

1. 基础用法

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

其中，main.js文件中的配置

		import fileSaver from 'file-saver'
		import xlsx from 'xlsx'

		Vue.prototype.$xlsx = xlsx;
		Vue.prototype.$fileSaver = fileSaver;
		Vue.prototype.$export = globalconf.xlsxExport;
		
接着就可以使用``this.$xlsx.export(obj);``来实现导出功能






