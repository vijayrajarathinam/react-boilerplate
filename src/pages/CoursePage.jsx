import React from 'react'
import { connect } from 'react-redux'
import { createCourse } from '../redux/actions/courseActions'
import propTypes from 'prop-types';

class CoursePage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            course: { title: "" }
        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e){
        const course = { ...this.state.course, title: e.target.value}
        this.setState({course});
    }

    onSubmitHandler(e){
        e.preventDefault();
        this.props.dispatch(createCourse(this.state.course));
    }

    render() {
        return (
            <form onSubmit={this.onSubmitHandler}>
                <h2> Course</h2>
                <h3>Add Course</h3>
                <input type="text" value={this.state.title} onChange={this.onChangeHandler}/>
                <input type="submit" value="save"/>
            </form>
        )
    }
}

function mapStateToProps(state){
    return {
        courses: state.courses
    }
} 


CoursePage.propTypes = {
    dispatch: propTypes.func.isRequired
}

export default connect(mapStateToProps)(CoursePage)
