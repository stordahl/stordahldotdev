---
title: A Simple iOS Development setup
date: "2022-03-14"
status: published
---

For many engineers who work in the browser, iOS Safari can be the scourge of building web apps. The key to squashing the bugs presented by iOS Safari is to have a polished development environment for the platform. The first take away from working with this mobile browser is that the iOS WebKit engine is fundamentally different from desktop browsers, and the only reliable way to catch bugs is by observing them on an actual iOS device. If you work for a company, or are a full-time freelancer, I highly recommend picking up a refurbished iPhone 7/8 which will run around $200. 

> While this is not accessible to everyone, this tutorial unfortunately depends on the use of an actual iOS device.

## Setup

The first step to this simple iOS development setup is to install and configure Safari on your desktop machine. For good measure, I also recommend installing [Safari Technology Preview](https://developer.apple.com/safari/technology-preview/) to stay up to date on changes coming to the browser. Once you've installed some flavor of Safari, you'll need to navigate to _Preferences > Advanced_ and check 'Show Developer menu in menu bar'. This will enable you to access developer tools in Safari. 

Once that is enabled, you can plug your test iPhone into the desktop machine that is running Safari, then open the 'Develop' menu. In the second section of this menu you will see a list of devices that the developer tools have access to, including the iPhone you've just plugged in. Make sure the application you are testing is open in the Safari browser on the iPhone, and then you should be able to select that window in the developer tools in the desktop Safari.

<figure>
	<img src="/static/images/ios-dev-1.png" alt="A screenshot of the Safari Develop menu showing a connect mobile device available in Dev Tools">
	<figcaption>A screenshot of the Safari Develop menu showing a connect mobile device available in Dev Tools</figcaption>
</figure>

Simply click on the window you're testing, and you'll be able to use the developer tools to debug your mobile browser, just like you normally would on desktop. I hope this quick tutorial helps squashing those iOS bugs a simpler, less miserable task.
