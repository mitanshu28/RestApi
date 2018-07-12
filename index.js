var http = require('http');
var url = require('url');
var data = require('./data.json');
var array = [];
var flag=false;
http.createServer(function (request, response) {
  response.writeHead(200, {
    'Content-type': 'text/plain'
  });
  
  //response.end();
  



  const {pathname,query} = url.parse(request.url);
  console.log(data[0].name);
  console.log("pathname", pathname);
  console.log("queryParameters", query);
  
  if(pathname=="/people"){
    if (query.indexOf("name=") >=0 && !(query.indexOf("mass=")>=0))
    {

      var i;
      var a=query.indexOf("%22");
      var b=query.indexOf("%22",a+1);
      
      var s=query.slice(a+3,b);
      for(i=0;i<data.length;i++)
      
      {
         var ap=data[i].name;
         if(ap.indexOf(s)>=0){
           flag=true;
           array.push(data[i]);
         }
      }
     
    }
    else if((query.indexOf("mass=")>=0 ||query.indexOf("mass=")>=0) && !(query.indexOf("name=") >=0))
    {
      var theString = query;
      var length=theString.split(":").length - 1;
      if(length==1)
      {
        var a=query.indexOf("%22");
        var b=query.indexOf("%22",a+1);
        var s=theString.slice(a+3,b);
        
        if(s=="lt")
        {
          var sa=query.indexOf(":");
          var p=query.slice(sa+1,-1);
          for(i=0;i<data.length;i++){
            ap=data[i].mass;
            if(parseInt(ap)<parseInt(p))
            {
              flag=true;
              array.push(data[i]);
            }
          }
      
          
        }
        if(s=="gt")
        {
          var sa=query.indexOf(":");
          var p=query.slice(sa+1,-1);
          for(i=0;i<data.length;i++){
            ap=data[i].mass;
            if(parseInt(ap)>parseInt(p))
            {
              flag=true;
              array.push(data[i]);
            }
          }
        }
       
      }
      if(length==2)
      {
        var as=query.indexOf(",");
        var se1=query.indexOf(":");
        var se2=query.indexOf(":",se1+1);
        var string=query;
        var sd1=string.slice(se1+1,as);
        var sd2=string.slice(se2+1,-1);
        for(i=0;i<data.length;i++){
          ap=data[i].mass;
          
          if(parseInt(ap)<parseInt(sd1) && parseInt(ap)>parseInt(sd2))
          {
            flag=true;
            
            array.push(data[i]);
          }
        }
        


      }

      

      
    }
    else if(query.indexOf("name=") >=0 && (query.indexOf("mass=")>=0|| query.indexOf("mass=")>=0))
  {
      var theString = query;
      var length=theString.split(":").length - 1;

      if(length==1)
      {
        var ae=query.indexOf(":");
        var ee=query;
        var sw=ee.slice(ae-5,ae-3);
        var fa=query.indexOf("}");
        var value=query.slice(ae+1,fa);
        console.log(value);

        var op=query.indexOf("name=");
        var sp1=query.indexOf("%22",op);
        var sp2=query.indexOf("%22",sp1+1);
        var ad=query.slice(sp1+3,sp2);
       
        if( sw=="gt")
        {
          for(i=0;i<data.length;i++)
      
       {
         var ap=data[i].name;
         if(ap==ad && parseInt(data[i].mass)>parseInt(value))
         {
           flag=true;
           array.push(data[i]);
         }
       }
        }
        if(sw=="lt")
        {
          
          for(i=0;i<data.length;i++)
      
          {
            var ap=data[i].name;
            if(ap.indexOf(ad)>=0 && parseInt(data[i].mass)<parseInt(value))
            {
              flag=true;
              array.push(data[i]);
              
            }
          }
        }
      }
      if(length==2)
      {
        var as=query.indexOf(",");
        var se1=query.indexOf(":");
        var se2=query.indexOf(":",se1+1);
        var string=query;
        var sd1=string.slice(se1+1,as);
        var ff=string.indexOf("}");
        var sd2=string.slice(se2+1,ff);

        var op=query.indexOf("name=");
        var sp1=query.indexOf("%22",op);
        var sp2=query.indexOf("%22",sp1+1);
        var ad=query.slice(sp1+3,sp2);
        
        for(i=0;i<data.length;i++)
      
          {
            var ap=data[i].name;
            if(ap.indexOf(ad)>=0 && parseInt(data[i].mass)<parseInt(sd1) && parseInt(data[i].mass)>(sd2))
            {
              flag=true;
              array.push(data[i]);
              
            }
          }
        
      }
      
    }
  }

  
  if(flag==false){
    
    response.writeHead(400, {
      'Content-type': 'text/plain'
      
    });
    
    response.end();
  }
  
  else{
  response.writeHead(200,{
    'Content-type':'application/json'
  });
  
  flag=0;
  var ii;
  for(ii=0;ii<array.length;ii++){
    response.write(JSON.stringify(array[ii],null,"\t"));
    
  }
  
  array=[];
  response.end();
}

}).listen(7000);
