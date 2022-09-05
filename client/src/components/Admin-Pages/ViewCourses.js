import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Spin, message, Typography } from "antd";
import { getCourses } from "../../actions/adminActions";
import BackButton from "./BackButton";

const ViewCourses = () => {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const { error, loading, response } = useSelector(
    (state) => state.adminReducer
  );
  useEffect(() => {
    dispatch(getCourses());
    if (error) {
      message.error(error.message);
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
      <Title>Courses</Title>
      {response?.hasOwnProperty("data") && (
        <div
          className="ant-row ant-row-center"
          style={{
            rowGap: "20px",
            columnGap: "10px",
          }}
        >
          {response.data.hasOwnProperty("courses") ? (
            response.data.courses.length <= 0 ? (
              <>No courses found</>
            ) : (
              response.data.courses.map((val, ind) => {
                return (
                  <Card
                    className="ant-col-md-5"
                    style={{
                      minWidth: "300px",
                    }}
                    title={val.name}
                    key={ind}
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
                          <strong>Teacher:</strong>
                        </span>
                        <span>
                          <strong>Teacher Mail:</strong>
                        </span>

                        <span>
                          <strong>Students:</strong>
                        </span>
                      </div>
                      <div>
                        <span>{val.name}</span>
                        <span>{val.creditHrs}</span>
                        <span>{val.teacher.name}</span>
                        <span>{val.teacher.email}</span>
                        <span>{val.students.length}</span>
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
      )}
    </div>
  );
};

export default ViewCourses;
