import React from 'react'
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
const SeeRep=()=>{
    const nav=useNavigate();
    return(
        <Button
                className="reset-button"
                variant="contained"
                onClick={()=>nav('/reports')}
                style={{
                  borderRadius: 20,
                  backgroundColor: "black",
                  color: "#F2DF74",
                  padding: "8px 16px",
                  fontSize: "18px",
                }}
              >
                view report
              </Button>
    )
}
export default SeeRep;