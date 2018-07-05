var Generator = require('yeoman-generator');
var chalk     = require('chalk');
var yosay     = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the remarkable ${chalk.red('StartApp')} generator!`)
    );

    const prompts = [
      {
        name: 'appName',
        message: 'How should your application be called?'
      },
      {
        name: 'dbName',
        message: 'Database Name',
        default: 'startapp'
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
        name: 'collectionschema',
        message: 'Which file should I use to generate CRUD methods? (ensure the file is located in the root folder) ',
        default: 'crud.txt'
      },
      {
        name: 'faq',
        message: 'Do you wish to have a FAQ section in your app? (y/n) ',
        default: 'n'
      },
      {
        when: function (response) {
          return response.faq=='y';
        },  
        name: 'faqPug',
        message: 'Which file should I use to generate the FAQ section? (ensure the file is located in the root folder) ',
        default: 'faq.txt'
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
      this.collectionschema = props.collectionschema;
      this.localLogin = props.localLogin;
      this.googleFacebookLogin = props.googleFacebookLogin;
      this.localLogin = props.localLogin;
      this.hasUsers = props.hasUsers;
      this.faq = props.faq;
      this.faqPug = props.faqPug;
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
        collectionschema: this.collectionschema,
        localLogin: this.localLogin,
        googleFacebookLogin: this.googleFacebookLogin,
        hasUsers : this.hasUsers,
        faq : this.faq,
        faqPug : this.faqPug
      }
    );
  }
};
