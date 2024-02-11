---
title: Setting Up A Fresh Work Machine
date: "2022-03-09"
status: published
---

Being that I recently started a new Software Engineering role, I've also had the opportunity to purchase a new work machine. I upgraded from my ancient 2013 Macbook Pro to the new 2021 Macbook Pro with the M1 Pro chip. After refining my setup over the past month, it's finally at a spot I'm happy with and I wanted to walk through the different components here. I wanted to take my time designing this setup and fit some specific guidelines; minimal and dark UI, maximize keyboard navigation, limit electron apps, & prioritize apps that provide customization. With those guidelines in mind, let's start at the heart of any dev setup - the shell!

## Shell + Terminal

For my shell, I chose to opt out of the default macOS zsh shell and grab oh-my-zsh, mostly for it's incredible plugin ecosystem and vibrant community. The only plugins I have right now are git, vscode, and zsh-autosuggetions - I could absolutely make use of more plugins, but for now this gets the job done! I also installed the Pure prompt which is minimal while still providing some good information. The terminal itself is the tried & true iTerm2 - in my opinion, the perfect terminal replacement for macOS. 

## Code Editors

I make use of two editors for different types of editing - Vim & VSCode. Vim is my favorite tool for minimal editing in the terminal; quick edits, Markdown authoring, reading files, and other quick tasks like this are perfect for Vim. I hope to eventually make a full transition to Vim, but my chops aren't there yet. I use a host of Vim plugins, but the most important are Gruvbox Theme & NerdTree. When working in a code-base, I lean heavily on VSCode and it's vast plugin ecosystem. Here is a list of the VSCode plugins I use...

```shell
bungcip.better-toml
CoenraadS.bracket-pair-colorizer
dsznajder.es7-react-js-snippets
eamodio.gitlens
eg2.vscode-npm-script
equinusocio.vsc-material-theme-icons
esbenp.prettier-vscode
gitkraken.gitkraken-authentication
IronGeek.vscode-env
jdinhlife.gruvbox
mkxml.vscode-filesize
mquandalle.graphql
ms-vsliveshare.vsliveshare
ms-vsliveshare.vsliveshare-audio
ms-vsliveshare.vsliveshare-pack
naumovs.color-highlight
paintparty.repl-repl
stordahl.sveltekit-snippets
svelte.svelte-vscode
vivaxy.vscode-conventional-commits

# Protip: run this command to see a list of your installed extensions
code --list-extensions | xargs -L 1 echo code --install-extension
```

## Productivity

I've been an avid Notion user for the past 3 years, both personally & professionally. However, this new role has presented the opportunity to move off of the platform due to my team using ClickUp for all project management. Kanban boards were my main use for Notion, so I wanted to find a simple note taking solution for personal notes that don't belong in ClickUp. Enter Obsidian – a sweet markdown editor complete with local storage, a knowledge graph, command palette, and more. Obsidian also has a large number of community plugins - one of which I use to sync my local notes with a Github remote repository. 

## Utilities

Last, I'll cover the suite of small utilities I use to heighten my workflow. The center piece of my workflow is Raycast -  the extendable launcher of my dreams. Before Raycast, I mostly used the macOS built-in Spotlight to quickly search my machine for files and apps. I've been a Raycast user for a few months and I now see the major benefit to a proper launcher. The Raycast features I use most are the clipboard history, snippets, and application launching. On top of that, I've installed community plugins to manage a to-do list, connect with Slack, and access my Obsidian vault. 

Some other notable utilities are Gifox for making quick GIFs, BetterDummy for more granular display control, and UTM for running Windows Virtual Machines on the M1 chip.

## Final thoughts

I'm very excited to put this setup to the test and improving it over time. Also, if you'd like to easily get this setup up and running on your machine, I've created an install script which installs most of what is mentioned here via Homebrew, as well as some Javascript tooling.

