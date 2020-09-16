const s3Unziplus = require('s3-unzip-plus'); 
function folderName(filename) {
  let a = filename.split('.')
  a.pop();
  return a.join('.');
}

exports.handler = function(event, context, callback) { 
  console.log('Unzip Lambda function Start')
  console.log('Unzip Lambda function Start: '+JSON.stringify(event))

  const thisEvent = event.Records[0];
  if (thisEvent.eventSource !== 'aws:s3') {
    console.error('invalid s3 event');
    return 0;
  }

  const srcBucketname = event.Records[0].s3.bucket.name;
  const originalFilename = event.Records[0].s3.object.key;
  const filename = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));

  console.log('filename:' + filename)
  console.log('bucketname:' + srcBucketname)
  console.log('Running S3 unzip')
  let params = {
    bucket: srcBucketname,
    file: filename,
    targetBucket: srcBucketname,
    targetFolder: folderName(filename),
    // targetFolder: 'bb',
    // targetKey: 'bb',
    deleteOnSuccess: false,
    verbose: true
  }
  console.log(params)

  var s = new s3Unziplus(params, function(err, success){
    if (err) console.error(err);
    else console.log(success);
  });
}