{
    var collection;
    var schema;
  	var write = "";
    var comma = "";
    var result=[];
    var fields =[];
    var i = 0;
    var edit = "";
    }
Col
	= "{" _ ColOp+ _ "}" _
    {
	
    return result ;
	}
    
ColOp
	= (_ "entity:") List
    {
    result.push([schema,write]);
    write = "";
    }
    
List
	= _ "[" _ (ListFields)+ "]"
    {
    //{
    write = write + "];\n\tres.render('processNewForm',{title: 'Form',reqs,href:'/insertmenu/"+schema+"Form/processNew"+schema+"'});\n});\n\n"
   			+ "router.post('/processNew"+schema+"', function(req, res, next) {\n\t"
            + "if (req.body) {\n\t\tvar form;\n\t\tvar name;\n\n\t\t"
            + "form = new schema();\n\n\t\tif(form != undefined){\n\t\t\t"
            + "form.Type = '"+ schema +"'\n\t\t\t"
            for(var j =0; j<i; j++){
                  write = write + "form." + fields[j] + " = req.body." + fields[j] + ";\n\t\t\t"
            }
            //{{{{{{{{{{{{{{{{{
            write = write + "}\n\t\tschema.collection.insert(form, function(err,docs) {\n\t\t"
            + "if (err) {\n\t\t\tvar message = 'Failed to create form!'"
            + "\n\t\t\tres.render('error', {\n\t\t\t\t'Title': 'Error', \n\t\t\t\t message\n\t\t\t});"
            + "\n\t\t} else {\n\t\t\tvar message = '" + schema + " inserted with success!'"
            + "\n\t\t\tvar href ='/insertmenu'\n\t\t\tres.render('success',{\n\t\t\t\t'Title': 'Success!',"
            + "\n\t\t\t\tmessage,\n\t\t\t\thref\n\t\t\t});\n\t\t}\n\t\t});"
            + "\n\t}else{\n\t\tvar err = new Error('Unknown Type' + req.body);\n\t\t"
            + "err.status = 404;\n\t\tnext(err);\n\t}\n});"
            edit = edit + "\n\nrouter.get('/edit" + schema + "Schema/:id', function(req,res){"
            + "\n\tvar id = req.params.id"
    		+ "\n\tobjectID = new ObjectID(id);"
            + "\n\tmongoose.Promise = global.Promise"
            + "\n\tmongoose.connect(configDB.url);"
            + "\n\tvar connection = mongoose.connection;"
    		+ "\n\tconnection.on('error', console.error.bind(console, 'connection error:'));"
    		+ "\n\tconnection.once('open', function() {"
        	+ "\n\t\tmongoose.connection.db.collection('posts', function(err, collection){"
            + "\n\t\t\tif(!err){"
            + "\n\t\t\tcollection.find({_id:objectID}).toArray(function(err, data){"
            + "\n\t\t\t\tif(!err){"
            + "\n\t\t\t\t\tres.render('editForm', {"
            + "\n\t\t\t\t\t\ttitle: 'Edit',"
			+ "\n\t\t\t\t\t\treqs: data[0],"
			+ "\n\t\t\t\t\t\thref:'/insertmenu/" + schema + "Form/edit" + schema + "/'+id"	
            + "\n\t\t\t\t\t});\n\t\t\t\t\t}\n\t\t\t\t\telse\n\t\t\t\t\t\tconsole.log(err)"
            + "\n\t\t\t\t})\n\t\t\t}else{\n\t\t\t\tconsole.log(err)\n\t\t\t}\n\t\t});\n\t});\n});"
            edit = edit + "\nrouter.post('/edit"+ schema + "/:id', function(req, res, next) {"
            + "\n\tvar id = req.params.id\n\tif (req.body) {\n\t\tvar form;\n\t\tvar name;"
            + "\n\t\tform = new schema();\n\t\tobjectID = new ObjectID(id);"
		    + "\n\t\tmongoose.Promise = global.Promise\n\t\tmongoose.connect(configDB.url);"
            + "\n\t\tvar connection = mongoose.connection;"
	        + "\n\t\tconnection.on('error', console.error.bind(console, 'connection error:'));"
		    + "\n\t\tconnection.once('open', function() {"
			+ "\n\t\t\tmongoose.connection.db.collection('posts', function(err, collection){"
			+ "\n\t\t\t\tif(!err){"
			+ "\n\t\t\t\t\tcollection.find({_id:objectID}).toArray(function(err, data){"
			+ "\n\t\t\t\t\t\tif(!err){"
			+ "\n\t\t\t\t\t\t\tif(form != undefined){"
            + "\n\t\t\t\t\t\t\t\tform.Type = data[0].Type;";
            for(var j =0; j<i; j++){
                  edit = edit + "form." + fields[j] + " = req.body." + fields[j] + ";\n\t\t\t\t\t\t\t\t"
            }
            edit = edit + "\n\t\t\t\t\t\t\t}"
			+ "\n\t\t\t\t\t\t\tcollection.remove({_id:objectID})"
			+ "\n\t\t\t\t\t\t\tschema.collection.insert(form, function(err,docs) {"
			+ "\n\t\t\t\t\t\t\t\tif (err) {"
			+ "\n\t\t\t\t\t\t\t\t\tvar message = 'Failed to edit form!'"
			+ "\n\t\t\t\t\t\t\t\t\tres.render('error', {"
			+ "\n\t\t\t\t\t\t\t\t\t\t'Title': 'Error',"
            + "\n\t\t\t\t\t\t\t\t\t\tmessage"
			+ "\n\t\t\t\t\t\t\t\t\t});\n\t\t\t\t\t\t\t\t} else {"
            + "\n\t\t\t\t\t\t\t\t\tvar message = 'Edited with success!'"
			+ "\n\t\t\t\t\t\t\t\t\tvar href ='/list'"
			+ "\n\t\t\t\t\t\t\t\t\tres.render('success',{"
			+ "\n\t\t\t\t\t\t\t\t\t\t'Title': 'Success!',"
			+ "\n\t\t\t\t\t\t\t\t\t\tmessage,"
			+ "\n\t\t\t\t\t\t\t\t\t\thref"
			+ "\n\t\t\t\t\t\t\t\t\t});\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t});"
		    + "\n\t\t\t\t\t\t}\n\t\t\t\t\t\telse\n\t\t\t\t\t\t\tconsole.log(err)"
			+ "\n\t\t\t\t\t})\n\t\t\t\t}else{\n\t\t\t\t\tconsole.log(err)"
			+ "\n\t\t\t\t}\n\t\t\t});\n\t\t});"
			+ "\n\t}else{\n\t\tvar err = new Error('Unknown Type' + req.body);"
		    + "\n\t\terr.status = 404;\n\t\tnext(err);\n\t}\n});"
            write = write + edit;
            edit = "";
            write = write + "\n\nmodule.exports = router;"
            //}}}}}}}}}}}}}}}}}
    }
    
ListFields
	= "{" field:Pal ":" ("'" / "[")? type:Pal ("'" / "]")? (Required)? "}" ("," {comma=","})? _ 
    {
    if(field=="schema") 
    	{
        schema = type
        write = write + "var schema = require('./../models/" + type + "Schema');\n\n"
        write = write + "var express = require('express');\nvar router = express.Router();\n\n"
        write = write + "var mongoose  = require('mongoose');\n"
        write = write + "var ObjectID = require('mongodb').ObjectID;\n"
        write = write + "var configDB  = require('./../config/database.js');\n\n"
        write = write + "router.get('/new" + type + "Schema', function(req,res){\n\tvar reqs=["

        //}
        }
    else if(field=="collection") {collection = type;}
    else if(type=="String") {
         fields[i]=field;
         i++;
         if(comma==","){
                      write = write + "{'type':'text','text':'" + field + "'},\n\t\t"
                      }
         else{
             write = write + "{'type':'text','text':'" + field + "'}\n\t\t"
             }
         //{}
         }
    else if(type=="Date") {
         fields[i]=field;
         i++;
         if(comma==","){
                      write = write + "{'type':'date','text':'" + field + "'},\n\t\t"
                      }
         else{
             write = write + "{'type':'date','text':'" + field + "'}\n\t\t"
             }
         //{}
         }
     else if(type=="File") {
         fields[i]=field;
         i++;
         if(comma==","){
                      write = write + "{'type':'file','text':'" + field + "'},\n\t\t"
                      }
         else{
             write = write + "{'type':'date','text':'" + field + "'}\n\t\t"
             }
         //{}
         }
    comma = "";
    
   	}
    
Required
	= "," _ "required:" TorF:Pal
	
Pal
	= ([a-zA-Z0-9])+
    { return text(); }
    
_ "whitespace"
  = [ \t\n\r]*