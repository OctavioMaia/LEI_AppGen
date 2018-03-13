'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const xml2js = require('xml2js');

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
      },
      {
        type: 'confirm',
        name: 'someAnswer',
        message: 'Would you like to parse a JSON file?',
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
    var parser = new xml2js.Parser();
    parser.parseString(xml, function(err, result) {
      if(!err){
        var resultados = result.courses.course;
        for(var item in resultados){
          console.log(resultados[item].name[0])
        }
        console.log('Done');
      }
    });
  }
};
