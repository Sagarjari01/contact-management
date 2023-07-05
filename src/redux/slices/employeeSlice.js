import {createSlice} from '@reduxjs/toolkit'

const employeeSlice = createSlice({
    initialState : [],
    name: "Employees",
    reducers:{
        addEmployee: (state, action) =>{
            state.push(action.payload)
        },
        editEmployee: (state, action) => {
            const { id, updatedEmployee } = action.payload;
            const employeeIndex = state.findIndex((employee) => employee.id === id);
            if (employeeIndex !== -1) {
              state[employeeIndex] = { ...state[employeeIndex], ...updatedEmployee };
            }
        },
        deleteEmployee: (state, action) => {
            const id = action.payload;
            const employeeIndex = state.findIndex((employee) => employee.id === id);
            if (employeeIndex !== -1) {
              state.splice(employeeIndex, 1);
            }
        },
    }
})
export const {addEmployee, editEmployee, deleteEmployee } = employeeSlice.actions
export default employeeSlice.reducer