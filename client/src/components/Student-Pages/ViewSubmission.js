import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { Card, Typography } from "antd";
import StdBackButton from "./BackButton";
import AdBackButton from "../Admin-Pages/BackButton";
import TeBackButton from "../Teacher-Pages/BackButton";

const ViewSubmission = () => {
  const { state, pathname } = useLocation();
  const params = useParams();
  const { Title } = Typography;
  let currentUser = pathname.split("/")[1];

  return (
    <div
      className="container"
      style={{
        textAlign: "center",
        paddingTop: "7vh",
      }}
    >
      {currentUser === "admin" && <AdBackButton />}
      {currentUser === "teacher" && <TeBackButton />}
      {currentUser === "student" && <StdBackButton />}
      <Title level={3}>Submission: {params.id}</Title>
      <div
        className="ant-row ant-row-center"
        style={{
          rowGap: "20px",
          columnGap: "10px",
        }}
      >
        {state.map((val, ind) => {
          return (
            <Card
              className="ant-col-md-5"
              title={`Question ${ind + 1} `}
              key={ind}
            >
              <div className="vals">
                <div>
                  <span>
                    <strong>Question</strong>
                  </span>
                  <span>
                    <strong>Answer</strong>
                  </span>
                </div>
                <div>
                  <span>{val.question}</span>
                  <span>{val.answer.map((ans)=>{
                    return <>{ans},</>
                  })}</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ViewSubmission;
