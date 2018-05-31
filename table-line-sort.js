function TableSort() {
	this.tb = undefined;
	this.tbody = undefined;
	this.sortlist = undefined;
	this.pickup = function(e, itemid) {
		let ths = this;
		let item = this.sortlist[itemid];
		let tr = $(item).parents("tr");
		let tbody = ths.tbody;
		let height = $(tr).height();
		let width = $(tr).width();
		let mouseX = e.pageX;
		let mouseY = e.pageY;
		tr.remove();
		let intable = $("<table class='table table-bordered table-hover'></table>");
		let intbody = $("<tbody></tbody>");
		intable.width(width / 2);
		intbody.append(tr);
		intable.append(intbody);
		$("body").append(intable);
		intable.css({
			"z-index":10,
			"border": "3px solid #f4f4f4",
			"position": "absolute",
			"left": mouseX - width / 2 + 50,
			"top": mouseY - height / 2,
			"user-select":"none"
		});
		$("body").mousemove(function(e) {
			intable.css({
				"left": e.pageX - width / 2 + 50,
				"top": e.pageY - height / 2
			})
		})
		intable.mouseup(function(e) {
			$("body").unbind("mousemove");
			let mouseY2 = e.pageY;
			let index = Math.round(Math.abs(mouseY - mouseY2) / height);
			if(mouseY > mouseY2) {
				if(index >= itemid) {
					tbody.children("tr").first().before(tr);
				} else {
					tbody.children("tr").eq(itemid - index).before(tr);
				}
			} else if(mouseY < mouseY2) {
				if(index >= tbody.children("tr").length - itemid) {
					tbody.children("tr").last().after(tr);
				} else {
					let x = itemid + index -1;
					tbody.children("tr").eq(x).after(tr);
				}
			}
			intable.remove();
			ths.create(ths.tb);
			ths.sort(itemid, Math.round((mouseY - mouseY2) / height));
		})
	};
	this.create = function(tb) {
		let ths = this;
		if(!$(tb).tagName == 'TABLE') {
			console.log($(tb));
			throw new Error("need a '<table class='sortable'></table>' element");
			return;
		}
		let tbody = $(tb).find('tbody');
		if(tbody.length < 1) {
			console.log($(tb));
			console.log(tbody);
			throw new Error("there are no <tbody> tag in your <table>");
			return;
		}
		ths.tb = tb;
		ths.tbody = tbody;
		ths.sortlist = $(tb).find(".sort");
		for(let i = 0; i < ths.sortlist.length; i++) {
			$(ths.sortlist[i]).unbind('mousedown');
			$(ths.sortlist[i]).mousedown(function(e) {
				ths.pickup(e, i);
			})
		}
	};
	this.sort = function(itemid, index) {};
	this.onSort = function(func) {
		this.sort = func;
	};
}