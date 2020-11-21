import React from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

import CourseList from '../components/CourseList.jsx'
import * as courseActions from '../redux/actions/courseActions'
import * as authorActions from '../redux/actions/authorActions'
import Spinner from '../components/common/Spinner'
import { toast } from 'react-toastify';

class CoursePage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            redirectToAddCoursePage: false
        }
    }
    
    componentDidMount(){ 
        const { courses, authors, actions } = this.props;

        if(courses.length === 0) actions.getCourses().catch(err=> alert("Loading courses failed : "+err));
        if(authors.length === 0) actions.getAuthors().catch(err=> alert("Loading authors failed : "+err));
    }
    
    handleDeleteCourse = course => {
        toast.success("Course Deleted!...");
        this.props.actions.deleteCourse(course).catch(err => toast.error("Delete failed"+ err.message, {autoClose: false}));
    }

    render() {        
        return (
            <>
            {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
                <h2> Course</h2>
                {this.props.loading ? (<Spinner/> ): (
                <><button 
                    style={{marginBottom:20}} 
                    className="btn btn-primary add-course" 
                    onClick={() => this.setState({redirectToAddCoursePage:true})}>
                        Add Course
                </button>
                <CourseList courses={this.props.courses} onDelete={this.handleDeleteCourse}/>                
                </>
                )}
            </>
        )
    }
}

CoursePage.propTypes = {
    courses: propTypes.array.isRequired,
    authors: propTypes.array.isRequired,
    actions: propTypes.object.isRequired,    
    loading: propTypes.bool.isRequired
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
        authors: state.authors,
        loading: state.apiCallInProgress > 0
    }
} 


function mapDispatchToProps(dispatch){
    return {
        actions: { 
            getAuthors: bindActionCreators(authorActions.getAuthors,dispatch), 
            getCourses: bindActionCreators(courseActions.getCourses,dispatch),
            deleteCourse: bindActionCreators(courseActions.deleteCourse,dispatch)
        }
        // courseActions: bindActionCreators(courseActions,dispatch) // option 1 to create dispatch
        //createCourse: course => dispatch(createCourse(course)) // option 2 to create dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage)
