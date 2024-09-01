const fs = require('fs');
const { Command } = require('commander');
const path = require('path');
const program = new Command();

const filepath = path.join(__dirname, "todosfile.json");


function readData(){
  const data = fs.readFileSync(filepath, 'utf-8');
  return JSON.parse(data || "[]");
}

function writeData(tododata){
  fs.writeFile(filepath, JSON.stringify(tododata, null, 4), 'utf-8', function(err){
    if(err){
      console.log("Writing problem");
    }
  })
}

program
  .name('TODO CLI')
  .description('CLI to mimic todo app functionality')
  .version('0.8.0');


program.command('add')
  .description('Add a task to the todo list')
  .argument('<todotask>', 'Task to be added')
  .argument('<deadline>', 'Deadline for the task')

  .action((todotask, deadline) => {
    const obj = {
      "Task" : todotask,
      "Deadline" : deadline,
      "Completed" : false
    };
    const todosarr = readData();
    if(todosarr != undefined){
      todosarr.push(obj);
      writeData(todosarr);
    }
    else{
      arr = [];
      arr.push(obj);
      writeData(arr);
    }
  });



  program.command('remove')
  .description('Remove a task to the todo list')
  .argument('<todotask>', 'Task to be removed')
  .argument('<deadline>', 'Deadline for the task')

  .action((todotask, deadline) => {
    const todosarr = readData();
    if(todosarr){
      const newtodosarr = todosarr.filter(taski => taski.Task !== todotask);
      if(newtodosarr.length === todosarr.length){
        console.log("Task does not exist");
      }
      else{
        writeData(newtodosarr);
      }
    }
    else{
      console.log("Task does not exist");
    }
  });



  program.command('mark')
  .description('Mark a task as done to the todo list')
  .argument('<todotask>', 'Task to be removed')
  .argument('<deadline>', 'Deadline for the task')

  .action((todotask, deadline) => {
    let todosarr = readData();
    let foundtask = false;
    if(todosarr){
      todosarr = todosarr.map(function(ele){
        if(ele.Task === todotask){
          ele.Completed = true;
          foundtask = true;
        }
        return ele;
      })

      if(foundtask){
        writeData(todosarr);
      }
      else{
        console.log("Task does not exist");
      }
    }
    else{
      console.log("Task does not exist");
    }
  });


  program.command('extend')
  .description('Extend deadline for the given task')
  .argument('<todotask>', 'Task to be removed')
  .argument('<newdeadline>','New deadline for the task')

  .action((todotask, newdeadline) => {
    let todosarr = readData();
    let foundtask = false;
    if(todosarr){
      todosarr = todosarr.map(function(ele){
        if(ele.Task === todotask){
          ele.Deadline = newdeadline;
          foundtask = true;
        }
        return ele;
      })

      if(foundtask){
        writeData(todosarr);
      }
      else{
        console.log("Task does not exist");
      }
    }
    else{
      console.log("Task does not exist");
    }
  });


  program.command('view')
  .description('View all tasks')

  .action(() => {
    let todosarr = readData();
    console.log(todosarr);
  });






  program.parse();








