import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

const MobileNumberValidation = () => { //declaring a function that is called MobileNumberValidation
  const [mobileNumber, setMobileNumber] = useState("");   // declared two variables mobileNumber and setMobileNumber
  const [validationResult, setValidationResult] = useState(null);   //declared two more variables validationResult and setValidationResult. The 1st variable stores whether or not there is an error with number entered while the 2nd variable stores whether or not the number is validated
  const [isValid, setIsValid] = useState(false);
  const validateMobileNumber = async () => {
    try {
      const response = await axios.get( //using axios, which is an HTTP client library for JavaScript, to send another HTTP request asking for information about a particular phone number by sending a GET request with access_key and number=${mobileNumber} as parameters
        `http://apilayer.net/api/validate?access_key=31064a797249bfa615a689f6e4b83648&number=${mobileNumber}`
      );
      const { country_code, country_name, country_prefix, international_format, location, line_type, local_format, carrier } = response.data;//The result of this second request will be sent back in response object's data property: country_code, country_name, country_prefix, international_format, location, line_type, local_format , carrier
      setValidationResult({
        countryCode: country_code,
        countryName: country_name,
        countryPrefix: country_prefix,
        Format: international_format,
        countryLocation : location,
        localFormat : local_format,
        lineType : line_type,
        carrier,
      });
      if (response.data.valid) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
        }
         catch (error) {
      console.error(error);
      setValidationResult("Not Valid");
    }
  };
  return (
    <div class = "center, App-header">
      <h1 class = "font">
        Mobile Number Validation
      </h1>
      <input class = "focus, text2" 
        type="text"
        placeholder="Enter mobile number"
        value={mobileNumber}
        onChange={(e) => setMobileNumber(e.target.value)}/> 
   <button class = "button" onClick={validateMobileNumber}>Validate</button>
      {validationResult && (
        <div class = "bold">
          <p>Country Code: {validationResult.countryCode}</p>
          <p>Country Name: {validationResult.countryName}</p>
          <p>Country Prefix: {validationResult.countryPrefix}</p>
          <p>Local Format: {validationResult.localFormat}</p>
          <p>International Format: {validationResult.Format}</p>
          <p>Location: {validationResult.countryLocation}</p>
          <p>Line Type: {validationResult.lineType}</p>
          <p>Carrier: {validationResult.carrier}</p>
          {isValid ? <p>Phone Number is valid</p> : <p>Phone Number is not valid</p>}
        </div>
      )}
    </div>
  );
};
export default MobileNumberValidation;