import APIEndpoints from "./EndPoints";
import { apiCallingCommon } from "../../../../../Service/Utilities/apiCalling";

export const authenticate = async (formdata) => {
  try {
    const requestData = {
      main: {
        ...formdata,
      },
    };
    const result = await apiCallingCommon(
      requestData,
      APIEndpoints.Login.validateLogin
    );
    if (result.successCode === 1) {
      if (result.responseData) {
        return {
          response: result,
        };
      } else {
        return {
          response: result,
        };
      }
    } else {
      return {
        response: result,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      response: {
        successCode: 0,
        successMsg: error.message,
      },
    };
  }
};
