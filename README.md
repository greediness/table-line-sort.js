# table-line-sort.js
A jQuery based easy plugin for table line sort （一个基于jQuery的简单的表格行排序插件）


--------------

	var sortplugin = new tableSort();

pass a `<table>` selector in the create method. Set `class='sort'` targ in each line.<br>
在 create 方法里传入`<table>`的选择器。每行需要一个`class = 'sort'`的元素

	sortplugin.create('#table');

you can get the line number of your last operation before its move (start with 0), and how much lines its moved (if its move up 1 line, return 1, and return -n when its move down).<br>
你可以获取最后操作的一行更改前的行号（第一行为0），以及它移动了多少行（向上移动则得到正数）

	sortplugin.onSort(function(id,n){
		console.log({
			"id":index,
			"n":n
		})
	})