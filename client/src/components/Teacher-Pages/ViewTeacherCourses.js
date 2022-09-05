import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Spin, message, Typography, Button } from "antd";
import BackButton from "./BackButton";
import { clearErrors, getTeacherCourses } from "../../actions/teacherActions";
import { useNavigate } from "react-router-dom";
const ViewTeacherCourses = () => {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, response } = useSelector(
    (state) => state.teacherReducer
  );
  const { _id } = useSelector((state) => state.userReducer.userData.user);
  useEffect(() => {
    dispatch(getTeacherCourses(_id));
    if (error) {
      message.error(error.message);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);
  const ViewQuizes = (id) => {
    navigate(`/teacher/view-course-quizes/${id}`);
  };
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
      <Title>Courses</Title>
      <div
        className="ant-row ant-row-center"
        style={{
          rowGap: "20px",
          columnGap: "10px",
        }}
      >
        {response.hasOwnProperty("courses") ? (
          response.courses.length <= 0 ? (
            <>No courses found</>
          ) : (
            response.courses.map((val, ind) => {
              return (
                <Card
                  key={ind}
                  className="ant-col-md-5"
                  style={{
                    minWidth: "300px",
                  }}
                  title={val.name}
                >
                  <div className="vals">
                    <div>
                      <span>
                        <strong>Name:</strong>
                      </span>
                      <span>
                        <strong>Credit Hours:</strong>
                      </span>
                      <span>
                        <strong>Students:</strong>
                      </span>
                    </div>
                    <div>
                      <span>{val.name}</span>
                      <span>{val.creditHrs}</span>
                      <span>{val.students.length}</span>
                    </div>
                  </div>
                  <Button
                    type="primary"
                    style={{ marginTop: "30px" }}
                    onClick={() => ViewQuizes(val._id)}
                  >
                    View Quizes
                  </Button>
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

export default ViewTeacherCourses;
