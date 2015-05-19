#CodeRED Fall Web App
---

## Before You Begin
Before you begin we recommend you read about the basic building blocks that assemble a MEAN.JS the CodeRED web app:
* MongoDB - Go through [MongoDB Official Website](http://mongodb.org/) and proceed to their [Official Manual](http://docs.mongodb.org/manual/), which should help you understand NoSQL and MongoDB better.
* Express - The best way to understand express is through its [Official Website](http://expressjs.com/), which has a [Getting Started](http://expressjs.com/starter/installing.html) guide, as well as an [ExpressJS Guide](http://expressjs.com/guide/error-handling.html) guide for general express topics. You can also go through this [StackOverflow Thread](http://stackoverflow.com/questions/8144214/learning-express-for-node-js) for more resources.
* AngularJS - Angular's [Official Website](http://angularjs.org/) is a great starting point. You can also use [Thinkster Popular Guide](http://www.thinkster.io/), and the [Egghead Videos](https://egghead.io/).
* Node.js - Start by going through [Node.js Official Website](http://nodejs.org/) and this [StackOverflow Thread](http://stackoverflow.com/questions/2353818/how-do-i-get-started-with-node-js), which should get you going with the Node.js platform in no time.


## Prerequisites
Make sure you have installed all of the following prerequisites on your development machine:
* Node.js - [Download & Install Node.js](http://www.nodejs.org/download/) and the npm package manager. If you encounter any problems, you can also use this [GitHub Gist](https://gist.github.com/isaacs/579814) to install Node.js.
* MongoDB - [Download & Install MongoDB](http://www.mongodb.org/downloads), and make sure it's running on the default port (27017).
* Bower - You're going to use the [Bower Package Manager](http://bower.io/) to manage your front-end packages. Make sure you've installed Node.js and npm first, then install bower globally using npm:

```bash
$ npm install -g bower
```

* Grunt - You're going to use the [Grunt Task Runner](http://gruntjs.com/) to automate your development process. Make sure you've installed Node.js and npm first, then install grunt globally using npm:

```bash
$ npm install -g grunt-cli
```


##Usage
Make file `CodeREDConfig.js` with the following content.

```
'use strict';
 module.exports = {
 	development: {
 		RED_DB: '<URL-OF-MONGODB-INSTANCE>',
 		RED_SECRET: '<GENERATE-A-DEVELOPMENT-SECRET>'
 	},
 	production: {
 		RED_DB: '<URL-OF-MONGODB-INSTANCE>',
 		RED_SECRET: '<GENERATE-A-PRODUCTION-SECRET>'
 	}
 };

```

## Quick Install
Once you've downloaded the boilerplate and installed all the prerequisites, you're just a few steps away from starting up the CodeRED web app.

The first thing you should do is install the Node.js dependencies. The boilerplate comes pre-bundled with a package.json file that contains the list of modules you need to start your CodeRED web app. To learn more about the modules installed visit the NPM & Package.json section.

To install Node.js dependencies you're going to use npm again. In the the CodeRED web app folder run this in the command-line:

```bash
$ npm install
```

This command does a few things:
* First it will install the dependencies needed for the the CodeRED web app to run.
* If you're running in a development environment, it will then also install development dependencies needed for testing and running your CodeRED web app.
* Finally, when the install process is over, npm will initiate a bower install command to install all the front-end modules needed for the CodeRED web app.

## Running Your CodeRED web app(Development)
After the install process is over, you'll be able to run your CodeRED web app using Grunt. Just run grunt default task:

```bash
$ grunt
```

Your CodeRED web app should run on port 3000, so in your browser just go to [http://localhost:3000](http://localhost:3000)

That's it! Your CodeRED web app should be running. To proceed with your development, check the other sections in this documentation.

##Running Your CodeRED web app(Production)

```bash
$ NODE_ENV=production grunt
```
