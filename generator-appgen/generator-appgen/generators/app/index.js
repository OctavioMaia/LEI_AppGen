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
        default: 'myDb'
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
        type: 'confirm',
        name: 'useHeroku',
        message: 'Will you be using heroku?',
        default: true
      },
      {
        type: 'confirm',
        name: 'useHeroku',
        message: 'Import your collection',
        default: true
      }
    ];

   return this.prompt(prompts).then(props => {
      this.dbName = props.dbName;
      this.dbHost = props.dbHost;
      this.dbUser = props.dbUser;
      this.dbPassword = props.dbPassword;
      this.dbPort = props.dbPort;
      this.useHeroku = props.useHeroku;
    });
  }

 
  writing() {
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    );
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
        useHeroku: this.useHeroku}
    );
  }

  install() {
    //console.log('Installing dependencies...');
    //this.installDependencies();
  }
};
