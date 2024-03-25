import React, { useEffect, useState } from "react";
import Gif from "./assets/gifs/Gifs.gif";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input, Space } from "antd";
import useUsersApi from "./service/users";
import "./style.css";
import axios from "axios";

const App = () => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [formNumber, setFormNumber] = useState(0);

  const [managerSignUp, setManagerSignUp] = useState({
    email: "",
    password: "",
    phone_number: "",
    company_name: "",
  });

  const [userData, setUserData] = useState({
    industry: "",
    city: "",
    workPhoneNumber: "",
    firstName: "",
    lastName: "",
    birthday: "",
  });

  const [docDetails, setDocDetails] = useState({
    checkingAcc: "",
    bankName: "",
    cardNumber: "",
    turnOver: "",
    taxPayer: "",
    nationalClassifier: "",
  });

  const [stepContent] = useState([
    "Enter your personal information to get closer to companies.",
    "Get to know better by adding your diploma, certificate, and education life.",
    "Help companies get to know you better by telling them about your past experiences.",
    "Add your profile picture and let companies find you fast.",
  ]);

  const nextStep = () => {
    if (!validateForm()) {
      return;
    }
    setFormNumber((prevFormNumber) => prevFormNumber + 1);
  };

  const prevStep = () => {
    setFormNumber((prevFormNumber) => prevFormNumber - 1);
  };

  // const onFinish = () => {
  //   useUsersApi.signUp(managerSignUp).then((res) => {
  //     if (res.status === 201 || res.status === 200 || res.status === 500) {
  //       console.log("success");
  //     }
  //   });
  // };

  useEffect(() => {
    // Backendga yuborish uchun kerakli ma'lumotlarni aniqlang
    const userData = managerSignUp;

    // Axios orqali backendga POST so'rovi yuboring
    axios
      .post(
        "https://medify-backend-api.onrender.com/api/company/signup/?verification_system=email",
        userData,
        {
          headers: {
            verification_system: "email",
            "Content-Type": "application/json", // email so'zini headerga qo'shing
          },
        }
      )
      .then((res) => {
        // Backenddan kelgan javobni qayta ishlang
        console.log(res.data);
      })
      .catch((error) => {
        // Xatolarni qayta ishlang
        console.error("Xato:", error);
      });
  }, [managerSignUp]);

  const validateForm = () => {
    return true;
  };

  const handleChange = (field, value) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      [field]: value,
    }));

    setManagerSignUp((e) => ({
      ...e,
      [field]: value,
    }));

    setDocDetails((e) => ({
      ...e,
      [field]: value,
    }));
  };

  return (
    <div className="container">
      <div className="card">
        <div className="form">
          <div className="left-side">
            <div className="left-heading">
              <h3>Medify and Studify</h3>
            </div>
            <div className="steps-content">
              <h3>
                Step <span className="step-number">{formNumber + 1}</span>
              </h3>
              {stepContent.map((content, index) => (
                <p
                  key={index}
                  className={`step-number-content ${
                    index === formNumber ? "active" : "d-none"
                  }`}
                >
                  {content}
                </p>
              ))}
            </div>
            <ul className="progress-bar">
              <li className={formNumber >= 0 ? "active" : ""}>
                Personal Information
              </li>
              <li className={formNumber >= 1 ? "active" : ""}>Basic details</li>
              <li className={formNumber >= 2 ? "active" : ""}>
                Document Details
              </li>
              <li className={formNumber >= 3 ? "active" : ""}>User Photo</li>
            </ul>
          </div>

          <div className="right-side">
            {stepContent.map((content, index) => (
              <div
                key={index}
                className={`main ${index === formNumber ? "active" : ""}`}
              >
                {/* Your form content */}
                {index === 0 && (
                  <div className="input-text">
                    <div className="input-div">
                      <input
                        type="email"
                        required
                        value={managerSignUp.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                      />
                      <span>Email Address</span>
                    </div>

                    <div>
                      <Space direction="vertical" style={{ width: "100%" }}>
                        <Input.Password
                          className="password"
                          value={managerSignUp.password}
                          onChange={(e) =>
                            handleChange("password", e.target.value)
                          }
                          style={{
                            height: "40px",
                            width: "600px",
                            border: "none",
                            outline: "0",
                            borderRadius: "5px",
                            border: "1px solid #cbced4",
                            padding: "0px 10px",
                          }}
                          placeholder="Password"
                          iconRender={(visible) =>
                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                          }
                        />
                      </Space>
                    </div>

                    <div className="input-div">
                      <input
                        type="text"
                        required
                        value={managerSignUp.phone_number}
                        onChange={(e) =>
                          handleChange("phone_number", e.target.value)
                        }
                      />
                      <span>Phone Number</span>
                    </div>

                    <div className="input-div">
                      <input
                        type="text"
                        required
                        value={userData.company_name}
                        onChange={(e) =>
                          handleChange("company_name", e.target.value)
                        }
                      />
                      <span>Company Name</span>
                    </div>

                    <button>Submit</button>
                  </div>
                )}

                {index === 1 && (
                  <div className="input-text">
                    <div className="input-div">
                      <input
                        type="text"
                        required
                        value={userData.industry}
                        onChange={(e) =>
                          handleChange("industry", e.target.value)
                        }
                      />
                      <span>Industry</span>
                    </div>
                    <div className="input-div">
                      <input
                        type="text"
                        required
                        value={userData.city}
                        onChange={(e) => handleChange("city", e.target.value)}
                      />
                      <span>City</span>
                    </div>

                    <div className="input-div">
                      <input
                        type="text"
                        required
                        value={userData.workPhoneNumber}
                        onChange={(e) =>
                          handleChange("workPhoneNumber", e.target.value)
                        }
                      />
                      <span>Work Phone Number</span>
                    </div>

                    <div className="input-div">
                      <input
                        type="text"
                        required
                        value={userData.firstName}
                        onChange={(e) =>
                          handleChange("firstName", e.target.value)
                        }
                      />
                      <span>First Name</span>
                    </div>

                    <div className="input-div">
                      <input
                        type="text"
                        required
                        value={userData.lastName}
                        onChange={(e) =>
                          handleChange("lastName", e.target.value)
                        }
                      />
                      <span>Last Name</span>
                    </div>

                    <div className="input-div">
                      <input
                        type="text"
                        required
                        value={userData.birthday}
                        onChange={(e) =>
                          handleChange("birthday", e.target.value)
                        }
                      />
                      <span>Birth day</span>
                    </div>
                  </div>
                )}

                {index === 2 && (
                  <div className="input-text ">
                    <div className="input-div">
                      <input
                        type="text"
                        required
                        value={docDetails.checkingAcc}
                        onChange={(e) =>
                          handleChange("checkingAcc", e.target.value)
                        }
                      />
                      <span>Checking account</span>
                    </div>
                    <div className="input-div">
                      <input
                        type="text"
                        required
                        value={docDetails.bankName}
                        onChange={(e) =>
                          handleChange("bankName", e.target.value)
                        }
                      />
                      <span>Bank name</span>
                    </div>
                    <div className="input-div">
                      <input
                        type="text"
                        required
                        value={docDetails.cardNumber}
                        onChange={(e) =>
                          handleChange("cardNumber", e.target.value)
                        }
                      />
                      <span>Card number</span>
                    </div>
                    <div className="input-div">
                      <input
                        type="text"
                        required
                        value={docDetails.turnOver}
                        onChange={(e) =>
                          handleChange("turnOver", e.target.value)
                        }
                      />
                      <span>Interbranch Turnover</span>
                    </div>

                    <div className="input-div">
                      <input
                        type="text"
                        required
                        value={docDetails.taxPayer}
                        onChange={(e) =>
                          handleChange("taxPayer", e.target.value)
                        }
                      />
                      <span>Taxpayer Identification Number</span>
                    </div>

                    <div className="input-div">
                      <input
                        type="text"
                        required
                        value={docDetails.nationalClassifier}
                        onChange={(e) =>
                          handleChange("nationalClassifier", e.target.value)
                        }
                      />
                      <span>National Classifier....</span>
                    </div>
                  </div>
                )}

                {index === 3 && <div className="user_card"></div>}
                <div className="buttons button_space">
                  {index > 0 && (
                    <button className="back_button" onClick={prevStep}>
                      Back
                    </button>
                  )}
                  {index < 3 && (
                    <button className="next_button" onClick={nextStep}>
                      Next Step
                    </button>
                  )}
                  {index === 3 && (
                    <>
                      <button className="submit_button">Submit</button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="image">
          <img src={Gif} alt="Doctors" />
          {/* <img src="/gif/Doctors.gif" alt="Doctors" /> */}
        </div>
      </div>
    </div>
  );
};

export default App;
