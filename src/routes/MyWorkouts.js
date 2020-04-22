import React from 'react';
import '../static/MyWorkouts.css'

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            workouts: [{
                name: "test",
                sets: [
                    "Bench",
                    "Pulls"
                ]
            }],
            currentExercises: []
        }
    }

    handleDataResponse = (response) => {
        if (response.success) {
            let workouts = [];
            response.workouts.map(workout => {
                // objects are implemented as hash tables anyway for constant lookup time
                let hash = {};
                workout.sets.map(set => {
                    if (hash[set] === true) {}
                    else {
                        hash[set] = true;
                    }
                })

                // getting all propreties in hash table
                let sets = Object.getOwnPropertyNames(hash);
                workout.sets = sets;

                workouts.push(workout)
            })
            this.setState({
                workouts: workouts,
            })
        }
    }

    getWorkoutsFromApi = () => {
        let sess = localStorage.getItem("session-key")
        fetch('https://workoutapi.pythonanywhere.com/get/my/workouts/?session-key='+sess)
        .then(response => response.json())
        .then(response => this.handleDataResponse(response))
        .catch(err => {})
    }

    componentWillMount() {
        this.getWorkoutsFromApi()
    }

    handleSaveSetResponse = (response) => {
        if (response.success) {
            this.getWorkoutsFromApi()
        }
    }

    saveSets = () => {
        let sess = localStorage.getItem("session-key")
        fetch('https://workoutapi.pythonanywhere.com/add/workout/?session-key='+sess, {
            method: "POST",
            body: JSON.stringify({
                sets: this.state.currentExercises
            })
        })
        .then(response => response.json())
        .then(response => this.handleSaveSetResponse(response))
        .catch(err => {})
    }

    addNewSet = () => {
        
    }

    getSetFromForm = () => {
       let name = document.getElementById("name").value;
       let muscel = document.getElementById("muscel").value;
       let length = document.getElementById("length").value;
       let sets = document.getElementById("sets").value;

       try {
           length = Number(length)
           sets = Number(sets)
       }
       catch (err) {
            alert("error")
       }

       this.setState({
           currentExercises: [
               ...this.state.currentExercises, 
               {
                   name: name,
                   muscel: muscel,
                   setSize: length,
                   numOfSets: sets,
               }
           ]
       })


       document.getElementById("name").value = "";
       document.getElementById("muscel").value = "";
       document.getElementById("length").value = "";
       document.getElementById("sets").value = "";
    }

    saveWorkouts = () => {

    }

    addWorkout = () => {
        let current = []
        this.state.currentExercises.map(exercise => (
            current.push(exercise.name)
        ))
        this.setState({
            workouts: [...this.state.workouts, {
                sets: current
            }]
        })

        this.saveSets()
    }


    render() {
        return (
            <div>
                {this.state.workouts.map(workout => (
                    <div>
                        <div class="card" style={{width: 18+"rem;"}}>
                            <div class="card-body">
                                <div className="lead">
                                    {workout.sets.join(", ")}
                                </div>
                                <br/>
                                <a href={"/workout/"+workout.id} class="btn btn-primary card-link">Full workout</a>
                            </div>
                        </div>
                    </div>
                ))}
                <button className="btn btn-primary" style={{
                    margin: 1+'em',
                    borderRadius: 50+'%',
                    width: 3+'em',
                    height: 3.08+'em'
                }}
                data-toggle="modal"
                data-target="#workoutForm">
                    +
                </button>

                <div class="modal fade" id="workoutForm" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalCenterTitle">New Workout</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                {this.state.currentExercises.map(exercise => (
                                        <span class="badge badge-pill badge-dark set-pill"><button className="clear">&times;</button>{exercise.name} - {exercise.numOfSets} Sets of {exercise.setSize}</span>
                                ))}

                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <button class="btn btn-outline-secondary" type="button" id="button-addon1" onClick={this.getSetFromForm}>Add</button>
                                    </div>
                                    <input id="name" type="text" class="form-control" aria-label="Dollar amount (with dot and two decimal places)" placeholder="Exercise name" />
                                    <input id="muscel" type="text" class="form-control" aria-label="Dollar amount (with dot and two decimal places)" placeholder="Muscel" />
                                    <div class="input-group-append">
                                        <input id="sets" className="form-control set input-group-text" type="number" />
                                        <input id="length" className="form-control set-size input-group-text" type="number" />
                                    </div>
                                    <small>Set number of exercises per set (The last one) to -1 if till failure</small>
                                    

                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" onClick={this.addWorkout}>Save Workout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}