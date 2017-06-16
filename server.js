var express=require('express');
var app=express();
var _=require('underscore');
var bodyParser=require('body-parser');
var port=process.env.PORT || 3000;
let bodyId=1;
var todos=[];

app.use(bodyParser.json());

app.get('/',function(req,res){
  res.send('Todo api just got working');
});

app.get('/todos',function(req,res){
  res.json(todos);
});

app.get('/todos/:id',function(req,res){
  let todoId=parseInt(req.params.id,10);

  var matchedItem=_.findWhere(todos,{id:todoId});

  if(matchedItem){
    res.json(matchedItem);
  }
  else{
    res.status(404).send();
  }
});

app.post('/todos',(req,res) => {
  let bodyElement=_.pick(req.body,'description','complete');
  if(!_.isBoolean(bodyElement.complete) || !_.isString(bodyElement.description) || bodyElement.description.trim().length===0){
  return  res.status(404).send();
  }

  bodyElement.id=bodyId++;
  todos.push(bodyElement)
  res.json(bodyElement);

});

app.listen(port,function(){
  console.log('Sevver start working on port no: ' + port);
});
