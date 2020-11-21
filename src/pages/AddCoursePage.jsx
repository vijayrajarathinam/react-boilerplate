import React , { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types';
import { toast } from 'react-toastify';

import * as courseActions from '../redux/actions/courseActions'
import * as authorActions from '../redux/actions/authorActions'
import CourseForm from '../components/CourseForm'
import { courses, newCourse } from '../../tools/mockData'
import { useHistory } from 'react-router-dom';
import Spinner from '../components/common/Spinner';


function AddCoursePage({  
    courses, 
    authors, 
    getAuthors, 
    getCourses, 
    saveCourse,
    ...props 
}){
    const [course, setCourse] = useState(props.course)
    const [errors, setErrors] = useState({})
    const [saving, setSaving] = useState(false)
    const history = useHistory();
    
    useEffect(()=>{
        if(courses.length === 0) getCourses().catch(err=> alert("Loading courses failed : "+err));
        if(authors.length === 0) getAuthors().catch(err=> alert("Loading authors failed : "+err));
        setCourse(props.course);
    }, [props.course])
        
    function handleChange(e) {
        const { name, value } = e.target;
        setCourse(prevCourse => ({
            ...prevCourse,
            [name]: name === "authorId" ? parseInt(value, 10) : value
        }))
    }
    
    function handleSubmit(e){
        e.preventDefault();
        if(!formIsValid()) return;
        setSaving(true);
        saveCourse(course).then(() => {
            toast.success("Course Saved!...")
            history.push("/courses")
        }).catch(err => {
            setSaving(false);
            setErrors({ onSave: err.message })
        })
    }

    function formIsValid(){
        const { title, authorId, category } = course;
        const errors = {};
        
        if(!title) errors.title = "Title is required!..";
        if(!authorId) errors.authorId =  "Author is required!..";
        if(!category) errors.category =  "Category is required!..";

        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    return( 
        authors.length === 0 || courses.length===0 ? <Spinner/> : 
        <CourseForm course={course} errors={errors} authors={authors} onChange={handleChange} onSave={handleSubmit} saving={saving} />  
    )
}

AddCoursePage.propTypes = {
    course: propTypes.object.isRequired,
    courses: propTypes.array.isRequired,
    authors: propTypes.array.isRequired,
    getAuthors: propTypes.func.isRequired,    
    getCourses: propTypes.func.isRequired,
    saveCourse: propTypes.func.isRequired
}

function getCourseBySlug(courses,slug){    
    return courses.find(course => course.slug === slug) || null;
}

function mapStateToProps(state, ownProps){    
    const slug = ownProps.match.params.slug;
    const course = slug && state.courses.length > 0 ? getCourseBySlug(state.courses,slug) : newCourse;
 
    return {
        course,
        courses: state.courses,
        authors: state.authors
    }
} 


const mapDispatchToProps = {
    getAuthors: authorActions.getAuthors, 
    getCourses: courseActions.getCourses,
    saveCourse: courseActions.saveCourse,
}


export default connect(mapStateToProps, mapDispatchToProps)(AddCoursePage)

