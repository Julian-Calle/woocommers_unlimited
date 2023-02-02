import axios from "axios";
const { REACT_APP_BASE_URL, REACT_APP_CONECTION_ID } = process.env;
const URL = `${REACT_APP_BASE_URL}${REACT_APP_CONECTION_ID}/tabs/`;

export const getDataFromTab = async (tab) => {
  const url = `${URL}${tab}`;
  const spreadSheet = await axios(url)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  return spreadSheet;
};
export const addDataToTab = async (rows, tab) => {
  const url = `${URL}${tab}`;

  const spreadSheet = await axios
    .post(url, rows)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  console.log({ spreadSheetADD: spreadSheet });
};
export const deleteAllDataFromTab = async (tab, column) => {
  const url = `${URL}${tab}/${column}/**`;

  const spreadSheet = await axios
    .delete(url)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  console.log({ spreadSheetADD: spreadSheet });
};
