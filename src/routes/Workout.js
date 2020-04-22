import React from 'react';

export default class Workout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            workout: {
                "users": [
                    "python151",
                    "python"
                ],
                "sets": [
                    {
                        "name": "Bench Press",
                        "message": ""
                    }
                ]
            }
        }
    }

    handleApiResponse = (response) => {
        if (response.success) {
            let rWorkout = response.workout
            let rSets = []
            response.workout.sets.map(set => {
                if (set.setSize !== -1) {
                    let message = `complete ${set.howMany} sets of ${set.setSize} reps`
                    set.message = message;
                    rSets.push(set)
                } else {
                    let message = `complete ${set.howMany} sets until failure`
                    set.message = message;
                    rSets.push(set)
                }
            })

            this.setState({
                workout: rWorkout
            })
        }
    }

    getLastInWindowLocation = (location) => {
        let locations = location.split("/")
        return locations[locations.length-1]
    }

    getWorkoutFromApi = () => {
        let id = Number( this.getLastInWindowLocation(String(window.location)) );
        let sess = localStorage.getItem("session-key")
        fetch("https://workoutapi.pythonanyehere.com/get/workout/"+id+"/?session-key="+sess)
        .then(response => response.json())
        .then(response => this.handleApiResponse(response))
    }

    componentWillMount() {
        this.getWorkoutFromApi();
    }

    render() {
        return (
            <div>
                {this.state.workout.users.join(", ")}

                <ul>
                    {this.state.workout.sets.map(set => (
                        <li>
                            {set.name}<br />

                            {set.message}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}