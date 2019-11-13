const functions = require('firebase-functions');
const admin = require('firebase-admin');
const rp = require('request-promise');

const TRIGGER_ID = functions.config().cloudbuild.trigger_id;


admin.initializeApp();

exports.runCloudBuildTrigger = functions.https.onRequest((request, response) => {
 console.info(`Running Cloud Build with trigger id ${TRIGGER_ID}`);
 return admin.credential.applicationDefault().getAccessToken()
     .then(accessTokenObj => {
      return accessTokenObj.access_token;
     })
     .then(accessToken => {
      return runTrigger(accessToken);
     })
     .then(result => {
      console.info(result);
      response.send("OK");
      return null;
     })
     .catch(error => {
      console.error(error);
      return null;
     })
});

function runTrigger(accessToken) {
 const options = {
  method: 'POST',
  uri: `https://cloudbuild.googleapis.com/v1/projects/${process.env.GCLOUD_PROJECT}/triggers/${TRIGGER_ID}:run`,
  body: {
   'branchName': 'master'
  },
  headers: {
   Authorization: 'Bearer ' + accessToken
  },
  json: true
 };
 return rp(options).then(resp => {
  return Promise.resolve(resp);
 }).catch(err => {
  console.error(err);
  return Promise.resolve(null);
 });
}
