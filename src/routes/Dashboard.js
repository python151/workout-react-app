import React from 'react';

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            exercises: []
        }
    }

    handleDataResponse = (response) => {
        if (response.success) {
            this.setState({
                exercises: response.exercises,
            })
        }
    }

    getDataFromApi = () => {
        let sess = localStorage.getItem("session-key")
        fetch('http://localhost:8000/get/my/exercises/?session-key='+sess)
        .then(response => response.json())
        .then(response => this.handleDataResponse(response))
    }

    componentWillMount() {
        this.getDataFromApi()
    }

    render() {
        return (
            <div>
               <main role="main" class="col">
                <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 class="h2">Dashboard</h1>
                    <div class="btn-toolbar mb-2 mb-md-0">
                    <div class="btn-group mr-2">
                        <button type="button" class="btn btn-sm btn-outline-secondary">Share</button>
                        <button type="button" class="btn btn-sm btn-outline-secondary">Export</button>
                    </div>
                    <button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle">
                        <span data-feather="calendar"></span>
                        This week
                    </button>
                    </div>
                </div>

                <h2 className="display-4">Excerisises for the week</h2>

                <div class="table-responsive">
                    <table class="table table-striped table-sm">
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Muscel/Muscel Group</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {this.state.exercises.map(exercise => (
                            <tr>
                                <td>{exercise.id}</td>
                                <td>{exercise.name}</td>
                                <td>{exercise.type}</td>
                                <td>{exercise.muscel}</td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
                </main>
            </div>
        )
    }
}