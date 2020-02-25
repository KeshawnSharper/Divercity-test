import React,{useEffect,useState} from "react"
import axios from "axios"
const Job = props => {
    const [job,setJob] = useState({})
    const [applied,setApplied] = useState(false)
    const [resume,setResume] = useState({
      motivation:"",
      cover_letter:""
    })
    const id = Number(props.match.params.id)
    useEffect(() => {
        axios.get("https://divercity-test.herokuapp.com/jobs")
                  .then(res => {
                    setJob(res.data.jobs.filter(i => i.id === id)[0])
                    console.log(res.data.jobs)
                  })
                  .catch(err => console.log(err))
                   
                   
      },[])
      console.log(job)
      const apply = e => {
        axios.post(`https://divercity-test.herokuapp.com/jobs/${id}/apply`,resume,{
        headers:{
          Authorization:localStorage.getItem("token"),
          "Content-Type":"application/json; charset=utf-8"
        }
      }
        )
        .then(i => {
          console.log(i)
          
        })
        .catch(err => {
          console.log(err)
        }
        )
        setApplied(!applied)
        console.log(applied)
       e.preventDefault()
      }
      const handleChange = e => {
        e.preventDefault()
        setResume({...resume,[e.target.name]:e.target.value})
        console.log(resume)
    }
    console.log(applied)
    return  (
    <form className=" container "
    onSubmit={apply}>
    <p> {job.title} </p>
    <p className="description">{job.description}</p>
    <p>{job.location}</p>     
    <p>{job.job_type}</p>
    <p>{job.company}</p>
    <textarea name="motivation" value={resume.motivation} onChange={handleChange} />
    <br></br>
    <textarea name="cover_letter" value={resume.cover_letter} onChange={handleChange} />
    {
      applied && localStorage.getItem("token")
      ?  
      <button disabled> Applied </button>
      :
      applied && !localStorage.getItem("token")
      ?
      <p className="error">Please Log in</p>
      :
      <button > Apply Now </button>
    }
   
    </form>
    )
}
export default Job