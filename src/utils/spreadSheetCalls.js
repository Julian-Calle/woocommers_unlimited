import axios from "axios";
const { REACT_APP_BASE_URL, REACT_APP_CONECTION_ID, REACT_APP_CONECTION_ID_2 } =
  process.env;
const URL = `${REACT_APP_BASE_URL}${REACT_APP_CONECTION_ID}/tabs/`;
const URL_2 = `${REACT_APP_BASE_URL}${REACT_APP_CONECTION_ID_2}/tabs/`;

export const getDataFromTab = async (tab) => {
  const url = `${URL}${tab}`;
  const spreadSheet = await axios(url)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.alert(error);
    });
  return spreadSheet;
};

export const getDataFromTabWeb = async (tab) => {
  const url = `${URL_2}${tab}`;
  const spreadSheet = await axios(url)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.alert(error);
    });
  return spreadSheet;
};
export const addDataToTab = async (rows, tab) => {
  const url = `${URL}${tab}`;

  await axios
    .post(url, rows)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.alert(error);
    });
};
export const deleteAllDataFromTab = async (tab, column) => {
  const url = `${URL}${tab}/${column}/**`;

  await axios
    .delete(url)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.alert(error);
    });
};
