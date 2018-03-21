var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var ejs = require('ejs')

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the remarkable ${chalk.red('generator-appgen')} generator!`)
    );

    const prompts = [
      {
        name: 'dbName',
        message: 'Database Name',
        default: 'local'
      },
      {
        name: 'dbHost',
        message: 'Database Host',
        default: 'localhost'
      },
      {
        name: 'dbUser',
        message: 'Database User',
        default: ''
      },
      {
        type: 'password',
        name: 'dbPassword',
        message: 'Database Password',
        default: ''
      },
      {
        name: 'dbPort',
        message: 'Database Port',
        default: 27017
      },
      {
        name: 'json',
        message: 'JSON file you wish to import',
        default: 'teaching.json'
      }
    ];

   return this.prompt(prompts).then(props => {
      this.dbName = props.dbName;
      this.dbHost = props.dbHost;
      this.dbUser = props.dbUser;
      this.dbPassword = props.dbPassword;
      this.dbPort = props.dbPort;
      this.json = props.json;
    });
  }

 
  writing() {
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('public/index.html'),
      { title: this.dbName,
        italic: this.dbHost,
        title2: this.dbUser}
    );
    this.fs.copyTpl(
      this.templatePath('_server.js'),
      this.destinationPath('public/server.js'),
      { dbName: this.dbName,
        dbHost: this.dbHost,
        dbUser: this.dbUser,
        dbPort: this.dbPort,
        dbPassword: this.dbPassword,
        json: this.json
      }
    );
  }
};
