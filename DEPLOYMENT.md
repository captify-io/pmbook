# Deployment Setup for PMBook

## Elastic Beanstalk Configuration

This application is deployed to AWS Elastic Beanstalk with the following setup:

- **Application Name**: pmbook
- **Environment Name**: pmbook-env
- **Region**: us-east-1
- **Platform**: Node.js 20 running on 64bit Amazon Linux 2023
- **Current CNAME**: pmbook-captify.us-east-1.elasticbeanstalk.com

## Custom Domain Setup (pmbook.captify.io)

To configure the custom domain `pmbook.captify.io`, follow these steps:

### 1. DNS Configuration
Create a CNAME record in your DNS provider pointing to the EB environment:

```
Type: CNAME
Name: pmbook
Value: pmbook-captify.us-east-1.elasticbeanstalk.com
TTL: 300 (or your preferred TTL)
```

### 2. SSL Certificate Setup
1. Go to AWS Certificate Manager (ACM) in us-east-1 region
2. Request a public certificate for `pmbook.captify.io`
3. Validate the certificate using DNS validation
4. Once validated, configure it in the EB environment

### 3. EB Environment Configuration
After the certificate is ready:
1. Go to EB Console → pmbook-env → Configuration → Load balancer
2. Add a listener on port 443 (HTTPS)
3. Select the SSL certificate from ACM
4. Update the configuration

## GitHub Actions Secrets

The following secrets need to be configured in the GitHub repository:

- `AWS_ACCESS_KEY_ID`: AWS access key with EB deployment permissions
- `AWS_SECRET_ACCESS_KEY`: AWS secret access key

## Deployment Workflow

1. Push to main branch triggers the workflow
2. Tests and builds the application
3. Deploys to EB environment if all tests pass

## Environment Variables

### Automatically Configured (in .ebextensions/nodejs.config)
- `NODE_ENV`: production
- `PORT`: 8081

### Manual Configuration Required (add via EB Console or CLI)
Add these environment variables in the EB Console under Configuration → Software → Environment properties:

**Required for full functionality:**
- `NEXTAUTH_URL`: https://platform.captify.io (platform URL for authentication)
- `NEXTAUTH_SECRET`: Generate a secure random string (32+ characters)

**Optional (for AWS integrations):**
- `COGNITO_IDENTITY_POOL_ID`: Your app's Cognito identity pool ID
- `BEDROCK_AGENT_ID`: Your app's Bedrock agent ID
- `BEDROCK_AGENT_ALIAS_ID`: Your app's Bedrock agent alias ID

### Adding Environment Variables via EB CLI
```bash
eb setenv NEXTAUTH_URL=https://platform.captify.io
eb setenv NEXTAUTH_SECRET=your-generated-secret
eb setenv COGNITO_IDENTITY_POOL_ID=your-pool-id
eb setenv BEDROCK_AGENT_ID=your-agent-id
eb setenv BEDROCK_AGENT_ALIAS_ID=your-alias-id
```

## Files Created for Deployment

- `.elasticbeanstalk/config.yml`: EB CLI configuration
- `.ebextensions/nodejs.config`: Node.js runtime configuration
- `.ebextensions/build.config`: Build commands
- `.github/workflows/deploy.yml`: GitHub Actions workflow
- `.ebignore`: Files to exclude from deployment
- `Procfile`: Process start command
- `DEPLOYMENT.md`: This documentation file

## Manual Deployment

If needed, you can deploy manually using:

```bash
eb deploy
```

## Environment Status Check

```bash
eb status
eb health
eb logs
```