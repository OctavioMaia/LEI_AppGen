'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const parser = require('xml-js');
const fs = require('fs');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the riveting ${chalk.red('generator-uc-parser')} generator!`)
    );

    const prompts = [
      {
        type: 'confirm',
        name: 'someAnswer',
        message: 'Would you like to parse a XML file?',
        default: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  paths() {
    var path = this.destinationPath('teaching.xml');
    var xml = this.fs.read(path);
    var json = parser.xml2json(xml, {compact: true, spaces: 4});
    
    fs.writeFile("teaching.json",json, function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("The file was saved!");
    }); 
  }
};