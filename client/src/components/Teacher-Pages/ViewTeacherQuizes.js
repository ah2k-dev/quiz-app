import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Spin, message, Typography, Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "./BackButton";
import { getCourseQuizes, clearErrors } from "../../actions/teacherActions";
const ViewTeacherQuizes = () => {
  const { Title } = Typography;
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { error, loading, response } = useSelector(
    (state) => state.teacherReducer
  );
  const btnQuiz = (data) => {
    navigate(`/teacher/view-quiz/${data._id}`, { state: data });
  };
  const btnResult = (id) => {
    navigate("/teacher/view-quiz-result/" + id);
  };
  useEffect(() => {
    dispatch(getCourseQuizes(params.id));
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
        textAlign: "center",
        paddingTop: "10vh",
      }}
    >
      <BackButton />
      <Title>Quizes</Title>
      <div
        className="ant-row ant-row-center"
        style={{
          rowGap: "20px",
          columnGap: "10px",
        }}
      >
        {response.hasOwnProperty("quizes") ? (
          response.quizes.length <= 0 ? (
            <>No quizes found</>
          ) : (
            response.quizes.map((val, ind) => {
              return (
                <Card
                  key={ind}
                  className="ant-col-md-6"
                  style={{
                    minWidth: "300px",
                  }}
                  title={`Quiz ${ind + 1}`}
                >
                  <div className="vals">
                    <div>
                      <span>
                        <strong>Questions:</strong>
                      </span>
                      <span>
                        <strong>Course:</strong>
                      </span>
                      <span>
                        <strong>Max Score:</strong>
                      </span>
                      <span>
                        <strong>Time Limit:</strong>
                      </span>
                      <Button
                        type="primary"
                        style={{
                          marginTop: "20px",
                        }}
                        onClick={() => btnQuiz(val)}
                      >
                        View Questions
                      </Button>
                    </div>
                    <div>
                      <span>{val.quiz.length}</span>
                      <span>{val.course?.name || "err"}</span>
                      <span>{val.maxScore}</span>
                      <span>{val.timeLimit} min</span>
                      <Button
                        type="primary"
                        style={{
                          marginTop: "20px",
                        }}
                        onClick={() => btnResult(val._id)}
                      >
                        View Results
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })
          )
        ) : (
          <div>No Data to show</div>
        )}
      </div>
    </div>
  );
};

export default ViewTeacherQuizes;
