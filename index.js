const Joi = require('joi');
const express =require('express');
const app = express();
app.use (express.json());
const courses =[
{id:1,name:'course 1'},
{id:2,name:'course 2'},
{id:3,name:'course 3'}

];

app.get('/',(req,res) =>{


    res.send('Hello World!!');

});

/////////////////////////////////////
app.post('/api/courses',(req,res)=>{

const schema = Joi.object({
    name: Joi.string().min(3).required()
}); 
const result =schema.validate(req.body);
console.log(result);

if(result.error)
{

    res.status(400).send(result.error.details[0].message);
    return;
}

const course ={
id:courses.length+1,
name: req.body.name


};
courses.push(course);
res.send(course);


});


app.put('/api/courses/:id',(req,res)=>{
    const course= courses.find(c=>c.id== parseInt(req.params.id))

    if(!course) res.status(404).send('The course has not found');
   

    
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    }); 
    const result =schema.validate(req.body);
    console.log(result);

    if(result.error)
{

    res.status(400).send(result.error.details[0].message);
    return;
}


course.name=req.body.name;
res.send(course);





});
/////////////////////////////////


/////////////////////







////////////

    app.get('/api/courses',(req,res) =>{
        res.send(courses);

    });
    app.get('/api/course/:id',(req,res) =>
    {



  const course= courses.find(c=>c.id== parseInt(req.params.id))

  if(!course) res.status(404).send('The course has not found')
  res.send(course);


    


});
const port=process.env.PORT||3000;
app.listen(port,() => console.log(`listening to ${port}`));