import React from 'react'
import {Link} from 'react-router-dom';
import './Welcome.css'
function Welcome()  {
    return (
      <>
      <div>
        <h1>Welcome</h1>
        <Link to="/">Back to Home</Link>
      </div>
      </>
    );
}
export default Welcome;