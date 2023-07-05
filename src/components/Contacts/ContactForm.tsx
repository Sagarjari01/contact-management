import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate,useLocation } from "react-router-dom";
import { addEmployee, editEmployee, deleteEmployee  } from "../../redux/slices/employeeSlice";

function ContactForm() {
  const location = useLocation()  
  let data = location.state?.data || "";
  data = data.employee
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    id: data?data.id:Date.now(),
    fname: data? data.fname: "",
    lname: data?data.lname:"",
    status: data?data.status: "",
  });
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const isFormValid = Object.values(formData).every((value) => value !== "");
    if (!isFormValid) {
      alert("Please fill in all the required fields.");
      return;
    }
    if (data) {
      // If data exists, it means it's an edit operation
      dispatch(editEmployee({ id: data.id, updatedEmployee: formData }));
    } else {
      // Otherwise, it's an add operation
      dispatch(addEmployee(formData));
    }
    navigate('/');
  };

  return (
    <div className=" mx-auto p-4 w-full">
      <h2 className="text-2xl font-bold mb-4">{data?"Edit Form":"Contact Form"}</h2>
      <form>
        <div className="mb-4">
          <label className="block mb-2 font-bold" htmlFor="fname">
            First Name
          </label>
          <input
            className="w-full px-3 py-2 border rounded"
            type="text"
            id="fname"
            name="fname"
            required
            value={formData.fname}
            placeholder="Enter your First name"
            onChange={handleChange}
            
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold" htmlFor="lname">
            Last Name
          </label>
          <input
            className="w-full px-3 py-2 border rounded"
            type="email"
            id="lname"
            name="lname"
            value={formData.lname}
            placeholder="Enter your Last name"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <p className="block text-gray-700 font-bold mb-2">Status</p>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="status"
              value="Active"
              checked={formData.status === "Active"}
              required
              onChange={handleChange}
              className="form-radio text-blue-500"
            />
            <span className="ml-2">Active</span>
          </label>
          <label className="inline-flex items-center ml-6">
            <input
              type="radio"
              name="status"
              value="Inactive"
              checked={formData.status === "Inactive"}
              onChange={handleChange}
              className="form-radio text-blue-500"
              required
            />
            <span className="ml-2">Inactive</span>
          </label>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSubmit}
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
