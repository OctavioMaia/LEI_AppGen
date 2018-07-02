{
    var result = "";
    var requires = "var express      = require('express');\n"+
                    "var router              = express.Router();\n"
    var uses = "";
    }
Col
	= "{" _ ColOp+ _ "}" _
    {
 	result= "\n" + requires +"\n" + uses + "\nmodule.exports = router;\n";
    return result ;
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

        requires = requires + "var " + type +"Form = require('./"+ type +"Router');\n";
		uses = uses + "router.use('/"+type+"Form', "+type+"Form);\n"
        }

   	}
    
Required
	= "," _ "required:" TorF:Pal

	
Pal
	= ([\[a-zA-Z0-9\]])+
    { return text(); }
    
   
_ "whitespace"
  = [ \t\n\r]*
              