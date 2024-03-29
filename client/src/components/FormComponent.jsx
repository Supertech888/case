import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
// import { sendCase } from "../api/case";
import { Box } from "@mui/material";
import { Input, Row, Col } from "antd";
import moment from "moment/min/moment-with-locales";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SweetAlert from "sweetalert2";
const { TextArea } = Input;

import { useStore, useStoreSetting } from "../service/zustand/storeCase";
import DetailInput from "../views/formcase/DetailInput";
import GameInput from "../views/formcase/GameInput";
import ProblemInput from "../views/formcase/ProblemInput";
import ReporterInput from "../views/formcase/ReporterInput";
import WalletInput from "../views/formcase/WalletInput";
import { storeAuth } from "../service/store/storeZustand";



const navDropdownItemStyle = {
  display: "flex",
  alignItems: "center",
  gap: "1px",
};

const FormComponent = () => {

  const { getEditors } = useStoreSetting()

  const dataEditor = useStoreSetting((state) => state.resEditor.resultData);

  const nameEditor = dataEditor ? dataEditor.filter((item) => item.select === true) : []
  const editorSelect = nameEditor.map((item) => { return item.username })

  const editorSelect2 = editorSelect.length > 0 ? nameEditor[0].username : '';

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  useEffect(() => {
    fetchData();
    fetchTypesName();
    getEditors();

  }, []);

  //==============================================================================

  const fetchData = useStore((state) => state.fetchData)
  const fetchTypesName = useStore((state) => state.fetchTypesName)
  //Request post


  const createCase = useStore((state) => state.createCase)

  //RequestGet
  const data = useStore((state) => state.cases)

  const data2 = useStore((state) => state.typesName)


  const newDataType = data.map((item) => { return item.data.type.types })

  const newDataType2 = data2.map((item) => { return item.data.main.typeName })

  const typeProb = ([...new Set(newDataType)]).filter(Boolean);


  const typeProb2 = ([...new Set(newDataType2)]).filter(Boolean);

  //Type 
  const problemType = data.filter((item) => typeProb[0].includes(item.data.type.types));


  const problemType2 = data2.filter((item) => typeProb2[0].includes(item.data.main.typeName));



  const problemTypeName = new Set(problemType.map((item) => { return item.data.type.name }))


  const problemTypeName2 = new Set(problemType2.map((item) => { return item.data.main.sub.name }))



  const newProbType = [...problemTypeName]


  const newProbType2 = [...problemTypeName2]




  const username2 = storeAuth((state) => state.user)



  const getUser = username2.payLoad.user.username;

  const navigate = useNavigate();
  const [values, setValues] = useState({
    reporter: "",
    problem: "",
    problemDetail: "",
    detail: "",
    campgame: "",
    wallet: "",
    editors: editorSelect2,
    recorder: getUser,
  });

  const {
    reporter,
    problemDetail,
    problem,
    detail,
    campgame,
    wallet,
    recorder,
    // editors
  } = values;

  const timestamps = moment().format("LLL"); // June 26, 2023 4:36 PM
  const caseDataForExcel = {
    reporter,
    problemDetail,
    problem,
    detail,
    campgame,
    wallet,
    recorder,
    timestamps,
    // editors
  };
  const inputValue = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
    setCampGames(e.target.value);
    setSelectedDetail(e.target.value);
    setIsButtonDisabled(false)

  };

  const submitForm = async (e) => {
    setIsButtonDisabled(true)
    e.preventDefault();

    try {

      // ไม่ฟรีแล้ว
      //await axios.post("https://sheet.best/api/sheets/490e1f2e-21aa-4b61-9d12-a52da3780268", caseDataForExcel);

      // const res = await createCase(values)
      if (values) {
        const res = await createCase(values)

        setValues(Object.fromEntries(Object.keys(values).map(key => [key, ""])));


        SweetAlert.fire("แจ้งเตือน", res.message, "success");
        setTimeout(() => {
          navigate("/dashboard/listunresolve");
        }, 2000);
      }
      // setValues({
      //   reporter: "",
      //   problem: "",
      //   problemDetail: "",
      //   detail: "",
      //   campgame: "",
      //   wallet: "",
      // });
      // setValues(Object.fromEntries(Object.keys(values).map(key => [key, ""])));
      // //กำหนดให้เป็นค่าว่างหลังจากกดตกลง


      SweetAlert.fire("แจ้งเตือน", res.message, "success");
      // setTimeout(() => {
      //   navigate("/dashboard/listunresolve");
      // }, 2000);
    } catch (error) {

      console.log('เกิดอะไรขึ้น', error);
    }
  };

  const [faculty, setFaculty] = useState("");

  const handleFacultyChange = (e) => {
    setFaculty(e.target.value); // Reset major when faculty changes
  };
  //* state ของการเลือก ประเภทของปัญหา
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  //* state ของการเลือก รายละเอียดของปัญหา
  const [selectedDetail, setSelectedDetail] = useState("");
  //* state ของการเลือกค่ายเกม
  const [campGames, setCampGames] = useState("");

  return (
    <div className="mt-2">

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Form onSubmit={submitForm}>

          <ReporterInput inputValue={inputValue} reporter={reporter} />

          <ProblemInput
            selectedOption={selectedOption}
            inputValue={inputValue}
            handleChange={handleChange}
            values={values}
            newProbType2={newProbType2}
          />

          <DetailInput inputValue={inputValue} detail={detail} />

          <GameInput navDropdownItemStyle={navDropdownItemStyle}
            inputValue={inputValue}
            values={values}
            typeProb={typeProb}
            data={data2}
            selectedOption={selectedOption}
            newProbType={newProbType}
          />

          <WalletInput navDropdownItemStyle={navDropdownItemStyle}
            inputValue={inputValue}
            wallet={wallet}
            typeProb={typeProb}
            data={data2}
          />
          
          <Input
            //type="hidden"
            defaultValue={editorSelect}
            value={editorSelect}
            //onChange={inputValue("editors")}
            name="editors"
            disabled

          />
          <hr />
          <Row justify={"end"}>
            <Col>
              <Button
                type="submit"
                className="btn btn-primary"
                value="Submit"
                style={{ marginLeft: 320 }}
                disabled={isButtonDisabled}
              >
                บันทึก
              </Button>

            </Col>
          </Row>

        </Form>
      </Box>

    </div>
  );
};

export default FormComponent;
