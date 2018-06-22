var Generator = require('yeoman-generator');
var chalk     = require('chalk');
var yosay     = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the remarkable ${chalk.red('AppGen')} generator!`)
    );

    const prompts = [
      {
        name: 'appName',
        message: 'How should your application be called?'
      },
      {
        name: 'dbName',
        message: 'Database Name',
        default: 'appgen'
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
        name: 'collectioncrud',
        message: 'Should I create CRUD methods? (y/n) ',
        default: 'y'
      },
      {
        when: function (response) {
          return response.collectioncrud=='y';
        },  
        name: 'collectionschema',
        message: 'Which file(s) should I use to generate the schema? (ensure the file is located in the root folder) ',
        default: 'example1,example2'
      },
      {
        name: 'hasUsers',
        message: 'Do you wish to support users in your app? (y/n) ',
        default: 'n'
      },
      {
        when: function (response) {
          return response.hasUsers == 'y';
        },  
        name: 'localLogin',
        message: 'Should I implement local register and login functions? (y/n) ',
        default: 'n'
      },
      {
        when: function (response) {
          return response.hasUsers == 'y';
        },  
        name: 'googleFacebookLogin',
        message: 'Should I implement login functions via Google+ and Facebook? (y/n) ',
        default: 'n'
      }
    ];

   return this.prompt(prompts).then(props => {
      this.appName = props.appName;
      this.dbName = props.dbName;
      this.dbHost = props.dbHost;
      this.dbUser = props.dbUser;
      this.dbPassword = props.dbPassword;
      this.dbPort = props.dbPort;
      this.collectioncrud = props.collectioncrud;
      this.collectionschema = props.collectionschema;
      this.localLogin = props.localLogin;
      this.googleFacebookLogin = props.googleFacebookLogin;
      this.localLogin = props.localLogin;
      this.hasUsers = props.hasUsers;
    });
  }

 
  writing() {
    this.fs.copyTpl(
      this.templatePath('_server.js'),
      this.destinationPath('server.js'),
      { appName: this.appName,
        dbName: this.dbName,
        dbHost: this.dbHost,
        dbUser: this.dbUser,
        dbPort: this.dbPort,
        dbPassword: this.dbPassword,
        collectioncrud: this.collectioncrud,
        collectionschema: this.collectionschema,
        localLogin: this.localLogin,
        googleFacebookLogin: this.googleFacebookLogin,
        hasUsers : this.hasUsers
      }
    );
  }
};
