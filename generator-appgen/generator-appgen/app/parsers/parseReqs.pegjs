{
    var requires = "";
    }
Col
	= "{" _ ColOp+ _ "}" _
    {
 
    return requires ;
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

        requires = requires + "var " + type +"Form = require('./app/"+ type +"Router');\n";

        }

   	}
    
Required
	= "," _ "required:" TorF:Pal

	
Pal
	= ([\[a-zA-Z0-9\]])+
    { return text(); }
    
   
_ "whitespace"
  = [ \t\n\r]*
              