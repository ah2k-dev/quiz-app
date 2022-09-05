import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllResults, clearErrors } from "../../actions/studentActions";
import { Button, Card, message, Spin, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";

const ViewStudentResult = () => {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, response } = useSelector(
    (state) => state.studentReducer
  );
  const { _id } = useSelector((state) => state.userReducer.userData.user);
  const btnSubmission = (id, data) => {
    navigate(`/student/view-submission/${id}`, { state: data });
  };
  useEffect(() => {
    dispatch(getAllResults(_id));
    if (error) {
      message.error(error.message);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return loading ? (
    <div className="loading">
      <Spin size="large" />
    </div>
  ) : (
    <div
      className="container"
      style={{
        paddingTop: "7vh",
        textAlign: "center",
      }}
    >
      <BackButton />
      <Title>Student Results</Title>
      <div
        className="ant-row ant-row-center"
        style={{
          rowGap: "20px",
          columnGap: "10px",
        }}
      >
        {response.results?.map((val, ind) => {
          return (
            <Card
              key={ind}
              className="ant-col-md-11"
              style={{
                // width: "400px",
                margin: "auto",
              }}
              title={val.quiz.course.name}
            >
              <div className="vals">
                <div>
                  <span>
                    <strong>Quiz Id:</strong>
                  </span>
                  <span>
                    <strong>Max Marks:</strong>
                  </span>
                  <span>
                    <strong>Obt Marks:</strong>
                  </span>
                  {val.antiCheat.length > 0 && <span><strong>Cheating</strong></span>}
                </div>
                <div>
                  <span>{val.quiz._id}</span>
                  <span>{val.quiz.maxScore}</span>
                  <span>{val.score}</span>
                  {val.antiCheat.length > 0 && <span>Yes</span>}
                <span>{val.lateSubmission}</span>
                </div>
              </div>
              <Button
                type="primary"
                style={{
                  marginTop: "10px",
                }}
                onClick={() => btnSubmission(_id, val.submission)}
              >
                View Submission
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ViewStudentResult;
