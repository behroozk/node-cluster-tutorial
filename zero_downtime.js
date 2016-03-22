var cluster = require('cluster'),
	restartWorkers = function restartWorkers() {
		var wid, workerIds = [];

		// create a copy of current running worker ids
		for(wid in cluster.workers) {
			workerIds.push(wid);
		}

		workerIds.forEach(function(wid) {
			cluster.workers[wid].send({
				type: 'shutdown',
				from: 'master'
			});

			setTimeout(function() {
				if(cluster.workers[wid]) {
					cluster.workers[wid].kill('SIGKILL');
				}
			}, 5000);
		});
	};

if(cluster.isMaster) {
	var numWorkers = require('os').cpus().length,
		fs = require('fs'),
		i, worker;

	console.log('Master cluster setting up ' + numWorkers + ' workers...');

	for(i = 0; i < numWorkers; i++) {
		worker = cluster.fork();
		worker.on('message', function() {
			console.log('arguments', arguments);
		});
	}

	// set up listener of file changes for restarting workers
	fs.readdir('.', function(err, files) {
		files.forEach(function(file) {
			fs.watch(file, function() {
				restartWorkers();
			});
		});
	});

	cluster.on('exit', function(_worker, code, signal) {
		console.log('Worker ' + _worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
		console.log('Starting a new worker');
		worker = cluster.fork();
		worker.on('message', function() {
			console.log('arguments', arguments);
		});
	});
} else {
	process.on('message', function(message) {
		if(message.type === 'shutdown') {
			process.exit(0);
		}
	});

	console.log('Worker ' + process.pid + ' is alive!');
}