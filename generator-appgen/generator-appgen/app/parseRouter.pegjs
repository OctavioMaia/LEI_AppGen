{
    var collection;
    var schema;
  	var write = "";
    var comma = "";
    var fields = [];
    var i = 0;
    }
Col
	= "{" _ ColOp+ _ "}" _
    {

    return write ;
	}
    
ColOp
	= (_ "entity:") List
    
    
List
	= _ "[" _ (ListFields)+ "]"
    {
    //{
    write = write + "];\n\tres.render('processNewForm',reqs);\n});\n\n"
   			+ "router.post('/processNewForm', function(req, res, next) {\n\t"
            + "if (req.body.Type) {\n\t\t var form;\n\t\t var name;\n\n\t\t"
            + " form = new schema();\n\n\t\tif(form != undefined){\n\t\t\t"
            for(var j =0; j<i; j++){
                  write = write + "form." + fields[j] + " = req.body." + fields[j] + ";\n\t\t\t"
            }
            //{{{{{{{{{
            write = write + "}\n\t\tschema.collection(form, function(err,docs) {\n\t\t"
            + "if (err) {\n\t\t\tvar message = form.type + 'has failed to create form!'"
            + "\n\t\t\tres.render('error', {\n\t\t\t\t'Title': 'Error', \n\t\t\t\t message\n\t\t\t});"
            + "\n\t\t} else {\n\t\t\tvar message = form.type + 'has been created with success!'"
            + "\n\t\t\tvar href ='/insertmenu'\n\t\t\tres.render('success',{\n\t\t\t\t'Title': 'Success!',"
            + "\n\t\t\t\tmessage,\n\t\t\t\thref\n\t\t\t});\n\t\t}\n\t\t});"
            + "\n\t}else{\n\t\tvar err = new Error('Unknown Type' + req.body.Type);\n\t\t"
            + "err.status = 404;\n\t\tnext(err);\n\t}\n});"
            //}}}}}}}}}
    }
    
ListFields
	= "{" field:Pal ":" ("'" / "[")? type:Pal ("'" / "]")? (Required)? "}" ("," {comma=","})? _ 
    {
    if(field=="schema") 
    	{
        write = write + "var schema = require('../app/models/" + type + "Schema');\n\n"
        write = write + "var express = require('express');\nvar router = express.Router();\n"
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