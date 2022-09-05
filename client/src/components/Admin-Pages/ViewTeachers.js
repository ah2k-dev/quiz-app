import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Spin, message, Typography } from "antd";
import { getTeachers } from "../../actions/adminActions";
import BackButton from "./BackButton";
const ViewTeachers = () => {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const { error, loading, response } = useSelector(
    (state) => state.adminReducer
  );
  useEffect(() => {
    dispatch(getTeachers());
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
      <Title>Teachers</Title>
      {response?.hasOwnProperty("data") && (
        <div
          className="ant-row ant-row-center"
          style={{
            rowGap: "20px",
            columnGap: "10px",
          }}
        >
          {response.data.hasOwnProperty("teachers") ? (
            response.data.teachers.length <= 0 ? (
              <>No teachers found</>
            ) : (
              response.data.teachers.map((val, ind) => {
                return (
                  <Card
                    key={ind}
                    className="ant-col-md-6"
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
                          <strong>Email:</strong>
                        </span>
                        <span>
                          <strong>Qualification:</strong>
                        </span>
                      </div>
                      <div>
                        <span>{val.name}</span>
                        <span>{val.email}</span>
                        <span>{val.qualification}</span>
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

export default ViewTeachers;
