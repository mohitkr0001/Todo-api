var express=require('express');
var app=express();
var port=process.env.PORT || 3000;
var todos=[{
  id:1,
  description:'homework',
  complete:false
},
{
  id:2,
  description:'Ground',
  complete:false
},
{
  id:3,
  description:'coding',
  complete:false
}]

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



app.listen(port,function(){
  console.log('Sevver start working on port no: ' + port);
});
