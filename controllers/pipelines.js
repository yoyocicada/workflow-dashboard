var db = require('../models');
var _ = require('lodash');
var async = require('async');

exports.createWorkflow = function(req, res, next) {
    var workflow = req.body;
    var pipeline = db.Pipeline.build({
        name : workflow.name
    });
    var steps = [];
    async.series([
    function(callback) {
        pipeline.save().success(function() {
            callback();
        }).error(function(err) {
            callback(err);
        });
    }], function(err) {
        if (err)
            return res.json(err);
        var pipelineObj = pipeline.dataValues;
        pipelineObj['stages'] = [];
        res.$_emitBody = pipelineObj;
        next();
    });
};

exports.addStage = function(req, res, next){
    var whereObj = {
        name: req.body.workflowName
    };
    var pipelineInstance;
    var stageId;
    var stageInstance;
    var stageObj = {
    	name: req.body.stageName,
    	status: 'success'
    };
	var stages = [];
    async.series([function(callback){
        db.Pipeline.find({
            where : whereObj
        }).success(function(pipeline){
            pipelineInstance = pipeline;
            callback();
        }).error(function(err){
            callback(err);
        });
    },function(callback){
	   	stageInstance = db.Stage.build(stageObj);
        stageInstance.save().success(function() {
            callback();
        }).error(function(err) {
            return callback(err);
        });
    },function(callback){
         pipelineInstance.addStages(stageInstance).success(function(){
            callback();
         }).error(function(err) {
            return callback(err);
        });
    },function(callback){
         pipelineInstance.getStages().success(function(stageInstances){
         	stages = _.pluck(stageInstances, 'dataValues');
            callback();
         }).error(function(err) {
            return callback(err);
        });
    }],function(err){
        if (err) return res.json(err);
        var pipelineObj = pipelineInstance.dataValues;
        pipelineObj['stages'] = stages;
        res.$_emitBody = pipelineObj;
        next();
    });
};

exports.getWorkflows = function(req, res) {
    var whereObj = req.query;
    var pipelineArray = [];
    db.Pipeline.findAll({
        where : whereObj
    }).success(function(pipelines) {
        async.forEachLimit(pipelines, 3, function(pipeline, callback) {
            var pipelineObj = pipeline.dataValues;
            pipeline.getStages().success(function(stages) {
                var steps = _.pluck(stages, 'dataValues');
                pipelineObj['stages'] = steps;
                pipelineArray.push(pipelineObj);
                callback();
            });
        }, function(err) {
            if (err) return res.json(err);
            res.json(pipelineArray);
        });
    }).error(function(err) {
        return res.json(err);
    });
};

exports.directPipelineDB = db.Pipeline;

//TODO: may remove this one later.
exports.updateStep = function(req, res) {
    var whereObj = {
        yearMonth: req.body.yearMonth,
        name: req.body.workflowName
    };
    var pipelineInstance;
    var stageId;
    var stageInstance;
    async.series([function(callback){
        db.Pipeline.find({
            where : whereObj
        }).success(function(pipeline){
            pipelineInstance = pipeline;
            callback();
        }).error(function(err){
            callback(err);
        });
    }, function(callback){
         pipelineInstance.getStages({where: {name:req.body.stepName}}).then(function(stages){
            stageInstance = stages[0];
            callback();
         });
    }, function(callback){
        stageInstance.status = (req.body.status)? req.body.status: stageInstance.status;
        stageInstance.info = (req.body.info)? req.body.info: stageInstance.info;
        stageInstance.completedBy = (req.body.completedBy)? req.body.completedBy: stageInstance.completedBy;
        stageInstance.save().success(function(){
            callback();
        }).error(function(err){
            callback(err);
        });
    }],function(err){
        if (err) return res.json(err);
        return res.json(stageInstance);
    });
};
