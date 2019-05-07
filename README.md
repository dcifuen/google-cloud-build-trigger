# google-cloud-build-trigger
Firebase function that runs a Google Cloud Build trigger.

Retrieve your trigger ID from API Explorer:
https://cloud.google.com/cloud-build/docs/api/reference/rest/v1/projects.triggers/list

```bash
firebase functions:config:set cloudbuild.trigger_id="<TRIGGER_ID>"
npm run deploy
```
