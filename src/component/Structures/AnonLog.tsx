import AWS from 'aws-sdk';

function AnonLog() {
    
    // Configure the credentials provider to use your identity pool
    AWS.config.region = 'eu-west-2'; // Region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'eu-west-2:371cdf1c-657e-4e3f-a6a0-3cdcf905bfdc',
    });
    // Make the call to obtain credentials
    AWS.config.getCredentials(function () {
      // Credentials will be available when this function is called.
      var accessKeyId = AWS.config.credentials?.accessKeyId;
      var secretAccessKey = AWS.config.credentials?.secretAccessKey;
      var sessionToken = AWS.config.credentials?.sessionToken;
    });
  }

  export default AnonLog;