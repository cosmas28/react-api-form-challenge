/*
  Goto https://reqres.in/ for documentation on this api.
  
  If you haven't used axios, documentation here: https://github.com/axios/axios
  OR use any method / library you're comfortable with to perform the request(s).

  **** These stubs are just provided as a convienece, ****
  **** feel free to change whatever you like to accomplish the goal. ****
*/

import axios from "axios";

const baseUrl = "https://reqres.in/api/users?page=2";

export const getUsers = async () => {
  const response = await axios.get(baseUrl);

  return response.data.data;
};

// Bonus:
export const deleteUser = (users, userId) => {
  const filteredUsers = users.filter((user) => user.id !== userId);

  return filteredUsers;
};
