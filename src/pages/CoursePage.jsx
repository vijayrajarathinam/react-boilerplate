import React from 'react'
import { connect } from 'react-redux'
import * as courseActions from '../redux/actions/courseActions'
import propTypes from 'prop-types';
import { bindActionCreators } from 'redux';

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
        this.props.actions.createCourse(this.state.course);
    }

    render() {
        return (
            <form onSubmit={this.onSubmitHandler}>
                <h2> Course</h2>
                <h3>Add Course</h3>
                <input type="text" value={this.state.title} onChange={this.onChangeHandler}/>
                <input type="submit" value="save"/>

                {this.props.courses.map(course => <li key={course.title}>{course.title}</li>)}
            </form>
        )
    }
}

CoursePage.propTypes = {
    courses: propTypes.array.isRequired,
    actions: propTypes.object.isRequired
    //createCourse: propTypes.func.isRequired    
}

function mapStateToProps(state){
    return {
        courses: state.courses
    }
} 


function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(courseActions,dispatch) // option 1 to create dispatch
        //createCourse: course => dispatch(createCourse(course)) // option 2 to create dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage)
