import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import './reports.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const Report = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('https://timer-backend-mu.vercel.app/reports')
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function saveTableAsPDF() {
    // Initialize jsPDF
    const doc = new jsPDF();
  
    // Set the font size and type
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
  
    // Add the title
    doc.text("Timer Reports", 10, 20);
  
    // Set the font size and type for the subtitle
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
  
    // Set the font size and type for the date and time
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
  
    // Add the date and time
    const date = new Date();
    const dateString = ${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()};
    const timeString = ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()};
    doc.text(Downloaded for the date: ${dateString} at ${timeString}, 10, 25);
  
    // Get the table HTML element
    const table = document.querySelector("table");
  
    // Convert the table to a canvas element
    html2canvas(table).then(function(canvas) {
      // Add the canvas to the PDF document
      doc.addImage(canvas.toDataURL("image/png"), "PNG", 10, 35, 180, 0);
  
      // Save the PDF document
      doc.save("reports.pdf");
    });
  }  
  return (
    <>
      
      <h1 style={{ textAlign: 'center', position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)' }}>Reports</h1>

          {/* <button >Save as PDF</button> */}
          
          <TableContainer component={Paper}>
            <Table aria-label="Reports">
              <TableHead >
                <TableRow>
                  <TableCell sx={{ color:'white' }}>Name</TableCell>
                  <TableCell sx={{ color:'white' }}>Time</TableCell>
                  <TableCell sx={{ color:'white' }}>Speech Type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>{item.Name}</TableCell>
                    <TableCell>{item.Time}</TableCell>
                    <TableCell>{item.SpeechType}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        
        <button class="print-button" onClick={saveTableAsPDF}><span class="print-icon">Print</span></button>
   
    </>
  );
};

export default Report;