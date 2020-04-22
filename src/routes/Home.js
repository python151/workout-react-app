import React from 'react';

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            workouts: []
        }
    }

    handleApiWorkoutResponse = (response) => {
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

    getNewestWorkouts = () => {
        fetch('https://workoutapi.pythonanyehere.com/get/all/workouts/')
        .then(response => response.json())
        .then(response => this.handleApiWorkoutResponse(response))
        .catch(err => {})
    }

    componentWillMount() {
        this.getNewestWorkouts()
    }

    render() {
        return (
            <div>
                <div className="display-4" style={{
                    margin: .5+'em'
                }}>Latest 20 workouts</div>
                <div className="row" style={{
                    margin: 1+'em',
                }}>
                    
                    {this.state.workouts.map(workout => (
                        <div className='col card' style={{
                            maxWidth: 27+'em',
                            minWidth: 20+'em',
                            margin: 1+'em'
                        }}>
                            <span className="lead" style={{
                                margin: 1+'em'
                            }}>{workout.sets.join(', ')}</span>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}