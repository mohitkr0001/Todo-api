var express=require('express');
var app=express();
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
  var matchedItem;
  todos.forEach((todo) => {
    if(todoId===todo.id){
      matchedItem=todo;
    }
  });

  if(matchedItem){
    res.json(matchedItem);
  }
  else{
    res.status(404).send();
  }
});

app.post('/todos',(req,res) => {
  let bodyElement=req.body;
  bodyElement.id=bodyId++;
  todos.push(bodyElement)
  res.json(todos);
});

app.listen(port,function(){
  console.log('Sevver start working on port no: ' + port);
});
