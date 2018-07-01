{
    var collection;
    var schema;
    var result=[];
    var req = '';
  	var write =  "";
    }
Col
	= "{" _ ColOp+ _ "}" _
    {

    return result ;
	}
    
ColOp
	= (_ "entity:" / _ "insert:") List
    {
    //{
    write = write + "})\n\n module.exports = mongoose.model('"
    + schema + "', " + schema + "Schema, '" + collection + "');\n\n";
    result.push([schema,write]);
    write = "";
    }
    
    
List
	= _ "[" _ (ListFields)+ "]"
    
ListFields
	= "{" field:Pal ":" ("'")? type:Pal ("'")? (Required)? "}" (",")? _ 
    {
    if(field=="schema") 
    	{
        write = write + "var mongoose = require('mongoose'); \n" +
    "var Schema   = mongoose.Schema; \n\n";
    	write = write + "var " + type+ "Schema = new Schema({\n";
        schema = type;
        }
    else if(field=="collection") {collection = type;}
    else {write = write + '\t' + field + ": {type: " + type + req + "},\n"
    	  req = "";}
    //"}";
   	}
    
Required
	= "," _ "required:" TorF:Pal
    {
    if(TorF == "True" ||TorF == "true") 
    					{	
                        	req = ", required: true"
                         }
    if(TorF == "False" ||TorF == "false") 
    					{	
                        	req = ", required: false"
                         }
    }
	
Pal
	= ([\[a-zA-Z0-9\]])+
    { return text(); }
    
   
_ "whitespace"
  = [ \t\n\r]*
              