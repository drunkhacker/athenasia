
/*
 * GET home page.
 */

exports.index = function(req, res){
	//grab the commit number
	exec('git rev-parse HEAD', {cwd: __dir}, function(error, stdout, stderr) {
		console.log('stdout : ' + stdout);
		var commitid = stdout.replace(/\n$/, "");
		res.render('index', { title: 'Athenasia', commit:commitid });
    });
};