import React, { useState,useEffect } from 'react';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Route,
    NavLink,
    Link
  } from "react-router-dom";
  import "./jobs.css"
function Jobs(props) {
   const [jobs, setJobs] = useState([])
  const [filter,setFilter] = useState({
      location:"",
      job_type:"",
      skill_1:"",
      skill_2:"",
      skill_3:""
  })
  useEffect(() => {
    axios.get("https://divercity-test.herokuapp.com/jobs")
              .then(res => {
                setJobs(res.data.jobs)
                console.log(res.data.jobs)
              })
              .catch(err => console.log(err))
               
               
  },[])
  const handleChange = e => {
   
    e.preventDefault()
setFilter({...filter,[e.target.name]:e.target.value})
   console.log(filter)
  };
   return (
       <form className="column">
         <h3>Job Search</h3>
          <input
          id="name"
          name="location"
          required
          onChange={handleChange}
          placeholder="Search for locations here"
          value={filter.location}
          />
          <input
          id="name"
          name="job_type"
          required
          onChange={handleChange}
          placeholder="Search for job types here"
          value={filter.job_type}
          />
          <input
          id="name"
          name="skill_1"
          required
          onChange={handleChange}
          placeholder="Search for unique skills"
          value={filter.skill_1}
          /><input
          id="name"
          name="skill_2"
          required
          onChange={handleChange}
          placeholder="Search for unique skills"
          value={filter.skill_2}
          /><input
          id="name"
          name="skill_3"
          required
          onChange={handleChange}
          placeholder="Search for unique skills"
          value={filter.skill_3}
          />

      {jobs
      .filter(i => filter.location.length > 1 ? filter.location === i.location : i.id > 0)
      .filter(i => filter.job_type.length > 1 ? filter.job_type === i.job_type : i.id > 0)
      .filter(i => filter.skill_1 === "" && filter.skill_2 === "" && filter.skill_3 === "" ? i.id > 0 : i.skills_tag.includes(filter.skill_1) || i.skills_tag.includes(filter.skill_2) || i.skills_tag.includes(filter.skill_3))
      .map(job => 
        <div className="card" id={job.id}>
            <Link className="job-title" to={`/job/${job.id}`}> <p>{job.title}</p> </Link>
            <p>{job.description}</p>
            <p>{job.location}</p>     
            <p>{job.job_type}</p>
            <p>{job.company}</p>
            </div>
        )}
        </form>
   )
}
export default Jobs;