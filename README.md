# 📦  Node JS Demo App
This is the Demo Application that show image from S3 Bucket as per parameter saved in environment.

---

## ✅ Assumptions
 - You have an AWS S3 bucket with a publicly accessible image name as per secret store in GitHub with **S3_IMAGE_KEY.**(e.g., my-image.jpg).
 - The bucket has permissions allowing public read access to the image or appropriate IAM permissions for the app to access it.

---

## 📋 Step 1: Set Up the GitHub Repository
### 1. Initialize and push your project: 
 - If not already done, initialize a Git repository and push your code:
    ```
    - git init
    - git add .
    - git commit -m "Initial commit"
    - git remote add origin <your-repo-url>
    - git push -u origin main
    ```
### 2. Verify project structure: 
 - Your repository should include:
    ```
    - server.js
    - index.html
    - Dockerfile
    - package.json
    - .gitignore
    ```

---

## 📋 Step 2: Manage Environment Variables in GitHub Actions
Your app uses a .env file with variables (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, S3_BUCKET_NAME, S3_IMAGE_KEY, PORT). Sensitive variables (e.g., AWS credentials) should be stored as GitHub Secrets, while non-sensitive ones (e.g., PORT, AWS_REGION) can be stored as GitHub Variables or defined directly in the flow.
### 1. Add GitHub Secrets:
 - Go to your GitHub repository > **Settings** > **Secrets and variables** > **Actions** > **Secrets** > **New repository secret.**
 - Add the following secrets from your .env file:
     - **AWS_ACCESS_KEY_ID**: Your AWS IAM Access Key ID
     - **AWS_SECRET_ACCESS_KEY**: Your AWS IAM Secret Access Key
     - **AWS_ACCOUNT_ID**: Your AWS Account Number
     - **S3_IMAGE_KEY**: Your S3 image key (e.g., my-image.jpg)
 - These secrets are encrypted and accessible only in GitHub Actions workflows.

### 2. Add GitHub Variables (for non-sensitive data):
 - Go to **Settings** > **Secrets and variables** > **Actions** > **Variables** > **New repository variable.**
 - Add:
     - **AWS_REGION**: us-east-1
     - **S3_BUCKET_NAME**: Your S3 bucket name (e.g., my-s3-bucket)
     - **PORT**: 80
 - Variables are suitable for non-sensitive configuration data.

---

## 📋 Step 3: Create the CI/CD Workflow
 - Create a GitHub Actions workflow to build, test, and push the Docker image to AWS ECR. The workflow will:
    - Trigger on push to the **main** branch.
    - Build and test the Node.js app.
    - Build a Docker image and push it to ECR.
    - Recreate the .env file using GitHub Secrets and Variables.
    - Create the workflow file: In your repository, create a file at **.github/workflows/cicd.yml**

---

## 📋 Step 4: Test the CI/CD Pipeline
### 1. Commit and push the workflow
 - git add .github/workflows/cicd.yml
 - git commit -m "Add CI/CD pipeline with GitHub Actions"
 - git push origin main
### 2. Monitor the workflow:
 - Go to your GitHub repository **> Actions** tab.
 - Select the **CI/CD Pipeline** workflow and watch the job (build-and-push) run.
 - Check the logs for each step to ensure:
    - Dependencies are installed.
    - The .env file is created.
    - The Docker image is built and pushed to ECR.
### 3. Verify in ECR:
 - Go to AWS Management Console > ECR > Repositories > s3-image-display.
 - Confirm the latest tag is updated with your new image. 