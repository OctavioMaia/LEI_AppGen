var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the remarkable ${chalk.red('AppGen')} generator!`)
    );

    const prompts = [
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
      },/* ,
      {
        name: 'json',
        message: 'JSON file you wish to import',
        default: 'teaching.json'
      } */
      {
        name: 'collection',
        message: 'Do you wish to create a collection? (y/n) ',
        default: 'n'
      },
      {
        when: function (response) {
          return response.collection == 'y';
        },  
        name: 'collectionname',
        message: 'How should this collection be named? ',
        default: 'colletion'
      },
      {
        when: function (response) {
          return response.collectionname != '' && response.collection == 'y';
        },  
        name: 'collectioncrud',
        message: 'Should I create CRUD methods for this collection? (y/n) ',
        default: 'y'
      },
      {
        name: 'hasUsers',
        message: 'Should I implement register and login functions? (y/n) ',
        default: 'n'
      }
    ];

   return this.prompt(prompts).then(props => {
      this.dbName = props.dbName;
      this.dbHost = props.dbHost;
      this.dbUser = props.dbUser;
      this.dbPassword = props.dbPassword;
      this.dbPort = props.dbPort;
      //this.json = props.json;
      this.collectionname = props.collectionname;
      this.collectioncrud = props.collectioncrud;
      this.hasUsers = props.hasUsers;
    });
  }

 
  writing() {
    this.fs.copyTpl(
      this.templatePath('_server.js'),
      this.destinationPath('public/server.js'),
      { dbName: this.dbName,
        dbHost: this.dbHost,
        dbUser: this.dbUser,
        dbPort: this.dbPort,
        dbPassword: this.dbPassword,
        //json: this.json
        collectionname: this.collectionname,
        collectioncrud: this.collectioncrud,
        hasUsers: this.hasUsers
      }
    );
  }
};
