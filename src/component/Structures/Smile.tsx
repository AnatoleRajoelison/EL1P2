import AnonLog from "./AnonLog";
import AWS from 'aws-sdk';

//Loads selected image and unencodes image bytes for Rekognition DetectFaces API
export default function Smile() {
    AnonLog();
    var control : any = document.getElementById("fileToUpload");
    var file = control?.files[0];

    // Load base64 encoded image for display 
    var reader = new FileReader();
    reader.onload = (function (theFile) {
        return function (e: any) {
            //Call Rekognition  
            AWS.config.region = "eu-west-2";  
            var rekognition = new AWS.Rekognition();
            var params = {
                Image: {
                Bytes: e.target.result
            },
            Attributes: [
            'ALL',
            ]
            };
            rekognition.detectFaces(params, function (err: any, data: any) {
                var result: any = document.getElementById("opResult1")
                if (err) console.log(err, err.stack); // an error occurred
                else {
                 var table = "<table>Smile<tr><th>Value</th><th>Confidence</th></tr>";
                  // show each face and build out estimated age table
                  for (var i = 0; i < data.FaceDetails.length; i++) {
                    table += '<tr><td>' + data.FaceDetails[i].Smile.Value +
                      '</td><td>' + data.FaceDetails[i].Smile.Confidence + '</td></tr>';
                  }
                  table += "</table>";
                  result.innerHTML = table;
                    }
                  });
                };
            })(file);
            reader.readAsArrayBuffer(file)
}