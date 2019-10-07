# reactFromScratch


This is a small app that uses webpack and babel to create a react app

Steps performed to generate this app:
 npm init -y

 npm install react react-dom

 Create app structure
   |- app
       |- index.css
       |- index.html
       |- index.js

 npm install --save-dev @babel/core @babel/preset-env @babel/preset-react webpack webpack-cli webpack-dev-server babel-loader css-loader style-loader html-webpack-plugin

 Add webpack.config.js this uses common js to export an object that will contain the configuration for webpack

#Edit webpack.config.js

Add build and start scripts in config file

#Run this app

##npm install
##npm start
