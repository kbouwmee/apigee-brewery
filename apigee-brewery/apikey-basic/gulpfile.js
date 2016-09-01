var gulp = require('gulp');
var apigeetool = require('apigeetool')
var gutil = require('gulp-util')

gulp.task('default', function() {
  // place code for your default task here
});

var opts = {
    organization: gutil.env.org,
    token: gutil.env.token,
    environments: gutil.env.env,    
    environment: gutil.env.env    
}

gulp.task('deploy',function(){
	return apigeetool.getPromiseSDK()
		.deployProxy(opts)
})
