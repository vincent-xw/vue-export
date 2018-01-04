(function($,XLSX){
	function Export(){};
	Export.prototype={
		getHeaders:function(data){
			var r = [];
			for(a in data[0]){
				r.push(a);
			}
			return r;
		},
		getHeader : function(_headers) {
			var header = _headers.map(function(v, i) {
				return Object.assign({}, {v: v, position: String.fromCharCode(65+i) + 1 })
			}).reduce(function(prev, next) { 
				return Object.assign({}, prev, {[next.position]: {v: next.v}})
			}, {});
			return header;
		},
		getData:function(_data,_headers){
			var data = _data.map(function(v, i) { 
				return _headers.map(function(k, j) { 
					return Object.assign({}, { v: v[k], position: String.fromCharCode(65+j) + (i+2) })
				})
			})
			.reduce(function(prev, next) { 
				return prev.concat(next);
			})
			.reduce(function(prev, next) { 
				return Object.assign({}, prev, {[next.position]: {v: next.v}})},{}
			);
         	return data;
		}
	};
	$.fn.jQueryExport = function(data){
		var _headers = [],_data = data.obj,header = {},datas = {};
		var jexport = new Export();
		_headers = jexport.getHeaders(data.obj);
		header = jexport.getHeader(_headers);
		datas = jexport.getData(_data,_headers);

		var output = Object.assign({}, header, datas);

		var outputPos = Object.keys(output);

		// 计算出范围
		var ref = outputPos[0] + ':' + outputPos[outputPos.length - 1];
		// 构建 workbook 对象
		var wb = {
		    SheetNames: ['Sheet1'],
		    Sheets: {
		        'Sheet1': Object.assign({}, output, { '!ref': ref })
		    }
		};
		// 导出 Excel
		var wopts = { bookType:'xlsx', bookSST:false, type:'binary' };
		var wbout = XLSX.write(wb,wopts);
		function s2ab(s) {
		  var buf = new ArrayBuffer(s.length);
		  var view = new Uint8Array(buf);
		  for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
		  return buf;
		}
		var fileName = data.fileName+".xlsx" || (new Date()).getTime()+".xlsx";

		saveAs(new Blob([s2ab(wbout)],{type:""}), fileName)
	};
})(jQuery,XLSX);