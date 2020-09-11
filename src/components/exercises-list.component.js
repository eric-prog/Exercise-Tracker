import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0,10)}</td>
        <td>
            <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href='#' onClick={() => {props.deleteExercise(props.exercise._id) }}>delete</a>
        </td>
    </tr>
)

export default class ExerciseList extends Component {
    constructor(props){
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);
        this.state = {exercises: []}
    }

    componentDidMount() {
        axios.get('http://localhost:3004/exercises/')
        .then(response => {
            this.setState({ exercises: response.data })
        })
        .catch((error) => {
            console.log(error);
        })
    }

    deleteExercise(id){
        axios.delete('http://localhost:3004/exercises/' + id)
        .then(res => console.log(res.data));

        this.setState({ // update app with new state
            exercises: this.state.exercises.filter(el => el._id !== id) // for every element in exercises array we filter through by giving back exercises that do not have deleted id. _id is automtically generated in mongoDB
        })
    }

    exerciseList(){
        return this.state.exercises.map(currentexercise => {
            return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
        })
    }

    render () {
        return (
            <div>
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className='thead-light'>
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.exerciseList() }
                    </tbody>
                </table>
            </div>
        )
    }
}