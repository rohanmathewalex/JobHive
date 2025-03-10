import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddJobPage = ({ addJobSubmit }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Full-Time');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [salary, setSalary] = useState('Under $50K');
  const [companyName, setCompanyName] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();

    const newJob = {
      id: Date.now().toString(), 
      title,
      type,
      location,
      description,
      salary,
      company: {
        name: companyName,
        description: companyDescription,
        contactEmail,
        contactPhone
      }
    };

    const existingJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    const updatedJobs = [...existingJobs, newJob];

    localStorage.setItem("jobs", JSON.stringify(updatedJobs));

    toast.success("Job Added Successfully");
    navigate("/jobs");
  };

  return (
    <form onSubmit={submitForm}>
      {/* Your Form Fields */}
      <button type="submit">Add Job</button>
    </form>
  );
};

export default AddJobPage;
