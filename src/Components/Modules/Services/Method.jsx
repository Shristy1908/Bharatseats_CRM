import { apiCallingCommon } from "../../../Service/Utilities/apiCalling";
import ApiEndPonits from "./EndPoints";

export const locationDetailsData = async (formdata) => {
  debugger;
  try {
    const requestData = {
      main: {
        ...formdata,
      },
    };
    debugger;
    const result = await apiCallingCommon(
      requestData,
      ApiEndPonits.bsEndPoints.locationDetails
    );
    debugger;
    if (result.successCode === 1) {
      if (result.responseData) {
        return { response: result };
      }
      return { response: result };
    }
    return { response: result };
  } catch (error) {
    return {
      response: { successCode: 0, responseData: null, successMsg: error },
    };
  }
};

export const getUserTypeList = async (formdata) => {
  debugger;
  try {
    const requestData = {
      main: {
        ...formdata,
      },
    };
    const result = await apiCallingCommon(
      requestData,
      ApiEndPonits.bsEndPoints.userTypeList
    );
    if (result.successCode === 1) {
      if (result.responseData) {
        return { response: result };
      }
      return { response: result };
    }
    return {
      response: result,
    };
  } catch (error) {
    return {
      response: {
        successCode: 0,
        responseData: null,
        successMsg: error,
      },
    };
  }
};

export const getbrHeadTypeList = async (formdata) => {
  debugger;
  try {
    const requestData = {
      main: {
        ...formdata,
      },
    };
    const result = await apiCallingCommon(
      requestData,
      ApiEndPonits.bsEndPoints.brHeadTypeList
    );
    if (result.successCode === 1) {
      if (result.responseData) {
        return { response: result };
      }
      return { response: result };
    }
    return {
      response: result,
    };
  } catch (error) {
    return {
      response: {
        successCode: 0,
        responseData: null,
        successMsg: error,
      },
    };
  }
};

export const listOfProfile = async (formdata) => {
  try {
    const requestData = {
      main: {
        ...formdata,
      },
    };
    const result = await apiCallingCommon(
      requestData,
      ApiEndPonits.bsEndPoints.listOfProfile
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
    return {
      response: {
        successCode: 0,
        responseData: null,
        successMsg: error,
      },
    };
  }
};

export const menuListForProfile = async (formdata) => {
  try {
    const requestData = {
      main: {
        ...formdata,
      },
    };
    const result = await apiCallingCommon(
      requestData,
      ApiEndPonits.bsEndPoints.menuListForProfile
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
    return {
      response: {
        successCode: 0,
        responseData: null,
        successMsg: error,
      },
    };
  }
};

export const addProfile = async (formdata) => {
  debugger;
  try {
    const requestData = {
      main: {
        ...formdata,
      },
    };
    const result = await apiCallingCommon(
      requestData,
      ApiEndPonits.bsEndPoints.addProfile
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
    return {
      response: {
        successCode: 0,
        responseData: null,
        successMsg: error,
      },
    };
  }
};

export const addUser = async (formdata) => {
  debugger;
  try {
    const requestData = {
      main: {
        ...formdata,
      },
    };
    const result = await apiCallingCommon(
      requestData,
      ApiEndPonits.bsEndPoints.addUser
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
    return {
      response: {
        successCode: 0,
        responseData: null,
        successMsg: error,
      },
    };
  }
};

export const listOfUsers = async (formdata) => {
  try {
    const requestData = {
      main: {
        ...formdata,
      },
    };
    const result = await apiCallingCommon(
      requestData,
      ApiEndPonits.bsEndPoints.listOfUsers
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
    return {
      response: {
        successCode: 0,
        responseData: null,
        successMsg: error,
      },
    };
  }
};

export const addRole = async (formdata) => {
  debugger;
  try {
    const requestData = {
      main: {
        ...formdata,
      },
    };
    const result = await apiCallingCommon(
      requestData,
      ApiEndPonits.bsEndPoints.addRole
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
    return {
      response: {
        successCode: 0,
        responseData: null,
        successMsg: error,
      },
    };
  }
};

export const listOfMaterial = async (formdata) => {
  try {
    const requestData = {
      main: {
        ...formdata,
      },
    };
    const result = await apiCallingCommon(
      requestData,
      ApiEndPonits.bsEndPoints.listOfMaterial
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
    return {
      response: {
        successCode: 0,
        responseData: null,
        successMsg: error,
      },
    };
  }
};

export const addMaterial = async (formdata) => {
  debugger;
  try {
    const requestData = {
      main: {
        ...formdata,
      },
    };
    const result = await apiCallingCommon(
      requestData,
      ApiEndPonits.bsEndPoints.addMaterial
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
    return {
      response: {
        successCode: 0,
        responseData: null,
        successMsg: error,
      },
    };
  }
};

export const updateMaterial = async (formdata) => {
  debugger;
  try {
    const requestData = {
      main: {
        ...formdata,
      },
    };
    const result = await apiCallingCommon(
      requestData,
      ApiEndPonits.bsEndPoints.updateMaterial
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
    return {
      response: {
        successCode: 0,
        responseData: null,
        successMsg: error,
      },
    };
  }
};

export const searchMaterialFilter = async (formdata) => {
  try {
    const requestData = {
      main: {
        ...formdata,
      },
    };
    const result = await apiCallingCommon(
      requestData,
      ApiEndPonits.bsEndPoints.searchMaterialFilter
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
    return {
      response: {
        successCode: 0,
        responseData: null,
        successMsg: error,
      },
    };
  }
};

export const searchMaterial = async (formdata) => {
  try {
    const requestData = {
      main: {
        ...formdata,
      },
    };
    const result = await apiCallingCommon(
      requestData,
      ApiEndPonits.bsEndPoints.searchMaterial
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
    return {
      response: {
        successCode: 0,
        responseData: null,
        successMsg: error,
      },
    };
  }
};

export const updateUser = async (formdata) => {
  try {
    const requestData = {
      main: {
        ...formdata,
      },
    };
    const result = await apiCallingCommon(
      requestData,
      ApiEndPonits.bsEndPoints.updateUser
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
    return {
      response: {
        successCode: 0,
        responseData: null,
        successMsg: error,
      },
    };
  }
};

export const listOfSupplier = async (formdata) => {
  try {
    const requestData = {
      main: {
        ...formdata,
      },
    };
    const result = await apiCallingCommon(
      requestData,
      ApiEndPonits.bsEndPoints.listOfSupplier
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
    return {
      response: {
        successCode: 0,
        responseData: null,
        successMsg: error,
      },
    };
  }
};

export const updateSupplier = async (formdata) => {
  debugger;
  try {
    const requestData = {
      main: {
        ...formdata,
      },
    };
    const result = await apiCallingCommon(
      requestData,
      ApiEndPonits.bsEndPoints.updateSupplier
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
    return {
      response: {
        successCode: 0,
        responseData: null,
        successMsg: error,
      },
    };
  }
};

export const listOfPlant = async (formdata) => {
  try {
    const requestData = {
      main: {
        ...formdata,
      },
    };
    const result = await apiCallingCommon(
      requestData,
      ApiEndPonits.bsEndPoints.listOfPlant
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
    return {
      response: {
        successCode: 0,
        responseData: null,
        successMsg: error,
      },
    };
  }
};

export const addPlant = async (formdata) => {
  debugger;
  try {
    const requestData = {
      main: {
        ...formdata,
      },
    };
    const result = await apiCallingCommon(
      requestData,
      ApiEndPonits.bsEndPoints.addPlant
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
    return {
      response: {
        successCode: 0,
        responseData: null,
        successMsg: error,
      },
    };
  }
};

export const updatePlant = async (formdata) => {
  try {
    const requestData = {
      main: {
        ...formdata,
      },
    };
    const result = await apiCallingCommon(
      requestData,
      ApiEndPonits.bsEndPoints.updatePlant
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
    return {
      response: {
        successCode: 0,
        responseData: null,
        successMsg: error,
      },
    };
  }
};

export const listOfUnits = async (formdata) => {
  try {
    const requestData = {
      main: {
        ...formdata,
      },
    };
    const result = await apiCallingCommon(
      requestData,
      ApiEndPonits.bsEndPoints.listOfUnits
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
    return {
      response: {
        successCode: 0,
        responseData: null,
        successMsg: error,
      },
    };
  }
};

export const addUnit = async (formdata) => {
  debugger;
  try {
    const requestData = {
      main: {
        ...formdata,
      },
    };
    const result = await apiCallingCommon(
      requestData,
      ApiEndPonits.bsEndPoints.addUnit
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
    return {
      response: {
        successCode: 0,
        responseData: null,
        successMsg: error,
      },
    };
  }
};

export const updateUnit = async (formdata) => {
  try {
    const requestData = {
      main: {
        ...formdata,
      },
    };
    const result = await apiCallingCommon(
      requestData,
      ApiEndPonits.bsEndPoints.updateUnit
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
    return {
      response: {
        successCode: 0,
        responseData: null,
        successMsg: error,
      },
    };
  }
};

export const listOfCities = async (formdata) => {
  try {
    const requestData = {
      main: {
        ...formdata,
      },
    };
    const result = await apiCallingCommon(
      requestData,
      ApiEndPonits.bsEndPoints.listOfCities
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
    return {
      response: {
        successCode: 0,
        responseData: null,
        successMsg: error,
      },
    };
  }
};

export const addCity = async (formdata) => {
  debugger;
  try {
    const requestData = {
      main: {
        ...formdata,
      },
    };
    const result = await apiCallingCommon(
      requestData,
      ApiEndPonits.bsEndPoints.addCity
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
    return {
      response: {
        successCode: 0,
        responseData: null,
        successMsg: error,
      },
    };
  }
};

export const updateCity = async (formdata) => {
  try {
    const requestData = {
      main: {
        ...formdata,
      },
    };
    const result = await apiCallingCommon(
      requestData,
      ApiEndPonits.bsEndPoints.updateCity
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
    return {
      response: {
        successCode: 0,
        responseData: null,
        successMsg: error,
      },
    };
  }
};

export const manageSchedule = async (formdata) => {
  debugger;
  try {
    const requestData = {
      main: {
        ...formdata,
      },
    };
    const result = await apiCallingCommon(
      requestData,
      ApiEndPonits.bsEndPoints.manageSchedule
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
    return {
      response: {
        successCode: 0,
        responseData: null,
        successMsg: error,
      },
    };
  }
};

export const managePO = async (formdata) => {
  try {
    const requestData = {
      main: {
        ...formdata,
      },
    };
    const result = await apiCallingCommon(
      requestData,
      ApiEndPonits.bsEndPoints.managePO
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
    return {
      response: {
        successCode: 0,
        responseData: null,
        successMsg: error,
      },
    };
  }
};

export const manageInvoice = async (formdata) => {
  try {
    const requestData = {
      main: {
        ...formdata,
      },
    };
    const result = await apiCallingCommon(
      requestData,
      ApiEndPonits.bsEndPoints.manageInvoice
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
    return {
      response: {
        successCode: 0,
        responseData: null,
        successMsg: error,
      },
    };
  }
};

export const addCompanyProfile = async (formdata) => {
  debugger;
  try {
    const requestData = {
      main: {
        ...formdata,
      },
    };
    const result = await apiCallingCommon(
      requestData,
      ApiEndPonits.bsEndPoints.addCompanyProfile
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
    return {
      response: {
        successCode: 0,
        responseData: null,
        successMsg: error,
      },
    };
  }
};

export const addFinancialDetails = async (formdata) => {
  debugger;
  try {
    const requestData = {
      main: {
        ...formdata,
      },
    };
    const result = await apiCallingCommon(
      requestData,
      ApiEndPonits.bsEndPoints.addFinancialDetails
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
    return {
      response: {
        successCode: 0,
        responseData: null,
        successMsg: error,
      },
    };
  }
};

export const addHRDetails = async (formdata) => {
  debugger;
  try {
    const requestData = {
      main: {
        ...formdata,
      },
    };
    const result = await apiCallingCommon(
      requestData,
      ApiEndPonits.bsEndPoints.addHRDetails
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
    return {
      response: {
        successCode: 0,
        responseData: null,
        successMsg: error,
      },
    };
  }
};

export const addTechnicalDetails = async (formdata) => {
  debugger;
  try {
    const requestData = {
      main: {
        ...formdata,
      },
    };
    const result = await apiCallingCommon(
      requestData,
      ApiEndPonits.bsEndPoints.addTechnicalDetails
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
    return {
      response: {
        successCode: 0,
        responseData: null,
        successMsg: error,
      },
    };
  }
};

export const companyProfiles = async (formdata) => {
  debugger;
  try {
    const requestData = {
      main: {
        ...formdata,
      },
    };
    const result = await apiCallingCommon(
      requestData,
      ApiEndPonits.bsEndPoints.companyProfiles
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
    return {
      response: {
        successCode: 0,
        responseData: null,
        successMsg: error,
      },
    };
  }
};

export const vendorQuestionaire = async (formdata) => {
    debugger;
    try {
      const requestData = {
        main: {
          ...formdata,
        },
      };
      const result = await apiCallingCommon(
        requestData,
        ApiEndPonits.bsEndPoints.vendorQuestionaire
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
      return {
        response: {
          successCode: 0,
          responseData: null,
          successMsg: error,
        },
      };
    }
}

export const listOfFoc = async (formdata) => {
  try {
    const requestData = {
      main: {
        ...formdata,
      },
    };
    const result = await apiCallingCommon(
      requestData,
      ApiEndPonits.bsEndPoints.listOfFoc
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
    return {
      response: {
        successCode: 0,
        responseData: null,
        successMsg: error,
      },
    };
  }
};

export const listOfPPM = async (formdata) => {
  try {
    const requestData = {
      main: {
        ...formdata,
      },
    };
    const result = await apiCallingCommon(
      requestData,
      ApiEndPonits.bsEndPoints.listOfPPM
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
    return {
      response: {
        successCode: 0,
        responseData: null,
        successMsg: error,
      },
    };
  }
};

export const listOfECN = async (formdata) => {
  try {
    const requestData = {
      main: {
        ...formdata,
      },
    };
    const result = await apiCallingCommon(
      requestData,
      ApiEndPonits.bsEndPoints.listOfECN
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
    return {
      response: {
        successCode: 0,
        responseData: null,
        successMsg: error,
      },
    };
  }
};
