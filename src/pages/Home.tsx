import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <h2> Home </h2>
            <br />
            <Link to="/regi">Go to Register</Link>
            <br />
            <Link to="/list">Go to List</Link>
            <br />
            <Link to="/test">Go to Test</Link>
        </div>
    )
}

export default Home;