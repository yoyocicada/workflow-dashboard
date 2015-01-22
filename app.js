var express = require('express');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var methodOverride = require('method-override');
var morgan = require('morgan');
var http = require('http');
var path = require('path');
var async = require('async');
var _ = require('lodash');
var pipelines = require('./controllers/pipelines.js');
var db = require('./models');
var app = express();
var	io;
var ioSocket;

// all environments
app.set('port', process.env.PORT || 3001);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(morgan('dev'));
app.use(bodyParser());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' === app.get('env')) {
    app.use(errorHandler());
}

app.post('/createWorkflow', pipelines.createWorkflow, function(req,res,next){
	io.sockets.emit('addWorkflow',res.$_emitBody);
	res.send(res.$_emitBody);
});

app.post('/addStage', pipelines.addStage, function(req,res,next){
	io.sockets.emit('addStageToWorkflow',res.$_emitBody);
	res.send(res.$_emitBody);
});

app.get('/queryWorkflows', pipelines.getWorkflows);
app.put('/updateStep', pipelines.updateStep);

db.sequelize.sync().complete(function(err) {
    if (err) {
        throw err;
    } else {
        server = http.createServer(app).listen(app.get('port'), function() {
            console.log('Express server listening on port ' + app.get('port'));
        });
        io = require('socket.io').listen(server);
        io.on('connection', function (socket) {
        	var result;
        	var pipeline;
        	var pipelineArray=[];
			ioSocket = socket;

			pipelines.directPipelineDB.findAll().success(function(pipelines) {
				console.log("pipelines");
				console.log(pipelines.length);
		        async.forEachLimit(pipelines, 3, function(pipeline, callback) {
		            var pipelineObj = pipeline.dataValues;
		            pipeline.getStages().success(function(stages) {
		                var steps = _.pluck(stages, 'dataValues');
		                pipelineObj['stages'] = steps;
		                pipelineArray.push(pipelineObj);
		                callback();
		            });
		        }, function(err) {
		            if (err) return result = err;
		            result= pipelineArray;
		            ioSocket.emit('testSocket', result);
		        });
		    }).error(function(err) {
		        result= pipelineArray;
		        ioSocket.emit('testSocket', result);
		    });


		});

    }
});
