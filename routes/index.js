
/*
 * GET home page.
 */

exports.index = function(lastDate, lastCommit) {

	return function(req, res){
		//grab the commit number
		require('child_process').exec('git rev-parse HEAD', {cwd: __dirname}, function(error, stdout, stderr) {
			console.log('stdout : ' + stdout);
			var commitid = stdout.replace(/\n$/, "");
			res.render('index', { title: 'Athenasia', commit:lastCommit, date:lastDate });
	    });
	};
}