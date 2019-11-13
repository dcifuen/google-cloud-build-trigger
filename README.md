# google-cloud-build-trigger
Firebase function that runs a Google Cloud Build trigger.

### Install

Clone the repo and install deps
```
git clone https://github.com/dcifuen/google-cloud-build-trigger.git
cd functions
yarn install
```

Create a new Google Cloud project [in this console](https://console.cloud.google.com) and enable billing. Create a Firebase project for the same project ID [in this other console](https://console.firebase.google.com). Create the trigger to be run in Google Cloud Build.

2. Replace `gatsby-contentful-firebase` with your project ID in `.firebaserc`

Retrieve your trigger ID from API Explorer:
https://cloud.google.com/cloud-build/docs/api/reference/rest/v1/projects.triggers/list

```bash
firebase functions:config:set cloudbuild.trigger_id="<TRIGGER_ID>"
yarn deploy
```

3. In the Google Cloud IAM console, add the `Cloud Build Service Account` permission to the `App Engine default service account`. With that the function can call the Cloud Build API.

### Google Cloud Build Trigger From Git (Optional)
If you want to deploy this function on every git push event follow the instructions here: https://github.com/GoogleCloudPlatform/cloud-builders-community/tree/master/firebase and update the `cloudbuild.yaml` with your encrypted tokens
