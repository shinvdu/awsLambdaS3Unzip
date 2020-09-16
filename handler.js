//import your handler file or main file of Lambda
let handler = require('./index');

handler.handler(
{
	"Records": [
	{
		"eventSource": "aws:s3",
		"s3": {
      "bucket": {
        "name": "agilent-staging-bucket"
      },
      "object": {
        "key": "cpt-postman%E4%B8%AD%E6%96%87.zip"
      }      
    }
	}
	]
});
