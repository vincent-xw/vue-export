export default{
	xlsxExport: function (data) {
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

        for (let a in exportData){
            if (exportData[a] instanceof Object){
                for (let index = 0; index < data.header.key.length; index++) {
                    if (exportData[a].v == data.header.value[index]){
                            exportData[a].v = data.header.key[index];
                        }
                }
            }
            
        }

        // 构建 workbook 对象
        var wb = {
            SheetNames: ['Sheet1'],
            Sheets: {
                'Sheet1': Object.assign({}, exportData, data.merge , merge)
            }
        };
        // 导出 Excel
        
        // var wbout = this.$xlsx.write(wb, wopts);
        // var wb = this.$xlsx.utils.json_to_sheet(data.obj,data.header.value);
        var wbout = this.$xlsxStyle.write(wb,{ bookType: 'xlsx', type: 'binary' });

        function s2ab(s) {
            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);
            for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        }
        var fileName = data.fileName || (new Date()).getTime();
        fileName += ".xlsx";

        this.$fileSaver.saveAs(new Blob([s2ab(wbout)], { type: "" }), fileName);

        
    }
}