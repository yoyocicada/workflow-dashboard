#!/bin/bash
#echo $1;
workflowName=
stageName=
function addWorkflow {
	curl -H "Content-Type: application/json" -d "{\"name\":\"$workflowName\"}" http://localhost:3001/createWorkflow	
}

function addStage {
	curl -H "Content-Type: application/json" -d "{\"workflowName\":\"$workflowName\",\"stageName\":\"$stageName\"}" http://localhost:3001/addStage
}

#### Main 

while [ "$1" != "" ]; do
	echo $1
	case $1 in
		-w | --workflow)   	shift
					echo $1
					workflowName=$1
					;;
		-s | --stage)		shift
					stageName=$1
					echo $1
					;;
		*)			echo $1
					exit 1
	esac
	echo $1
	shift
done

echo "this is cool"
echo "$workflowName"

if [ "$stageName" != "" ] && [ "$workflowName" != "" ]; then
	$(addStage)	
fi

if [ "$stageName"  == "" ] && [ "$workflowName" != "" ]; then
        $(addWorkflow)
fi

if [ "$stageName" == "" ] && [ "$workflowName" == "" ]; then
        echo "Please set -w or -s in order to run."
fi
