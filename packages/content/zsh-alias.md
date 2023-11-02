---
title: Turbo-charge Your Workflow with zsh Aliases
date: "2022-12-26"
status: published
---

After building out my neovim workflow for a few months, I wanted to bring a similar feel to my raw zsh workflow. I've found myself jumping into neovim to utilize different plugins when doing things that I really should handled in the shell. Mostly, I wanted to create short 2-3 character aliases that allow me to more easily run common commands. This process kickstarted me creating aliases to cover a large variety of commands.

## Alias Basics

Setting up an alias in zsh couldn't be simpler. In your .zshrc file, add the alias keyword, followed by the alias you want to create. Then use the assignment operator to assign the command you'd like to run when this alias is executed.

```shell
# ~/.zshrc
alias cmd = "command to run" 
```

After creating your alias, save your .zshrc and source it.

```shell
source ~/.zshrc
```

## Simplifying Repeditive Tasks

One of the most useful alias patterns I've adopted is creating short hands for navigating to my most freduently visited directories, and kickstarting a task. For example, I'm often moving into my main work codebase and either starting the dev server or running tests. To accomplish this I created a `stywig` alias: `sty` is the short-hand I use for work directories since I work for Stylitics, and `wig` is a short-hand for 'widget' since this subdirectory is our JavaScript widget. All the `stywig` alias does is change into the specific sub directory, which is useful, but mostly this exists to easily chain other commands onto it. For example, the `stywigdev` alisas below, first runs `stywig` to move to the directory, follwed by our dev server npm script. This not only saves me key strokes, but also allows me to start up the dev server from anywhere on my machine. 

```shell
alias stywig="cd ~/code/stylitics/apps/widget-v3"
alias stywigtest="stywig && PUPPETEER_EXECUTABLE_PATH=/opt/homebrew/bin/chromium CYPRESS_CSS=local make test"
alias stywigdev="stywig && npm run dev"
```

I use this same pattern across our entire monorepo to move to a specific applications, and kick-off some sort of task.

## Navigation

Recently I've found myself relying too much on [telescope](https://github.com/nvim-telescope/telescope.nvim) inside of neovim when I need to search for a file and start editing it. My solution was to mimic my telescope key map (`<leader>ff`) in my zsh environment. I accomplish this by creating an `ff` alias...

```shell
alias ff="fd --type f --hidden --exclude .git --exclude node_modules | fzf | xargs nvim"
```

This alias first uses fd (a rust alternative to find) to grab all files in the current directory and all child directories. Note that we use the fd `--exclude` flag to ignore any .git directories as well as node_modules. Next we pipe that list of files to fzf to allow for an interactive fuzzy search. Then when a file is selected, we open the file in neovim using `xargs nvim`.   

## Git

Using git produces a ton of repeated commands that become much simpler when aliased to 1 or 2 key combos.

```shell
alias g="git"
alias gs="git status"
alias gl="git log --oneline"
alias gd="git diff"
```

I've also added some more custom aliases customize my git experience a bit more. For example, I often find myself wanting to print out a list of all local branches, in the order they were checked out rather than the default alphabetical sorting. 

```shell
alias gb="git for-each-ref --sort=committerdate refs/heads/ --format='%(committerdate:short) %(refname:short)'"
```

I hope the patterns I've outlined here can help you customize your zsh experience to enable a more delightful time building.
