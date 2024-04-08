---
title: Implementing Preview Deploys via Github Actions
date: "2024-04-08"
status: published
---

Lately over on tech twitter, there's been quite a bit of talk around [Platform as a Service (PaaS)](https://en.wikipedia.org/wiki/Platform_as_a_service) infrastructure providers like Vercel and Netlify. I've been a user of these kinds of platforms for years, but recently have had a hard time recommending them for any projects that have considerable scale. We've seen these platforms [eliminate free plans](https://blog.heroku.com/next-chapter), [increase prices](https://www.netlify.com/blog/announcing-changes-to-netlify-plans/), and in general show signs of change as VC's come looking for profits. 

I personally think these platforms will always have a place in the industry, but the reality is that for most mid-sized start-ups, the cost of these services becomes too great at a certain scale. I'm of the opinion that one of the best things you can do for your career as a front-end dev is to learn (at least) the basics of cloud computing, in order to bring value typically found in these PaaS but on your own cloud infrastructure.

To demonstrate this, I'm going to show you how to implement one of the most sought after features of these platforms: Pull Request preview deploys. A Preview deploy essentially creates a temporary namespace where you can deploy a specific branch of your codebase when a pull request is created in Github. The below example assumes you're building a static website with Node.js + npm, and you're deploying your website to an S3 bucket in AWS.


```yaml
name: Preview Deploy

# Create a Preview Deploy for pull requests main against the main branch
on:
  pull_request:
    branches:
      - main

jobs:
  create:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v4

      # Set an environment variable that is the 10 character sha for the last commit on the branch
      # We're passing the value to $GITHUB_OUTPUT so we can access it in later steps
      - name: "Set Env Variables"
        id: vars
        run: |
          echo "sha=$(git rev-parse --short=10 HEAD)" >> $GITHUB_OUTPUT

      # Install dependancies
      - name: "Install"
        run: npm install

      # Build your application
      - name: "Build"
        run: npm run build

      # Perform your deploy step here!
      # Make use of `steps.vars.outputs.sha` to namespace the deployment
      #
      # Below is an example of uploading built files to an AWS S3 Bucket
      - name: Upload to S3   
        uses: shallwefootball/s3-upload-action@master
        with:
          aws_key_id: ${{secrets.AWS_KEY_ID}}
          aws_secret_access_key: ${{secrets.AWS_SECRET_ACCESS_KEY}}
          aws_bucket: ${{ secrets.AWS_BUCKET }}
          source_dir: build/ 
          destination_dir: ${{steps.vars.outputs.sha}}

      # Add a comment to the PR with the link to the bucket 
      - name: Report Status via GitHub PR Comment
        uses: mshick/add-pr-comment@v2
        with:
          message: "PR Deployed! https://${{ secrets.AWS_BUCKET }}.s3.ap-northeast-2.amazonaws.com/${{steps.vars.outputs.sha}}/index.html"

```

I hope this simple example illustrates how learning the basics of cloud infrastructure can empower you to provide your team with an excellent developer experience, without the cost of a PaaS.

> Editors Note: I did not test this Github Actions code - if you see a bug/error please let [me know](mail:jacob@stordahl.dev)!
