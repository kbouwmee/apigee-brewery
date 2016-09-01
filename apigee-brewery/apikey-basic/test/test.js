
// var request = require('request')
// var async = require('async')

// var org = process.env.ORG
// var env = process.env.ENV
var assert = chai.assert;
var org = 'amer-demo4'
var env = 'test'

var url = 'http://' + org + '-' + env + '.apigee.net/quota-basic'
describe('QuotaBasic', function(){
	describe('calling ' + url, function(){
		it('make 5 API calls, only 2 should succeed', function(done){
			async.times(5,function(n,next){
				$.ajax({
					url:url,
					complete:function(xhr,statusText){ next(null,xhr.status)}
				})
			},function(cberror,codes){
				var success_200 = 0				
				codes.forEach(function(s){ if (s==200) success_200++}) 
				assert.equal(2,success_200)
				done(cberror)
			})
		})
	})
})