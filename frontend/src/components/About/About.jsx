import React from 'react';
import "./About.css";

const About = () => {
  return (
    <div className="about d-flex justify-content-center align-items-center">
        <div className="container">
            <div className="d-flex"> 
                <h1>About Us</h1>
            </div>
        
        <p>
          "Welcome to my todoapp, a fresh approach to managing your tasks with a visual touch! We believe that productivity can be beautiful, simple, and enjoyable. 
          <br/>Our image-based to-do app is designed to help you organize your goals, tasks, and projects in a visually engaging way, making it easier to stay motivated and focused. 
          <br />Whether you're capturing your daily to-dos or planning long-term goals, our app empowers you to turn ideas into action with just a few taps. 
          <br />Join us on a journey to redefine productivity and make organizing your life more inspiring!"
        </p>
        </div>
        
       
    </div>
  )
}

export default About
