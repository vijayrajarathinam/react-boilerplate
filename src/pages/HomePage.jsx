import React from 'react'
import { Link } from 'react-router-dom'

function HomePage() {
    return (
        <div className="jumbotron">
            <h1>Welcome to the Website</h1>
            <p>building in react, redux , redux-thunk</p>
            <Link to="about" className="btn btn-primary btn-lg">Learn More...</Link>
        </div>
    )
}

export default HomePage
