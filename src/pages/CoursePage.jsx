import React from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import CourseList from '../components/CourseList.jsx'
import * as courseActions from '../redux/actions/courseActions'
import * as authorActions from '../redux/actions/authorActions'

class CoursePage extends React.Component {
    
    componentDidMount(){ 
        const { courses, authors, actions } = this.props;

        if(courses.length === 0) actions.getCourses().catch(err=> alert("Loading courses failed : "+err));
        if(authors.length === 0) actions.getAuthors().catch(err=> alert("Loading authors failed : "+err));
    }
    
    render() {        
        return (
            <>
                <h2> Course</h2>
                <CourseList courses={this.props.courses}/>                
            </>
        )
    }
}

CoursePage.propTypes = {
    courses: propTypes.array.isRequired,
    authors: propTypes.array.isRequired,
    actions: propTypes.object.isRequired,    
}

function mapStateToProps(state){    
    return {
        courses:  state.authors.length === 0 ? [] : state.courses.map(course=>{
            let { name } = state.authors.find(a => a.id === course.authorId);
            return { 
                ...course, 
                authorName: name
            }
        }),
        authors: state.authors
    }
} 


function mapDispatchToProps(dispatch){
    return {
        actions: { 
            getAuthors: bindActionCreators(authorActions.getAuthors,dispatch), 
            getCourses: bindActionCreators(courseActions.getCourses,dispatch)
        }
        // courseActions: bindActionCreators(courseActions,dispatch) // option 1 to create dispatch
        //createCourse: course => dispatch(createCourse(course)) // option 2 to create dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage)
