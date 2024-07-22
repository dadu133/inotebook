import React, { useContext, useEffect } from 'react'

const About = (props) => {
    
    
    return (
        <>
        <section>
        <div className="hero-content text-center m-2">
            <h1 className='my-5'>Welcome to iNotebook</h1>
            <p>Your ultimate solution for seamless note-taking and organization. iNotebook is designed to help you capture, organize, and retrieve your notes effortlessly, so you can stay focused and productive.Note-taking is an essential skill for students, professionals, and anyone who values clarity and organization in their lives. It helps in:</p>
            <ol className='max-sm:text-xs'>
                <li className='my-4'>Enhancing Memory: Writing down information helps in retaining it better.</li>
                <li className='my-4'>Improving Focus: It keeps you engaged and attentive.</li>
                <li className='my-4'>Organizing Thoughts: It allows you to structure your ideas and plans logically.</li>
                <li className='my-4'>Boosting Creativity: It serves as a repository for your creative thoughts and insights.</li>
            </ol>
            <a href="/" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2'>Get Started</a>
        </div>
    </section>
    <section class="features">
        <h2>Features</h2>
        <div class="feature-grid">
            <div class="feature-item">
                <h3>Easy to Use</h3>
                <p>Intuitive interface that makes note-taking a breeze.</p>
            </div>
            <div class="feature-item">
                <h3>Organize Your Notes</h3>
                <p>Keep your notes organized with tags and categories.</p>
            </div>
            <div class="feature-item">
                <h3>Access Anywhere</h3>
                <p>Available on all your devices, so you can take notes on the go.</p>
            </div>
        </div>
    </section>
    <footer>
        <p>&copy; 2024 NoteMaster. All rights reserved.</p>
    </footer>
    </>
    )
}

export default About;