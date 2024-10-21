import axios from "../../Configuration/axios/axios";
import Config from "../../Configuration/Config.json";

export const apiCallingCommon = async (requestApiData, apiPath) => {
  debugger;
  try {
    const requestData = {
      ...requestApiData.main,
    };

    const response = await axios.post(Config.BaseUrl + apiPath, requestData, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (response.status === 200) {
      const result = await response.data;
      if (result.successCode.toString() === "200") {
        return {
          successCode: 1,
          success: result.success,
          responseData: result.responseData,
          successMsg: result.successMsg,
        };
      }
      return {
        successCode: 0,
        success: result.success,
        responseData: [],
        successMsg: result.successMsg,
      };
    }
    return {
      successCode: 0,
      success: null,
      responseData: [],
      successMsg: "",
    };
  } catch (error) {
    return {
      successCode: 0,
      responseData: null,
      // A responseMessage: error && error.response && error.response.data && error.response.data.responseMessage ? error.response.data.responseMessage : "",
      successMsg: error.message,
    };
  }
};
