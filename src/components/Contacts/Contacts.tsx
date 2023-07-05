import React from 'react'
import ContactsList from './ContactsList'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'


const Contacts = () => {
  const items = useSelector(state=>state)
// @ts-ignore
const employeeslist = items.Employees
  return (
    <div className='w-full'>
      <div className=" text-white  flex font-Montserrat font-bold text-base items-center justify-center pt-10  cursor-pointer">
        <p  className='bg-black px-2 py-2 rounded-[10px] '><Link to='/form'>Create Contact</Link></p>
      </div>
      <ContactsList />
      {/* {employeeslist.length>0?<ContactsList />:"No Data Found"} */}
    </div>
  )
}

export default Contacts