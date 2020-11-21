import React from 'react'
import { Link } from 'react-router-dom'
import propTypes from 'prop-types'



const CourseList = ({courses, onDelete}) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th/>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Category</th>
                    <th/>
                </tr>
            </thead>
            <tbody>
                {courses.map(course => <tr key={course.id}>
                    <td>
                        <a className="btn btn-light" href={"http://pluralsight.com/courses/"+course.slug} rel="noreferrer" target="_blank">
                            Watch
                        </a>
                    </td>
                <td><Link to={"/course/"+course.slug}>{course.title}</Link></td>
                <td>{course.authorName}</td>
                <td>{course.category}</td>
                <td><button className="btn btn-outline-danger" onClick={() => onDelete(course)}>Delete</button></td>
                </tr> )}
            </tbody>
        </table>
    )
}

CourseList.propTypes = {
    courses: propTypes.array.isRequired,
    onDelete: propTypes.func.isRequired
}

export default CourseList
