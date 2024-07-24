document.addEventListener("DOMContentLoaded",()=>{
    const taskInput=document.getElementById("new-task")
    const addButton=document.getElementById("add-task-button")

    const apiUrl="https://jsonplaceholder.typicode.com/todos"
    addButton.addEventListener("click",function(){
        let taskText=taskInput.value.trim()
        if(taskText!== "")
        {
            addTask(taskText)
            taskInput.value=""
        }
    })
    
    //function to add the element
    function addTask(taskText)
    {
        //database
        const newTask={
            title: taskText,
            completed: false
        }
        //fetch is used to call the data from the database
        fetch(apiUrl,{
            //adding data to the database
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            //create own object in the database
            body:JSON.stringify(newTask),
        })
        .then((response)=>response.json())
        .then((task)=>{
            console.log(task)
            displayTask(task.title,task.id)
        }).catch(error => console.error("Failed during task",error))
    }
})