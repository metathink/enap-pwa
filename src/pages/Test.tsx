import { Link } from "react-router-dom";


const Test = () => {
  return (
    <div>
      <h1>Test Page</h1>
      <p>This is a test page to verify the routing works correctly.</p>

      <Link to="/regi">Go to Register</Link>
      <br />
      <Link to="/list">Go to List</Link>
      <br />
      <Link to="/">Go to Home</Link>
    </div>
  );
}
export default Test;