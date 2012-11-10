exports.pushed = function(req, res) {
	
	var pushInformation = req.param;
	var ip = req.ip;

	var authorized_ips = ["207.97.227.253", "50.57.128.197", "108.171.174.178"];

    if (authorized_ips.indexOf(ip) < 0) { //not authorized
    	res.status(400);
    	res.send({ok:false, error: "You are not from authorized ips"});
    } else {
    	//check current commit id
    	var exec = require('child_process').exec,
    	child;

    	child = exec('git rev-parse HEAD', {cwd: __dir}, function(error, stdout, stderr) {
    		console.log('stdout : ' + stdout);
    		var commitid = stdout.replace(/\n$/, "");

    		if (commitid == pushInformation.before) {
    			//fine to git pull
    			exec("git reset --hard; git pull; sudo PORT=80 forever restart app.js", {cwd:__dir}, function(error, stdout, stderr) {
    				if (error) {
    					console.log("Error : " + error);
       				}
    			})

    		} else {
    			//what??
    		}
    	});
    }
}