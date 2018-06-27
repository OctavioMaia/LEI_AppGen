{
    var collection;
    var schema;
    var req = '';
  	var write =  "var mongoose = require('mongoose'); \n" +
    "var Schema   = mongoose.Schema; \n\n";
    }
Col
	= "{" _ ColOp+ _ "}" _
    {
    //{
    write = write + "})\n\n module.exports = mongoose.model('"
    + schema + "', " + schema + "Schema, '" + collection + "');";
    return write ;
	}
    
ColOp
	= (_ "entity:" / _ "insert:") List
    
    
List
	= _ "[" _ (ListFields)+ "]"
    
ListFields
	= "{" field:Pal ":" ("'")? type:Pal ("'")? (Required)? "}" (",")? _ 
    {
    if(field=="schema") 
    	{
        
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
              