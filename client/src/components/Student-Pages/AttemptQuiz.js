import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Spin, message, Typography, Button, Statistic } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import {
  clearErrors,
  getQuiz,
  attemptQuiz,
  antiCheat,
} from "../../actions/studentActions";
const AttemptQuiz = () => {
  const { Countdown } = Statistic;
  const { Title } = Typography;
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const screen = useFullScreenHandle();
  const { error, loading, response } = useSelector(
    (state) => state.studentReducer
  );
  const { _id } = useSelector((state) => state.userReducer.userData.user);
  let submissionArr = [];
  const [startTest, setStartTest] = useState(false);
  const [startTime, setStartTime] = useState();
  const deadlineStart = startTime + 100 * 60 * 10 * response.quiz?.timeLimit;

  //check if duplicate. if duplicate, then won't add to submissionArr
  const add = (object) => {
    if (
      submissionArr.filter((x) => x.question === object.question).length === 0
    ) {
      submissionArr.push(object);
    }
  };
  const handleOptions = (e, index) => {
    let answerArray = [];
    answerArray[0] = e.target.value;
    if (submissionArr.length <= 0) {
      let obj = {
        question: index,
        answer: answerArray,
      };
      submissionArr.push(obj);
    } else {
      submissionArr.map((val) => {
        if (val.question === index) {
          val.answer = answerArray;
        } else {
          add({
            question: index,
            answer: answerArray,
          });
        }
      });
    }
  };
  let mAnswerArray = [];
  let indexes = [];
  const handleMultiSelectOptions = (e, index) => {
    //check if the index is already in the indexes array
    if (!indexes.includes(index)) {
      //if not, then push the index to the indexes array and clear answers arraay for new question
      indexes.push(index);
      mAnswerArray = [];
    } else {
      //if yes, then fetch previous answers and assign to mAnswerArray
      submissionArr.map((val) => {
        if (val.question === index) {
          mAnswerArray = val.answer;
        }
      });
    }
    //operating on mAnswerArray
    if (e.target.checked) {
      if (!mAnswerArray.includes(e.target.value)) {
        mAnswerArray = [e.target.value, ...mAnswerArray];
      }
    } else {
      mAnswerArray = mAnswerArray.filter((id) => id !== e.target.value);
    }

    //pushing to submissionArr
    if (submissionArr.length <= 0) {
      let obj = {
        question: index,
        answer: mAnswerArray,
      };
      submissionArr.push(obj);
    } else {
      submissionArr.map((val) => {
        if (val.question === index) {
          val.answer = mAnswerArray;
        } else {
          add({
            question: index,
            answer: mAnswerArray,
          });
        }
      });
    }
  };
  const submitQuiz = () => {
    if (deadlineStart >= Date.now()) {
      const late = `Submitted on time`;
      dispatch(attemptQuiz(params.id, _id, submissionArr, late));
      message.success("Quiz submitted successfully");
      navigate("/student/view-student-result");
    } else {
      const seconds = Math.floor((Date.now() - deadlineStart) / 1000);
      const minutes = Math.floor(seconds / 60);
      const late = `Submitted ${minutes} minutes / ${seconds} seconds late`;
      dispatch(attemptQuiz(params.id, _id, submissionArr, late));
      message.success("Quiz submitted successfully");
      navigate("/student/view-student-result");
    }
  };
  const timeUp = () => {
    message.error("Time is up. Submission will be considered late.");
  };
  useEffect(() => {
    dispatch(getQuiz(params.id));
    if (error) {
      message.error(error.message);
      dispatch(clearErrors());
    }
  }, [error]);
  return loading ? (
    <div className="loading">
      <Spin size="large" />
    </div>
  ) : (
    <>
      <div
        className="container"
        style={{
          textAlign: "center",
          paddingTop: "20vh",
          display: startTest ? "none" : "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Title level={2}>Attempt Quiz: {response.quiz?._id}</Title>
        <Title level={5} style={{ color: "red" }}>
          Guidelines:
        </Title>
        <ul
          style={{
            color: "red",
            textAlign: "left",
          }}
        >
          <li>
            Test has a timer. Complete within timelimit so that you won't be
            marked late.
          </li>
          <li>Do not close fullscreen or you will be marked cheating.</li>
          <li>
            Do not reload the page. You will lose your progress and marked
            cheating.
          </li>
        </ul>
        <Button
          type="primary"
          style={{
            width: "200px",
            marginTop: "20px",
          }}
          onClick={() => {
            setStartTest(true);
            screen.enter();
            setStartTime(Date.now());
          }}
        >
          Start Test
        </Button>
      </div>
      <div style={{ display: startTest ? "block" : "none" }}>
        <FullScreen
          handle={screen}
          onChange={() => {
            if (screen.active) {
            } else {
              startTest && dispatch(antiCheat(params.id, _id));
            }
          }}
          style={{
            background: "white",
            overflow: "scroll",
          }}
        >
          <div
            className="container"
            style={{
              textAlign: "center",
              paddingTop: "4vh",
            }}
          >
            <Title level={3}>Attempt Quiz: {response.quiz?._id}</Title>
            <Title level={5}>Maximim Marks : {response.quiz?.maxScore}</Title>
            <Countdown
              title="Time Left"
              value={deadlineStart}
              onFinish={timeUp}
              style={{
                position: "absolute",
                right: "10px",
                top: "40px",
              }}
            />
            {response.quiz?.quiz.map((value, index) => {
              return (
                <Card
                  style={{
                    minWidth: "100%",
                    marginBottom: "20px",
                    textAlign: "left",
                  }}
                  title={`Question ${index + 1}`}
                >
                  {value.type === "text" && <span>{value.question}</span>}
                  {value.type === "image" && (
                    <img
                      src={value.question}
                      alt="question"
                      style={{ width: "100%" }}
                    />
                  )}
                  {value.type === "voice" && (
                    <audio controls>
                      <source src={value.question} type="audio/mp4" />
                    </audio>
                  )}
                  <div
                    style={{
                      marginLeft: "20px",
                      marginTop: "10px",
                    }}
                  >
                    {value.options.map((val, ind) => {
                      return (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          {value.isMultiSelect === "no" ? (
                            <input
                              type="radio"
                              name={`question${index + 1}`}
                              value={val}
                              style={{
                                marginBottom: "5px",
                                marginRight: "10px",
                              }}
                              onChange={(e) => handleOptions(e, value.question)}
                            />
                          ) : (
                            <input
                              type="checkbox"
                              name={`question${index + 1}`}
                              value={val}
                              style={{
                                marginBottom: "5px",
                                marginRight: "10px",
                              }}
                              onChange={(e) =>
                                handleMultiSelectOptions(e, value.question)
                              }
                            />
                          )}
                          <span
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              marginBottom: "5px",
                            }}
                          >
                            {val}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              );
            })}
            <Button
              style={{
                marginBottom: "20px",
              }}
              onClick={submitQuiz}
            >
              Submit
            </Button>
          </div>
        </FullScreen>
      </div>
    </>
  );
};

export default AttemptQuiz;
