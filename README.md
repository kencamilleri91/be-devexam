# Betting Entertainment Tech Test
## Kenneth Camilleri

### Introduction & Explanation of project structure
* This project is a simple example to demonstrate a simple app where clicking on a central 400x200 square triggers an AJAX call to colr.org to retrieve a random color, and then moves a ball within a rounded rectangle between four states (top left, top right, bottom right, bottom left) in order via animation.
* This is heavily based on webpack, and comes in two build modes - development and production.
* With how this is set up, in development mode a server is hosted locally without having to re-build all dependencies such as react, which would otherwise take long. In addition, this takes advantage of hot reloading middleware, which is enabled or disabled depending on the process.env.NODE_ENV variable passed (which is set to 'development' in dev mode). With hot reloading, saving the source automatically attempts to rebuild and even effect the changes within the browser.
* The production build will exclude code such as hot reloading, and in addition, will minify/uglify the code. This mode produces the actual files to be uploaded to the static directory of a web server.
* This project relies on the React framework with a lightweight addition to state management called react-mobx. These are being used solely to demonstrate their use and how they can make code a lot more scalable. Mobx also offers the advantage of centralizing state management within a "Store", without requiring the extreme boilerplate that would otherwise be required when going react-redux.
* Using mobx I've demonstrated in this project how splitting component state versus overall state can be so powerful. Within BetentStore.js, the hex color of the entire app is kept in mind, and updated every time colr.org is called. However, if you go to TestPage.js and set 'enableExtraBallContainerForExperimentationPurposes' to true, you will enable a second container which has its own independent state for where the ball is, but shares the same hex color.
* The .eslintrc file is used to specify how Syntax Check should be done. Since we have an eslint preLoader in our webpack.config.js, every time we change a JS file, eslint will be called according to the configuration of .eslintrc
* This project, via babel, allows writing code in EcmaScript 2015 (certain things like import would otherwise not work)
* In addition, this also uses experimental decorators, such as the @action or @observable from mobx, made possible via transform-class-properties and babel-plugin-transform-decorators-legacy specified in .babelrc, and added as a loader in the webpack.config.js
* This project also demonstrates the use of mixins, SCSS calculation functions such as percentage() and the nested nature of SCSS. In addition, note that vendor prefixes do not need to be manually included in the SCSS file, since this is automatically done in prodction build mode via autoprefixr

### Running the dev server (Ubuntu)
* On Ubuntu, clone to this repository with the following command:
	git clone https://github.com/kencamilleri91/be-devexam.git
* Make sure npm is installed
	sudo apt-get install npm
* Extract project files to a local directory
* cd to the directory that the project was cloned in
* Make sure all dependencies are installed by:
	npm install
* Start the dev server with:
	npm run start-server
* In your browser, visit the following URL:
	http://localhost:3001
* While the dev server is running, webpack will be watching for any changes made to the src folder by using the "preLoaders" and "loaders" to determine which files to watch and what to do (much like the equivalent to starting watch tasks via gulp)

### Making a production build
* npm run build-production
* Copy the img and fonts folders into the web-server hosting static directory of your choice, such as in the htdocs folder of xampp for Windows
* Copy the contents (from inside) the dist folder into the web-server hosting static directory - there should be a html file and a JS file
* Visit your web server to view the production-builded version

### Syntax checking
* In order to be able to check for syntax, the .eslintrc file is there to configure what should count as an error, warning or to be ignored
* Syntax checking is embedded within this project boilerplate via webpack