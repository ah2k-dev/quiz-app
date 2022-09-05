import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Select, message, Typography, Spin, Table, Radio } from "antd";
import {
  clearErrors,
  enrollStudents,
  getStudents,
  getTeacherCourses,
} from "../../actions/teacherActions";
import BackButton from "./BackButton";

const EnrollStudents = () => {
  const dispatch = useDispatch();
  const { Title } = Typography;
  const { _id } = useSelector((state) => state.userReducer.userData.user);
  const { loading, error, response } = useSelector(
    (state) => state.teacherReducer
  );
  const [tD, setTd] = useState([]);
  const [courseId, setCourseId] = useState("");
  const [stdIds, setStdIds] = useState([]);

  const columns = [
    {
      title: "ID",
      dataIndex: "key",
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
    },
  ];
  let data = [];
  const handleCourseSelect = (value) => {
    setCourseId(value);
  };
  const setTableData = () => {
    if (response) {
      response.students.map((student) => {
        let obj = {
          key: student._id,
          name: student.name,
          email: student.email,
        };
        data.push(obj);
      });
    }
    setTd(data);
  };
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setStdIds(selectedRowKeys);
    },
    // getCheckboxProps: (record) => ({
    //   disabled: record.name === "Disabled User",
    //   // Column configuration not to be checked
    //   name: record.name,
    // }),
  };
  const enrollStds = () => {
    dispatch(enrollStudents(stdIds, courseId));
  };
  useEffect(() => {
    dispatch(getTeacherCourses(_id));
    if (error) {
      message.error(error);
      dispatch(clearErrors);
    }
  }, [error, dispatch]);
  useEffect(() => {
    dispatch(getStudents());
  }, [courseId]);

  return loading ? (
    <div className="loading">
      <Spin size="large" />
    </div>
  ) : (
    <div
      className="container"
      style={{
        paddingTop: "5vh",
        textAlign: "center",
      }}
    >
      <Title style={{ color: "black" }}>Enroll Students</Title>
      <BackButton />
      {stdIds.length > 0 && (
        <Button
          type="primary"
          style={{
            position: "absolute",
            top: "6vh",
            right: "20px",
          }}
          onClick={enrollStds}
        >
          Enroll Selected
        </Button>
      )}

      {courseId === "" ? (
        <div className="ant-row ant-row-center">
          <Select
            placeholder="Select Course"
            onChange={handleCourseSelect}
            style={{
              minWidth: "30%",
              width: "200px",
            }}
            className="ant-col-md-10"
          >
            {response.hasOwnProperty("courses") &&
            response.courses.length > 0 ? (
              response.courses.map((val, ind) => {
                return (
                  <Select.Option key={ind} value={val._id}>
                    {val.name}
                  </Select.Option>
                );
              })
            ) : (
              <Select.Option>No Courses found</Select.Option>
            )}
          </Select>
        </div>
      ) : tD.length > 0 ? (
        <Table
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          columns={columns}
          dataSource={tD}
          pagination={false}
        />
      ) : (
        <Button onClick={setTableData}>Get Students to Enroll</Button>
      )}
    </div>
  );
};

export default EnrollStudents;
//
