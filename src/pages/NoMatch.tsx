import { Link } from "react-router-dom";

export default function NoMatch() {
  return (
    <div className="flex flex-col justify-center h-[calc(100vh-56px)] items-center">
      <h2>Nothing to see here!</h2>
      <p className="cursor-pointer">
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
