#Base project

##Index

1. [Start to use](https://github.com/andremachadodev/base-project#start-to-use)
2. [Installing the third party tools](https://github.com/andremachadodev/base-project#installing-the-tools)

<a name="start-to-use"></a>
##Start to use

This project use as a dependencie follow third party projects:

1. NodeJS
2. NPM, package manager
3. Bower, script dependencies manager
4. GruntJS, task manager
5. Compass, Sass framework to boost the good and old css

<a name="installing-the-tools"></a>
##Installing the third party tools

###NodeJS

[https://nodejs.org/download/](https://nodejs.org/download/)

###NPM

[https://www.npmjs.com/](https://www.npmjs.com/)

###Bower

[http://bower.io/](http://bower.io/)

It’s our choice for script dependencies manager, follow to install:

<code>npm install -g bower</code>

To start the new bower project and create a bower.json file (unusual in our context, because the bower.json are created will bring with repository)

<code>bower init</code>

To list all dependencies already in our bower.json file:

<code>bower list</code>

To install dependencies already in our bower.json file:

<code>bower install</code>

To install a new packege, follow:

<code>bower install <package-name> —save-dev</code>

e.g: <code>bower install jquery</code>

*.bowerrc file is used to apointing the destination folder of scripts downloaded by bower, in our case, appoint to bower_src on root project

###Grunt [http://bower.io/](http://bower.io/)

It’s our choice for task manager, follow to install:

<code>npm install -g grunt-cli</code>

Our base-project have package.json and Gruntfile.js fles previously configured, but, in case of need, just click here <[http://gruntjs.com/getting-started](http://gruntjs.com/getting-started)> and enjoy.

**We have three tasks pre configured:**

  *grunt default: Called on start of development. They create the favicons, call compass in one time, jshint, etc.
  *grunt watch: Called after default and will listen any change on js and scss, passing jshint, concatenet and uglifing these files.
  *grunt prod: Called only on deploy to pdoruction enviroment

**By default, use it:**

  grunt default: On first moment of work
  grunt watch: After that and always on start work on the project

###Compass

[http://compass-style.org/](http://compass-style.org/)

Our choice to boost the good and old css, compass is a sass framework to improve work of css.

In our base-project Compass will fired by Grunt and no need extra calling to single that.
