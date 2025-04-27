import React, { useEffect, useState } from "react";
import axios from "axios";
// import "../App.css";
import "./stopwatch.css";
import "./autocomplete.css";
import Button from "@mui/material/Button";
import Stopwatch from "./stopwatch";
import SeeRep from "../reportRedirect";
// import TextField from '@mui/material/TextField';
import {Toaster, toast} from 'react-hot-toast';
// import { MDBInput } from 'mdb-react-ui-kit';

export default function App() {
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  // const [names, setName] = useState("");
  const [stopTime, setStopTime] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedName, setSelectedName] = useState("");
  // var stype='';
  axios.defaults.withCredentials=true;

  useEffect(() => {
    axios
      .get("https://tm-backend-chi.vercel.app/members")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onSelect = (event) => {
    setSelectedName(event.target.value);
  };


  const handleSubmit = async () => {
    // stype=Stopwatch.selectedOption
    var today = new Date().toISOString().slice(0, 10);
    console.log("stime", stopTime);
    

    // console.log('stype',stype);
    const response = await axios.post(
      `https://tm-backend-chi.vercel.app/saveresult/${selectedName}/${today}/${stopTime}/${selectedOption}`
    );
    console.log(response.data);
    if (response.data) {
      toast.success('Data saved successfully',{
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
        iconTheme: {
          primary: '#713200',
          secondary: '#FFFAEE',
        },
      })
    } else {
      toast.error('Data not saved')
    }
  };

  const handleStop = (time,option) => {
    console.log(time);
    setStopTime(time);
    setSelectedOption(option);
    console.log(selectedOption);
  };

  return (
    <>
    <div className="App">
      <div><Toaster /></div>
      <div className="search-container">
      <div className="search-inner">
        <label className="NameLabel">
          Speaker Name:
          <input
            type="text"
            placeholder="Enter the name of the member"
            value={value}
            onChange={onChange}
            onSelect={onSelect}
            list="speakers"
          />
        </label>
        <datalist id="speakers">
          {data
            .filter((item) => {
              const searchTerm = value.toLowerCase();
              const fullName = item.Name.toLowerCase();

              return (
                searchTerm &&
                fullName.includes(searchTerm) &&
                fullName !== searchTerm
              );
            })
            .slice(0, 10)
            .map((item) => (
              <option key={item.Name} value={item.Name} />
            ))}
        </datalist>
      </div>
      {/* {selectedName && <p>Selected Name: {selectedName}</p>} */}
    </div>
   <Stopwatch onStop={handleStop} /><div className="save-button">
        <Button variant="contained"
          style={{
            borderRadius: 20,
            backgroundColor: "#004165",
            color: "#F2DF74",
            padding: "18px 36px",
            fontSize: "18px",
          }}
          onClick={handleSubmit}>Save to reports</Button>
      </div><div className="seeRepButton">
        <SeeRep />
      </div>
      {/* Display the stopped time */}
      {/* {stopTime && <div className="Stopwatch">Stopped Time: {stopTime}</div>} */}
    </div>
    </>
  );
}
