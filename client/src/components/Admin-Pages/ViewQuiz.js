import React from "react";
import { Typography, Card } from "antd";
import BackButton from "./BackButton";
import BackButton2 from "../Teacher-Pages/BackButton";
import { useLocation } from "react-router-dom";
const ViewQuiz = () => {
  const { Title } = Typography;
  const { state, pathname } = useLocation();
  let currentUser = pathname.split("/")[1];
  return (
    <div
      className="container"
      style={{
        paddingTop: "5vh",
        textAlign: "center",
      }}
    >
      {currentUser === "admin" ? <BackButton /> : <BackButton2 />}
      <Title>Quiz from Course: {state.course?.name || "not set"}</Title>
      <Title level={4}>Maximum marks: {state.maxScore}</Title>
      {state.quiz.length > 0 &&
        state.quiz.map((val, ind) => {
          return (
            <Card
              style={{
                minWidth: "100%",
                marginBottom: "20px",
                textAlign: "left",
              }}
              title={`Question ${ind + 1}`}
            >
              {val.type === 'text' && (
                <span>{val.question}</span>
              )}
              {val.type === 'image' && (
                <img src={val.question} alt="question" style={{ width: '100%' }} />
              )}
              {val.type === 'voice' && (
                <audio controls>
                  <source src={val.question} type="audio/mp4" />
                </audio>
              )}
              <div
                style={{
                  marginLeft: "20px",
                  marginTop: "10px",
                }}
              >
                {val.options.map((val, ind) => {
                  return (
                    <span
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: "5px",
                      }}
                      key={ind}
                    >
                      {`${ind + 1}. ${val}`}
                    </span>
                  );
                })}
              </div>
              <div
                style={{
                  marginTop: "10px",
                  fontWeight: "bold",
                }}
              >
                <span>Correct Answer:</span>
                {val.answers.map((val, ind) => {
                  return (
                    <span
                      style={{
                        marginLeft: "10px",
                      }}
                      key={ind}
                    >
                      {val}
                    </span>
                  );
                })}
              </div>
            </Card>
          );
        })}
    </div>
  );
};

export default ViewQuiz;
