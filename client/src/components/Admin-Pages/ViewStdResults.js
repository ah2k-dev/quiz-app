import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Typography, message, Spin, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import BackButton from "./BackButton";
import { getStudentResults, clearErrors } from "../../actions/adminActions";
const ViewStdResults = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, response } = useSelector(
    (state) => state.adminReducer
  );
  const { Title } = Typography;
  const btnSubmission = (id, data) => {
    navigate(`/admin/view-submission/${id}`, { state: data });
  };
  useEffect(() => {
    dispatch(getStudentResults(params.id));
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
        {response.data.results?.map((val, ind) => {
          return (
            <Card
              className="ant-col-md-11"
              style={{
                width: "400px",
                margin: "auto",
              }}
              key={ind}
              title={val.student.name}
            >
              <div className="vals">
                <div>
                  <span>
                    <strong>Quiz Id:</strong>
                  </span>
                  <span>
                    <strong>Course:</strong>
                  </span>
                  <span>
                    <strong>Max Marks:</strong>
                  </span>
                  <span>
                    <strong>Obt Marks:</strong>
                  </span>
                </div>
                <div>
                  <span>{val.quiz._id}</span>
                  <span>{val.quiz.course.name}</span>
                  <span>{val.quiz.maxScore}</span>
                  <span>{val.score}</span>
                </div>
              </div>
              <Button
                type="primary"
                style={{
                  marginTop: "10px",
                }}
                onClick={() => btnSubmission(val._id, val.submission)}
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

export default ViewStdResults;
