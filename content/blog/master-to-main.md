---
title: Renaming your 'master' git branch to 'main'
date: "2021-01-16"
status: published
---

One of my goals for 2021 is to bring some of my opinions around ethics in tech to this blog. It is my belief that technology is a tool that must be democratized if it is to be a large portion of our day to day lives. Without this democratization, technology is used to harm, abuse, &amp; further marginalize many groups of people around the world.

The content of this particular post may seem like an insignificant, or performative, action. However, I find it important to practice these, seemingly small, actions; especially as a person who is not a part of the marginalized group that has spoken up about this issue. The use of the term 'master' in any context is rooted in slavery &amp; white supremacy: period. With that knowledge, let's look at how you can easily rename both your local git repos, as well as any remotes, to use 'main' instead.

First we need to rename our local branch. Make sure your HEAD is on the branch named 'master' and run the following command.

```shell
git branch -m master main
```

If you run `git status`, you should see this...

```shell
git status
On branch main
Your branch is up to date with 'origin/master'.
nothing to commit, working tree clean
```

Next, we need to push our 'main' branch to our remote

```shell
git push -u origin main
```

Now our remote has a new branch named 'main' that is an identical copy or the branch named 'master'. Lastly, we just need to delete the branch named 'master' from our remote. If your using Github, you'll likely have to navigate to _your repository &gt; Settings &gt; Branches_ and change your default branch from 'master' to 'main'. Once this is done, run the following command...

```shell
git push origin --delete master

# then if you run git status...

git status
On branch main
Your branch is up to date with 'origin/main'.
nothing to commit, working tree clean
```

Job done! Now our previously named 'master' branch has been converted to our 'main' branch.
