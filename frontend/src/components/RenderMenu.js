import React, { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AiFillCaretDown } from "react-icons/ai";
import { UserContext } from "../App";
import Cookies from 'js-cookie';

const RenderMenu = () => {
  const { state } = useContext(UserContext);
  const [reg, setReg] = useState(false);
  const [dropbtn, setDropbtn] = useState(false);
  const [role, Setrole] = useState(3);
  const handleRegister = () => {
    setReg(!reg);
    setDropbtn(!dropbtn);
  };
  
  // const callProfilePage = async () => {
  //   try {
  //     const res = await fetch("/profile", {
  //       method: "GET",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       credentials: "include",
  //     });
  //     const data = await res.json();
  //     console.log("Role is set");
  //     if (res.status !== 200) {
  //       Setrole(3);
  //     } else {
  //       Setrole(data.role);
  //     }
  //   } catch (err) {
  //     Setrole(3);
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   // const interval = setInterval(() => {
  //     callProfilePage();
  //   // }, 1000); // 1 seconds

  //  // return () => clearInterval(interval);
  // }, []);

  const getcookievalue = () => {
    const cookievalue = Cookies.get('userRole');
    console.log("cookievalue  ", cookievalue);
    if(cookievalue){
      console.log("in if " , cookievalue);
      Setrole(cookievalue);
      console.log("role", role);
    }
    else{
      console.log("in else" , cookievalue);
      Setrole(3);
    }
  }

  // useEffect(() => {
  //   // const interval = setInterval(() => {
  //     console.log("Inside useEffect");
  //     getcookievalue();
  // //   }, 1000); // 1 seconds

  // //  return () => clearInterval(interval);
  // }, [role]);

  useEffect(() => {
    const interval = setInterval(() => {
      getcookievalue();
    }, 1000); // 1 seconds
    return () => clearInterval(interval);
  }, [role]);


  console.log("state of user ", state);
  console.log("role of user ", role);
  if (role == 0) {
    //company
    return (
      <>
        <li>
          <NavLink exact to="/addJob">
            Add Job
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/acceptApplication">
            Accepted Application
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/logout">
            Log Out
          </NavLink>
        </li>
      </>
    );
  } else if (role == 1) {
    //applicant
    return (
      <>
        <li>
          <NavLink exact to="/viewcompany">
            View Company
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/logout">
            Log Out
          </NavLink>
        </li>
      </>
    );
  } else if (role == 2) {
    //admin
    return (
      <>
        <li>
          <NavLink exact to="/viewapplicants">
            View Applicant
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/viewcompany">
            View Company
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/viewcontact">
            Messages
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/logout">
            Log Out
          </NavLink>
        </li>
      </>
    );
  } else {
    console.log("in else of render", role);
    //logout
    return (
      <>
        <li>
          <NavLink exact to="/login">
            Login
          </NavLink>
        </li>
        <li>
          <div className="dropdown">
            <div className="dropbtn" onClick={handleRegister}>
              Register
              <AiFillCaretDown />
            </div>

            <div id="regdrop" className={reg ? "dropdown-content" : "hidedrop"}>
              <NavLink
                id="comreg"
                exact
                to="/companyRegister"
                onClick={handleRegister}
              >
                Company
              </NavLink>
              <NavLink
                id="comreg"
                exact
                to="/applicantRegister"
                onClick={handleRegister}
              >
                Applicant
              </NavLink>
            </div>
          </div>
        </li>
      </>
    );
  }
};

export default RenderMenu;
