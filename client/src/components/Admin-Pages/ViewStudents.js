import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Spin, message, Typography, Button } from "antd";
import { getStudents } from "../../actions/adminActions";
import BackButton from "./BackButton";
import { useNavigate } from "react-router-dom";

const ViewStudents = () => {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const { error, loading, response } = useSelector(
    (state) => state.adminReducer
  );
  const navigate = useNavigate();
  const btnResult = (id) => {
    navigate("/admin/view-student-result/" + id);
  };
  useEffect(() => {
    dispatch(getStudents());
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
      <Title>Students</Title>
      {response?.hasOwnProperty("data") && (
        <div
          className="ant-row ant-row-center"
          style={{
            rowGap: "20px",
            columnGap: "10px",
          }}
        >
          {response.data.hasOwnProperty("students") ? (
            response.data.students.length <= 0 ? (
              <>No students found</>
            ) : (
              response.data.students.map((val, ind) => {
                return (
                  <Card
                    key={ind}
                    className="ant-col-md-12 ant-col-lg-6"
                    style={{
                      minWidth: "350px",
                    }}
                    title={val.name}
                  >
                    <div className="vals">
                      <div>
                        <span>
                          <strong>Name:</strong>
                        </span>
                        <span>
                          <strong>Email:</strong>
                        </span>
                        <span>
                          <strong>Created By:</strong>
                        </span>
                        <span>
                          <strong>Courses:</strong>
                        </span>
                      </div>
                      <div>
                        <span>{val.name}</span>
                        <span>{val.email}</span>
                        <span>{val.createdBy}</span>
                        {val.course.length <= 0 ? (
                          <span>Not enrolled in any</span>
                        ) : (
                          val.course.map((val, ind) => {
                            return <span>{val.name}</span>;
                          })
                        )}
                      </div>
                    </div>
                    <Button
                      type="primary"
                      style={{
                        marginTop: "20px",
                      }}
                      onClick={() => btnResult(val._id)}
                    >
                      View Results
                    </Button>
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

export default ViewStudents;
