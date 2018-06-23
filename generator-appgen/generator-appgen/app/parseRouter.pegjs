{
    var collection;
    var schema;
  	var write = "";
    var comma = "";
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
    write = write + "];\n\tres.render('processNewForm',reqs);"
    }
    
ListFields
	= "{" field:Pal ":" ("'" / "[")? type:Pal ("'" / "]")? (Required)? "}" ("," {comma=","})? _ 
    {
    if(field=="schema") 
    	{
        write = write + "var schema = require('../app/models/" + type + "Schema');\n\n"
        write = write + "var express = require('express');\nvar router = express.Router();\n"
        write = write + "router.get('/new" + type + "Schema, function(req,res){\n\tvar reqs=["
        //}
        }
    else if(field=="collection") {collection = type;}
    else if(type=="String") {
         if(comma==","){
                      write = write + "{'type':'text','text':'" + field + "'},\n\t\t"
                      }
         else{
             write = write + "{'type':'text','text':'" + field + "'}\n\t\t"
             }
         //{}
         }
    else if(type=="Date") {
         if(comma==","){
                      write = write + "{'type':'date','text':'" + field + "'},\n\t\t"
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