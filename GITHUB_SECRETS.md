# Setting Up GitHub Secrets for CI/CD

This guide explains how to set up GitHub repository secrets for use in the CI/CD workflow.

## What are GitHub Secrets?

GitHub Secrets are encrypted environment variables that you can create in a GitHub repository. They allow you to store sensitive information, such as API keys, without exposing them in your workflow files.

## Setting Up Secrets for This Project

For this project, you need to set up the following secrets:

1. `REACT_APP_API_KEY`: Your API key
2. `REACT_APP_API_URL`: Your API URL

## Steps to Add Secrets

1. Go to your GitHub repository
2. Click on "Settings" tab
3. In the left sidebar, click on "Secrets and variables" > "Actions"
4. Click on "New repository secret"
5. Add each secret:
   - Name: `REACT_APP_API_KEY`
   - Value: `your_actual_api_key_here`
   - Click "Add secret"
6. Repeat for `REACT_APP_API_URL`

## Verifying Secrets

After adding the secrets, they will be available in your GitHub Actions workflows. You can verify they're working by:

1. Making a small change to your repository
2. Pushing the change to trigger the workflow
3. Going to the "Actions" tab in your repository
4. Checking that the workflow runs successfully

## Security Notes

- Never print secrets in logs or expose them in any way
- Rotate your API keys periodically for better security
- Review access to repository secrets and limit it to necessary collaborators only

## Troubleshooting

If your workflow fails with errors related to missing environment variables:

1. Check that you've added all required secrets
2. Verify the secret names match exactly what's expected in the workflow file
3. Make sure the secrets have the correct values 