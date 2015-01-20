var Journalling = (function(window, document, undefined) {
	return {

		setChartMostVisted: function(containerClass, posts) {

			var titles = posts.map(function(post) {
				return post.title.substr(0, 25) + "...";
			});

			var views = posts.map(function(post) {
				return post.hints;
			});

			console.log(views);

			new Chartist.Bar('.ct-chart', {
			  labels: titles,
			  series: [
			    views
			  ]
			}, {
			  seriesBarDistance: 10,
			  axisX: {
			    offset: 40
			  },
			  axisY: {
			    offset: 80,
			    labelInterpolationFnc: function(value) {
			      return value + ' Views'
			    },
			    scaleMinSpace: 15
			  }
			});
		}

	}
})(window, document);

(function addRowListener() {
	var rows = document.getElementsByClassName('clickable');

	for (var i = 0, length = rows.length; i < length; i++) {
		var row = rows.item(i);

		row.addEventListener('click', function() {
			var link = row.getAttribute('href');
			window.location = link;
		});
	}
})();