{
  var write = "";
  var i = 0;
  write = write + "extends layout\n\nblock content"
   + "\n  .container"
   + "\n    br\n    br\n    br"
   + "\n    .alert.alert-warning.alert-dismissible(role='alert')"
   + "\n      button.close(type='button', data-dismiss='alert')"
   + "\n        span(aria-hidden='true') ×"
   + "\n        span.sr-only Close"
   + "\n      |         This section contains a wealth of information, related to "
   + "\n      strong AppGen"
   + "\n      |  . If you cannot find an answer to your question,"
   + "\n      |         make sure to contact us."
   + "\n    br"
   + "\n    #accordion"
   + "\n      .faqHeader General questions"

}

    
Faq
   = "[" (_ Each _)+ "]"
   {
   return write;
   }
   
Each
   = "{" _ "\"" question:Pal "\"" ":" "\"" answer:Pal "\"" "}" (",")?
   {
   i++;
   write = write + "\n      .card"
   + "\n        .card-header"
   + "\n          h4.card-header"
   + "\n            a.accordion-toggle.collapsed(data-toggle='collapse', data-parent='#accordion', href='#collapse" + i + "') " + question
   + "\n        #collapse" + i + ".panel-collapse.collapse"
   + "\n          .card-block"
   + "\n            | " + answer
   
   }
   
Pal
   = ([a-zA-Z0-9Á-Ýá-ý](_)? (p)? )+
   { return text(); }


p 
 = [?!.,']*
 
_ "whitespace"
  = [ \t\n\r]*
              