#Base project

1. [Start to use](https://github.com/andremachadodev/base-project#start-to-use)
2. [Installing the third party tools](https://github.com/andremachadodev/base-project#installing-the-tools)

<a name="start-to-use"></a>
##Start to use

The project requires the following dependencies:

1. NodeJS
2. NPM
3. Bower
4. GruntJS
5. Compass

<a name="installing-the-tools"></a>
##Installing the third party tools

###NodeJS

[https://nodejs.org/download/](https://nodejs.org/download/)

###NPM

[https://www.npmjs.com/](https://www.npmjs.com/)

###Bower

[http://bower.io/](http://bower.io/)

It’s your choice to dependencies management, follow to install:

<code>npm install -g bower</code>

To start a new bower project (unusual in our context, because the bower.json is already in repository)

<code>bower init</code>

To list all dependencies already on bower.json file:

<code>bower list</code>

To install dependencies already on bower.json file:

<code>bower install</code>

To install a new package:

<code>bower install <package-name> —save-dev</code>

e.g: <code>bower install jquery</code>

*.bowerrc file is used to appointing the destination folder of scripts downloaded by bower, in our case, is pointing to to /bower_src

###Grunt

[http://bower.io/](http://bower.io/)

It’s our choice for task manager:

<code>npm install -g grunt-cli</code>

Our base-project have package.json and Gruntfile.js files previously configured, but, in case of need, just click here <[http://gruntjs.com/getting-started](http://gruntjs.com/getting-started)> and enjoy.

**We have three tasks pre configured:**

  **grunt default:** Called on start of development. They create the favicons, call compass in one single time, jshint, etc
  **grunt watch:** Called after task default and will listen any change on js and scss, triggering jshint, concatenate and uglify these files
  **grunt prod:** Called only on deploy to production enviroment

**By default, use it:**

  **grunt default:** On first moment of work
  **grunt watch:** After that and always that starting the work

###Compass

[http://compass-style.org/](http://compass-style.org/)

Our choice to boost the good and old css, compass is a sass framework, used to improve the work with css.

Na nossa base de projeto-Compass vai disparado por Grunt e não há necessidade de chamada extra para executar
