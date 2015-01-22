angular.module('workflow-dashboard').controller('MainCtrl', ['$scope', 'mySocket',
function($scope, mySocket) {
	mySocket.on('testSocket', function(data) {
		console.log(data);
		$scope.$apply(function(){
			$scope.jobs = data;
			$scope.jobs = _.sortBy($scope.jobs, 'id');
			$scope.jobs = $scope.jobs.reverse();
		});
	});
	mySocket.on('addWorkflow', function(data) {
		console.log('addWorkflow');
		console.log(data);
		$scope.$apply(function(){
			$scope.jobs.push(data);
			$scope.jobs = _.sortBy($scope.jobs, 'id');
			$scope.jobs = $scope.jobs.reverse();
		});
	});

	mySocket.on('addStageToWorkflow', function(data) {
		console.log(data);
		$scope.$apply(function(){
			var id = data.id;
			var workflowFound = false;
			for(var i=0;i<$scope.jobs.length;i++) {
				console.log(i);
				console.log(id);
				console.log($scope.jobs[i]);
				if($scope.jobs[i].id === id) {
					console.log("testsetsets");
					var currentStages = $scope.jobs[i]['stages'];
					var currentStageIds = _.pluck(currentStages,'id');
					var newStageIds = _.pluck(data.stages,'id');
					var newStageId = _.difference(newStageIds, currentStageIds)[0];
					var newStage = _.find(data.stages, function(stage) {
					  return stage.id == newStageId;
					});
					$scope.jobs[i]['stages'].push(newStage);
					workflowFound = true;
					continue;
				}
			}
			if(workflowFound === false){
				$scope.jobs.push(data);
				$scope.jobs = _.sortBy($scope.jobs, 'id');
				$scope.jobs = $scope.jobs.reverse();
			}
		});
	});

	$scope.jobs = [{
		id: 0,
		name : "Job A",
		createdAt : new Date(),
		stages : [{
			name : "step1",
			status : "success"
		}, {
			name : "step2",
			status : "success"
		}]
	}, {
		id: 0,
		name : "Job B",
		createdAt : new Date(),
		stages : [{
			name : "step1",
			status : "success"
		}]
	}, {
		id: 0,
		name : "Job C",
		createdAt : new Date(),
		stages : [{
			name : "step1",
			status : "success"
		}, {
			name : "step2",
			status : "success"
		}]
	}, {
		id: 0,
		name : "Job A",
		createdAt : new Date(),
		stages : [{
			name : "step1",
			status : "success"
		}, {
			name : "step2",
			status : "success"
		}]
	}, {
		id: 0,
		name : "Job B",
		createdAt : new Date(),
		stages : [{
			name : "step1",
			status : "success"
		}]
	}, {
		id: 0,
		name : "Job C",
		createdAt : new Date(),
		stages : [{
			name : "step1",
			status : "success"
		}, {
			name : "step2",
			status : "success"
		}]
	}, {
		id: 0,
		name : "Job A",
		createdAt : new Date(),
		stages : [{
			name : "step1",
			status : "success"
		}, {
			name : "step2",
			status : "success"
		}]
	}];


}]);
