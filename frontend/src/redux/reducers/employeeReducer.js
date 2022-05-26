/* eslint-disable no-fallthrough */
import {
  FETCH_EMPLOYEE_DATA,
  ADD_EMPLOYEE_DATA,
  UPDATE_EMPLOYEE,
  DELETE_EMPLOYEE,
} from "../actions/types/employeeTypes";

const initialState = [];

const employeeReducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case FETCH_EMPLOYEE_DATA:
      return action.employees.data;

    case UPDATE_EMPLOYEE:
      const { newData, id } = payload;

      const index = state.findIndex((c) => c.id === id);
      const newEmployeeState = [...state];

      newEmployeeState[index].name = newData.name;
      newEmployeeState[index].contact_no = newData.contact_no;
      newEmployeeState[index].designation = newData.description;

      return [...newEmployeeState];

    case ADD_EMPLOYEE_DATA:
      const data = {};

      for (let key of payload.keys()) {
        data[key] = payload.get(key);
      }

      return [data, ...state];

    case DELETE_EMPLOYEE:
      const newEmpState = state.filter((emp) => emp.id !== payload);
      return [...newEmpState];

    default:
      return state;
  }
};
export default employeeReducer;
