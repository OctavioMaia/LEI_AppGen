{
  var write= "[";
  var comma = "";
  }
  
Col
	= "{" _ ColOp+ _ "}" _
    {
    write = write + "]";
    return write;
    }
    
ColOp
	= (_ "ops:") List
    
    
List
	= _ "[" _ (ListFields)+ "]"
    
ListFields
	= "{" field:Pal ":" ("[")? type:Pal ("]")? (Required)? "}" (","{ comma=","})? _
    {
    write = write + field + ":" + type + comma;
    comma = "";
    }
    
Required
	= "," _ "required:" TorF:Pal
    
Bracket
	= ("[")?
    { return text(); }
    
Pal
	= ([a-zA-Z0-9])+
    { return text(); }
    

    
_ "whitespace"
  = [ \t\n\r]*