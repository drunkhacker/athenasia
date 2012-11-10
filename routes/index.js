
/*
 * GET home page.
 */

exports.index = function(lastDate, lastCommit) {
    console.log(lastDate);
    console.log(lastCommit);

	return function(req, res){
		res.render('index', { title: 'Athenasia', commit:lastCommit, date:lastDate });
	    };
}
