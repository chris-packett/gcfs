# gcfs
Google Cloud Functions Repository

## Local Dev + Test
- Ensure node is same as GCF runtime (example: nodejs10 runtime). You can use nvm (node version manager) for this. (example: nvm use 10)
- Ensure that, if using Google Client Libraries, you authenticate using a service key account. You can point to this anywhere on your computer with the env var GOOGLE_APPLICATION_CREDENTIALS.

Example Environment Variable export for Service Key Account JSON file.

`export GOOGLE_APPLICATION_CREDENTIALS="/Users/chris/Downloads/project-name-id.json"`

https://cloud.google.com/docs/authentication/production#passing_variable

## Deploy
https://cloud.google.com/sdk/gcloud/reference/functions/deploy

example: gcloud functions deploy '{{functionName}}' --timeout=TIMEOUT  --runtime nodejs10 --trigger-http --entry-point={{exportedFunctionName}}

TIMEOUT is represented in seconds. The max timeout is 9 minutes or 540 seconds. (example: --timeout=540)