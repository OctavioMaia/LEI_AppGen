{
    var collection;
    var schema;
  	var write = "";
    var comma = "";
    var result=[];
    var fields = [];
    var i = 0;
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
            //{{{{{{{{{
            write = write + "}\n\t\tschema.collection.insert(form, function(err,docs) {\n\t\t"
            + "if (err) {\n\t\t\tvar message = 'Failed to create form!'"
            + "\n\t\t\tres.render('error', {\n\t\t\t\t'Title': 'Error', \n\t\t\t\t message\n\t\t\t});"
            + "\n\t\t} else {\n\t\t\tvar message = 'Form created with success!'"
            + "\n\t\t\tvar href ='/insertmenu'\n\t\t\tres.render('success',{\n\t\t\t\t'Title': 'Success!',"
            + "\n\t\t\t\tmessage,\n\t\t\t\thref\n\t\t\t});\n\t\t}\n\t\t});"
            + "\n\t}else{\n\t\tvar err = new Error('Unknown Type' + req.body);\n\t\t"
            + "err.status = 404;\n\t\tnext(err);\n\t}\n});\n\nmodule.exports = router;"
            //}}}}}}}}}
    }
    
ListFields
	= "{" field:Pal ":" ("'" / "[")? type:Pal ("'" / "]")? (Required)? "}" ("," {comma=","})? _ 
    {
    if(field=="schema") 
    	{
        schema = type
        write = write + "var schema = require('./../models/" + type + "Schema');\n\n"
        write = write + "var express = require('express');\nvar router = express.Router();\n\n"
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