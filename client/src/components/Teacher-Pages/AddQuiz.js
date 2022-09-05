import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Input,
  Typography,
  Select,
  message,
  Spin,
  Card,
} from "antd";

import { useDispatch, useSelector } from "react-redux";
import {
  getTeacherCourses,
  clearErrors,
  addQuiz,
  addQuizCsv,
} from "../../actions/teacherActions";
import BackButton from "./BackButton";

const AddQuiz = () => {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const [courseId, setCourseId] = useState("");
  const [maxMarks, setMaxMarks] = useState(0);
  const [quizData, setQuizData] = useState([]);
  const [timeLimit, setTimeLimit] = useState(0);
  const [csv, setCsv] = useState();
  const [type, setType] = useState("text");
  const [file, setFile] = useState();
  const [form] = Form.useForm();
  const { _id } = useSelector((state) => state.userReducer.userData.user);
  const { loading, error, response } = useSelector(
    (state) => state.teacherReducer
  );
  const handleCourseSelect = (value) => {
    setCourseId(value);
  };
  const handleMaxMarks = (e) => {
    setMaxMarks(e.target.value);
  };
  const handleTimeLimit = (e) => {
    setTimeLimit(e.target.value);
  };
  const onFinish = async (values) => {
    if (values.type === "text") {
      let obj = {
        question: values.question,
        options: values.options.split("/"),
        answers: values.answers.split("/"),
        score: values.score,
        isMultiSelect: values.isMultiSelect,
        type: values.type,
      };
      setQuizData([...quizData, obj]);
    }
    if (values.type === "image") {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "quiz-data");
      data.append("cloud_name", "doikmphsj");
      await fetch("https://api.cloudinary.com/v1_1/doikmphsj/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          let obj = {
            question: data.url,
            options: values.options.split("/"),
            answers: values.answers.split("/"),
            score: values.score,
            isMultiSelect: values.isMultiSelect,
            type: values.type,
          };
          setQuizData([...quizData, obj]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (values.type === "voice") {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "quiz-data");
      data.append("cloud_name", "doikmphsj");
      await fetch("https://api.cloudinary.com/v1_1/doikmphsj/video/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          let obj = {
            question: data.url,
            options: values.options.split("/"),
            answers: values.answers.split("/"),
            score: values.score,
            isMultiSelect: values.isMultiSelect,
            type: values.type,
          };
          setQuizData([...quizData, obj]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    form.resetFields();
  };
  const onFinishFailed = (errorInfo) => {
    message.error("Failed:", errorInfo);
  };
  const handleSubmit = () => {
    console.log(quizData);
    if (courseId !== "" || maxMarks !== 0 || timeLimit !== 0) {
      if (!csv) {
        if (quizData.length === 0) {
          message.error("Please add atleast one question");
        } else {
          dispatch(addQuiz(quizData, maxMarks, courseId, timeLimit));
        }
      } else {
        dispatch(addQuizCsv(csv, maxMarks, courseId, timeLimit));
      }
    } else {
      message.error("Please select course, max marks AND Time limit");
    }
  };

  useEffect(() => {
    dispatch(getTeacherCourses(_id));
    if (error) {
      message.error(error.message);
      dispatch(clearErrors());
    }
  }, [error, dispatch]);

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
      <Title style={{ color: "black" }}>Add Quiz</Title>
      <BackButton />
      <div
        className="ant-row ant-row-center"
        style={{
          rowGap: "10px",
          columnGap: "10px",
        }}
      >
        <Select
          placeholder="Select Course"
          onChange={handleCourseSelect}
          style={{
            minWidth: "30%",
            width: "200px",
          }}
          className="ant-col-md-10"
        >
          {response.hasOwnProperty("courses") && response.courses.length > 0 ? (
            response.courses.map((val, ind) => {
              return <Select.Option value={val._id}>{val.name}</Select.Option>;
            })
          ) : (
            <Select.Option>No Courses found</Select.Option>
          )}
        </Select>
        <Input
          style={{
            minWidth: "30%",
            width: "200px",
          }}
          className="ant-col-md-10"
          placeholder="Time Limit (in minutes)"
          onChange={handleTimeLimit}
          type="number"
        />
        <Input
          style={{
            minWidth: "30%",
            width: "200px",
          }}
          placeholder="Maximum Marks"
          type="number"
          onChange={handleMaxMarks}
          className="ant-col-md-10"
        />
        <Input
          type="file"
          accept=".csv"
          onChange={(e) => setCsv(e.target.files[0])}
          className="ant-col-md-6"
          style={{
            minWidth: "30%",
            width: "200px",
          }}
        />
        <span>*If uploading a csv, include url of image or audio in place of question. and declare type of the question. Follow the format from sample csv</span>
      </div>
      <hr />
      <Title level={4}>Or Add questions manually</Title>
      <Form
        name="add-quizData"
        className="ant-row ant-row-start"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
        style={{
          border: "1px solid #ccc",
          marginTop: "10px",
          padding: "20px",
          width: "100%",
        }}
      >
        {type === "text" && (
          <Form.Item
            className="ant-col-16"
            name="question"
            rules={[{ required: true, message: "Please input question!" }]}
            label="Question"
          >
            <Input placeholder="Question" type="text" />
          </Form.Item>
        )}
        {type === "image" && (
          <Form.Item
            className="ant-col-16"
            name="question"
            rules={[{ required: true, message: "Please input question!" }]}
            label="Question"
          >
            <Input
              placeholder="Question"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </Form.Item>
        )}
        {type === "voice" && (
          <Form.Item
            className="ant-col-16"
            name="question"
            rules={[{ required: true, message: "Please input question!" }]}
            label="Question"
          >
            <Input
              placeholder="Question"
              type="file"
              accept="audio/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </Form.Item>
        )}
        <Form.Item
          className="ant-col-6"
          rules={[{ required: true, message: "Select question type" }]}
          name="type"
          label="Type"
          style={{ marginLeft: "20px" }}
        >
          <Select onChange={(value) => setType(value)}>
            <Select.Option value="text">Text</Select.Option>
            <Select.Option value="image">Image</Select.Option>
            <Select.Option value="voice">Voice</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          className="ant-col-16"
          name="options"
          rules={[{ required: true, message: "Please input options!" }]}
          label="Options"
        >
          <Input
            placeholder="Option1 / Option2 / Option3 ..."
            type="text"
            style={{ marginLeft: "5px" }}
          />
        </Form.Item>
        <Form.Item
          className="ant-col-6"
          name="isMultiSelect"
          rules={[{ required: true, message: "Please select an option" }]}
          label="Is Multi Select"
          style={{ marginLeft: "20px" }}
        >
          <Select placeholder="Multiple Answers">
            <Select.Option value="yes">Yes</Select.Option>
            <Select.Option value="no">No</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          className="ant-col-16"
          name="answers"
          rules={[{ required: true, message: "Please input answers!" }]}
          label="Answers"
        >
          <Input
            placeholder="Answer1 / Answer2 / Answer3 ..."
            type="text"
            style={{
              marginLeft: "3px",
            }}
          />
        </Form.Item>
        <Form.Item
          className="ant-col-6"
          name="score"
          rules={[{ required: true, message: "Please input marks!" }]}
          label="Score"
          style={{ marginLeft: "20px" }}
        >
          <Input placeholder="Score" type="number" />
        </Form.Item>
        <Form.Item
          className="ant-col-6"
          style={{
            marginTop: "10px",
          }}
        >
          <Button type="primary" htmlType="submit">
            Add Question
          </Button>
        </Form.Item>
      </Form>
      <div
        style={{
          textAlign: "left",
          marginTop: "20px",
        }}
      >
        <Title level={3}>Questions List :</Title>
        {quizData.length > 0 ? (
          quizData.map((val, ind) => {
            return (
              <Card
                style={{
                  minWidth: "100%",
                  marginBottom: "20px",
                  textAlign: "left",
                }}
                title={`Question ${ind + 1}`}
              >
                {val.type === "text" && <span>{val.question}</span>}
                {val.type === "image" && (
                  <img
                    src={val.question}
                    alt="question"
                    style={{ width: "100%" }}
                  />
                )}
                {val.type === "voice" && (
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
                      >
                        {val}
                      </span>
                    );
                  })}
                </div>
              </Card>
            );
          })
        ) : (
          <>No Questions Added</>
        )}
      </div>
      <Button
        style={{
          marginTop: "20px",
          marginBottom: "30px",
        }}
        onClick={handleSubmit}
      >
        Submit Quiz
      </Button>
    </div>
  );
};

export default AddQuiz;
