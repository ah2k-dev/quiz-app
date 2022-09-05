import React from "react";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const handleStarted = () => {
    navigate("/login");
  };
  return (
    <div className="container Home">
      <div className="ant-row ant-row-center">
        <div className="ant-col-15">
          <h3 className="ant-typography">Quiz Application</h3>
        </div>
        <div className="ant-col-15">
          <h5 className="ant-typography">
            An application that lets instructors to create quiz, students
            attempt quizes and calculate results sutomatically and authorize
            admins to monitor everything.
          </h5>
        </div>
        <div className="ant-col-15" style={{ margin: "20px" }}>
          <button
            className="ant-btn ant-btn-primary ant-btn-lg br5"
            onClick={handleStarted}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
