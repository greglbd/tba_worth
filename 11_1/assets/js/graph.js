'use_strict';

/* Questions - unique to each activity */
angular.module('app.graph', [])

.controller('GraphCtrl', function($scope){
  console.log($scope.audioFiles);
  
  var response = [[0, $scope.audioFiles[0].perc],[10, $scope.audioFiles[1].perc],[20, $scope.audioFiles[2].perc],[30, $scope.audioFiles[3].perc],[40, $scope.audioFiles[4].perc],[50, $scope.audioFiles[5].perc],[60, $scope.audioFiles[6].perc]];
var empty = [];
		$scope.doPlot = function(position) {
			$.plot("#placeholder", [
				{ data: response },
				{ data: empty, yaxis: 2}
			], {
			 series: {
  				lines: {
  					show: true
  				},
  				points: {
  					show: true
  				}
  			},
				xaxes: [ { min: 0, max: 60} ],
				yaxes: [ { min: 0, max: 100  }, {
					// align if we are to the right
					alignTicksWithAxis: position == "right" ? 1 : null,
					min: 0,
					max: 100,
					position: position,
					 transform: function (v) { return -v; }, // run the yaxis in reverse
				} ],
				legend: { position: "sw" }
			});
		}

		$scope.doPlot("right");
    $(".demo-container").resizable({
			maxWidth: 900,
			maxHeight: 500,
			minWidth: 450,
			minHeight: 250,
		});
});