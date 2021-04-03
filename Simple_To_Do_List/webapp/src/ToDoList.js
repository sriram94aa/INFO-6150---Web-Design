import React from 'react';
import './main.scss';

class  ToDoList extends React.Component{
constructor(props){
    super(props);console.log('Constructor');
    this.state = {
        showDiv: false,
        showList: false,
        titleInput:"",
        dueDateInput:"",
        descriptionInput:"",
        timeInput:"",
        data:props.result,
        class: false,
        currentDate: Date(),
        complete: "",
        buttonVal: "+ Add New List"
    }
    this.changeHandling = this.changeHandling.bind(this);
    
}
changeHandling=(event,field)=>{
        this.setState({
            [field]:event.target.value
        })
    }
// To Insert the Record to the Database.  
    sendValToDb = () =>{
        if(this.state.titleInput ==="" || 
            this.state.descriptionInput === "" ||
                 this.state.dueDateInput === "" ||
                    this.state.timeInput === ""){
                alert("Fields Cannot be empty!");
                return;
        }else{
            this.setState({
                showList: false
            })
            fetch('http://localhost:3003/todolist/',{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                            'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    title: this.state.titleInput,
                    description: this.state.descriptionInput,
                    dueDate: this.state.dueDateInput,
                    time: this.state.timeInput
                 })
            }).then(response => {
                console.log(response);
                })
                .catch(error =>{
                    alert(error);
                })
                this.setState({
                    titleInput:"",
                    dueDateInput:"",
                    descriptionInput:"",
                    timeInput:"",
                })
                this.fetchValFromDb();
        }
    }
    
    resetVal=() => {
        this.setState({
            titleInput:"",
            dueDateInput:"",
            descriptionInput:"",
            timeInput:"",
        })
    }

// To Fetch the value from the Database.
fetchValFromDb(){
    fetch('http://localhost:3003/todolist/', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      },
    }).then(response => response.json())
    .then(responseList => {
        this.setState({    
         data: responseList
      })
    })
    .catch(error => this.setState({ error }));
  }   
// To update the Database after Marking the task as completed
  updateDb (val,complete){
    console.log(val.id)
    fetch('http://localhost:3003/todolist/'+val.id,{
        method: 'PUT',
        headers: {
            Accept: 'application/json',
                    'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            title: val.title,
            description: val.description,
            dueDate: val.dueDate,
            time: val.time,
            completed: complete })
    }).then(response => {
            console.log(response)
        })
        .catch(error =>{
           alert(error)
        })
    
}

    showValues = (val) => {
        this.setState({
            showList: true,
            title: val.title,
            description: val.description,
            dueDate: val.dueDate.slice(0,10),
            time: val.time
        })
    }
    showAddNewList = () =>{
        if(this.state.buttonVal === "+ Add New List"){
            this.setState({
                buttonVal:"- Add New List"
            })  
        }else{
            this.setState({
                buttonVal:"+ Add New List"
            })  
        }
        this.setState({
            showDiv: !this.state.showDiv,
            showList: false,
            title:"",
            dueDate:"",
            description:"",
            time:"",
        })  
    }
    strike = (val) =>{
        if(document.getElementById(val.id).className===""){
            document.getElementById(val.id).className="strike";
            this.updateDb(val,true)
        }
         else{
            document.getElementById(val.id).className="";
            this.updateDb(val,false)
         }
    }
render(){
    if(this.props.result && this.props.result.length>0){
        if(this.state.data.length<this.props.result.length){
            this.setState({
                data:this.props.result
            })
        }
    }
    return(
        <div>
    <div className ="wrapper">
    <div className ="header">
      <h1>To-Do List for</h1>
      <div id="dateTime" className ="space">
                {this.state.currentDate.slice(0,16)}</div>
    </div>
    <div className ="add-task">
        <button className ="add-task-btn-top" onClick={this.showAddNewList}>{this.state.buttonVal}</button>
    </div>
    {/* Input Fields for To-Do List*/}
  {this.state.showDiv ? <div id="inputFieldDisplay">
        <div className ="add-task">
            <label className ="customLabel">Title:</label>
            <input id="titleInput" type="text"name="title" value={this.state.titleInput} onChange={(event)=>this.changeHandling(event,"titleInput")} />
        </div>
            <div className ="add-task">
                <label className ="customLabel">Description:</label>
                {/* eslint-disable-next-line */}
                <textarea className= "textArea" id="descriptionInput" type="text" name="description" value={this.state.descriptionInput}type="text" onChange={(event)=>this.changeHandling(event,"descriptionInput")}/>
            </div>
                <div className ="add-task">
                    <label className ="customLabel">Due Date:</label>
                    <input id="dueDateInput" className="increaseWidth" name="dueDate" type="date" value={this.state.dueDateInput} onChange={(event)=>this.changeHandling(event,"dueDateInput")}/>
                </div>
                    <div className ="add-task">
                        <label className ="customLabel">Time:</label>
                        <input id="timeInput" type="time" className="increaseWidth" name="time" value={this.state.timeInput} onChange={(event)=>this.changeHandling(event,"timeInput")}/>
                    </div>
                    <div className ="add-task">
                        <button className ="add-task-btn" onClick={this.sendValToDb}>Add</button>
                        <button className ="add-task-btn two" onClick={this.resetVal}>Reset</button>
                    </div>
     </div> : null}
    <div className ="task-list-header">
      <h2>Tasks</h2>
    </div>
    {/* Displaying the List--> */}
    <div className ="task-list-wrapper">
      <ul className ="task-list">
          {this.state.data && this.state.data.length ? this.state.data.map(c=> <li id={c.id} className={c.completed ? "strike":""} onClick={this.showValues.bind(this, c)}>{c.title}<span onClick={this.strike.bind(this,c)}>X</span></li>): null}</ul>
          
          {this.state.showList ?  <div className ="contentDisplay">
          <div className ="add-task">
            <label className ="leftMargin">Title:</label>
            <input id="title" className ="input1" value={this.state.title} type="text" disabled/>
          </div>
        <div className ="add-task">
            <label className ="leftMargin">Description:</label>
            <textarea className= "textArea" id="Description" value={this.state.description}type="text" disabled/>
        </div>
        <div className ="add-task">
            <label className ="leftMargin">Due Date:</label>
            <input className ="input2" value={this.state.dueDate} id="DueDate" type="text" disabled/>
        </div>
        <div className ="add-task">
            <label className ="leftMargin">Time:</label>
            <input className ="input3" id="Time" value={this.state.time} type="text" disabled/>
        </div>
      </div>: null}
    </div> 
</div>
  </div>);
}
}

export default ToDoList;