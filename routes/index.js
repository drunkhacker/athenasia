
/*
 * GET home page.
 */

exports.index = function(lastDate, lastCommit) {
	return function(req, res){
		res.render('index', { title: 'Athenasia', commit:lastCommit, date:lastDate });
	};
}