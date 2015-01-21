angular.module('workflow-dashboard')
  .controller('MainCtrl', ['$scope', function ($scope) {
	$scope.jobs = [
		{
			name: "Job A",
			triggered: new Date(),
			steps: [
				{
					name: "step1",
					status: "success"
				},
				{
					name: "step2",
					status: "success"
				}
			]
		},
		{
			name: "Job B",
			triggered: new Date(),
			steps: [
				{
					name: "step1",
					status: "success"
				}
			]
		},
		{
			name: "Job C",
			triggered: new Date(),
			steps: [
				{
					name: "step1",
					status: "success"
				},
				{
					name: "step2",
					status: "success"
				}
			]
		},
		{
			name: "Job A",
			triggered: new Date(),
			steps: [
				{
					name: "step1",
					status: "success"
				},
				{
					name: "step2",
					status: "success"
				}
			]
		},
		{
			name: "Job B",
			triggered: new Date(),
			steps: [
				{
					name: "step1",
					status: "success"
				}
			]
		},
		{
			name: "Job C",
			triggered: new Date(),
			steps: [
				{
					name: "step1",
					status: "success"
				},
				{
					name: "step2",
					status: "success"
				}
			]
		},
		{
			name: "Job A",
			triggered: new Date(),
			steps: [
				{
					name: "step1",
					status: "success"
				},
				{
					name: "step2",
					status: "success"
				}
			]
		}
	];
  }]);
