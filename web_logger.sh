#!/bin/bash
##Oozie workflow web logger

workflowName=
stageName=
host="localhost:3001"

function addWorkflow {
	curl -H "Content-Type: application/json" -d "{\"name\":\"$workflowName\"}" http://$host/createWorkflow	
}

function addStage {
	curl -H "Content-Type: application/json" -d "{\"workflowName\":\"$workflowName\",\"stageName\":\"$stageName\"}" http://$host/addStage
}

function usage {
	echo '-w: job id, -s: action id, using -w alone will create a new job, while using both -w and -s will create a new action for the specified job.'
}

#### Main 

while [ "$1" != "" ]; do
	case $1 in
		-w | --workflow)   	shift
					echo $1
					workflowName=$1
					;;
		-s | --stage)		shift
					stageName=$1
					echo $1
					;;
		-h | --host)		shift
					host=$1
					;;
		*)			$(usage)
					echo $1
					exit 1
	esac
	shift
done

if [ "$stageName" != "" ] && [ "$workflowName" != "" ]; then
	$(addStage)	
fi

if [ "$stageName"  == "" ] && [ "$workflowName" != "" ]; then
        $(addWorkflow)
fi

if [ "$stageName" == "" ] && [ "$workflowName" == "" ]; then
	$(usage)
        echo "Please set -w, or both -w and -s in order to run."
fi
