import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteEmployee } from "../../redux/slices/employeeSlice";
const ContactsList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items = useSelector((state) => state);
  // @ts-ignore
  const employeeslist = items.Employees;

  const navigateToComponent = (employee: any) => {
    console.log("called here", employee);
    navigate("/form", { state: { data: { employee } } });
  };

  const handleDelete = (id: number) => {
    dispatch(deleteEmployee(id));
    navigate("/");
  };

  return (
    <div className="flex flex-wrap justify-center">
  {employeeslist.map((emp: any) => (
    <div className="m-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
      <div className="px-8 py-8 bg-slate-300 rounded-[10px]">
        <h2 className="text-center font-bold text-3xl">{emp.fname}</h2>
        <div
          onClick={() => navigateToComponent(emp)}
          className="text-white flex font-Montserrat font-bold text-base items-center justify-center pt-2 cursor-pointer"
        >
          <p className="bg-black px-2 py-2 rounded-[10px] w-24 text-center">
            Edit
          </p>
        </div>
        <div
          onClick={() => handleDelete(emp.id)}
          className="text-white flex font-Montserrat font-bold text-base items-center justify-center pt-2 cursor-pointer"
        >
          <p className="bg-black px-2 py-2 rounded-[10px] w-24 text-center">
            Delete
          </p>
        </div>
      </div>
    </div>
  ))}
</div>
  );
};

export default ContactsList;
