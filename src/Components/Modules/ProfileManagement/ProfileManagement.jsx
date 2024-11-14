import React, { useEffect, useState } from "react";
import { DataGrid, PageBar } from "../../../Framework/Components/Layout";
import {
  Loader,
  AlertMessage,
  Splitter,
} from "../../../Framework/Components/Widgets";
import { HiArrowCircleRight } from "react-icons/hi";
import { RiFileUserLine } from "react-icons/ri";
// import { listOfProfile } from "../Services/Methods";
import BizClass from "./ProfileManagement.module.scss";
import AddProfilePopUp from "./Modal/AddProfilePopUp";
import AssignedUserList from "./Modal/AssignedUserList";
import { listOfProfile, menuListForProfile } from "../Services/Method";
import { MdOutlineAssignmentTurnedIn } from "react-icons/md";

const cellTemplate = (props) => {
  return (
    <span style={{ display: "flex" }}>
      <HiArrowCircleRight
        style={{ marginRight: "5px", fontSize: "15px" }}
        title="View Details"
        onClick={() => props.onGetMenuClick(props.data)}
      />
      <RiFileUserLine
        style={{ marginRight: "5px", fontSize: "15px" }}
        title="Assign User List"
        onClick={() => props.toggleAssignedUserListPopup(props.data)}
      />
    </span>
  );
};

const cellmenuTemplate = (props) => {
  const menuData = props.data;

  return (
    <div style={{ display: "flex", gap: "4px", marginTop: "2px" }}>
      {menuData && menuData.AssignmentFlag.toString() === "1" ? (
        <>
          <button
            type="button"
            className={BizClass.UnAssignActionButton}
            onClick={() => props.onUnAssignMenu(props.data)}
          >
            Un-Assign
          </button>
          <MdOutlineAssignmentTurnedIn
            title="Rights Assign"
            style={{ fontSize: "16px", color: "#34495E", cursor: "pointer" }}
          />
        </>
      ) : (
        <button
          type="button"
          className={BizClass.ActionButton}
          style={{ cursor: "pointer" }}
          onClick={() => props.onAssignMenu(props.data)}
        >
          Assign
        </button>
      )}
    </div>
  );
};

function ProfileManagement() {
  // const [isLoadingUsersDataList, setisLoadingUsersDataList] = useState(false);
  const setAlertMessage = AlertMessage();

  const [openToggleAddProfilePopup, setopenToggleAddProfilePopup] =
    useState(false);
  const toggleAddProfile = () => {
    setopenToggleAddProfilePopup(!openToggleAddProfilePopup);
  };

  const [openAssignedUserListPopup, setopenAssignedUserListPopup] =
    useState(false);

  const [selectedRowData, setSelectedRowData] = useState({});
  const toggleAssignedUserListPopup = (data) => {
    if (data) {
      setSelectedRowData(data);
    }
    setopenAssignedUserListPopup(!openAssignedUserListPopup);
  };

  const getRowStyle = (params) => {
    if (params.data.IsNewlyAdded || params.data.IsUpdated) {
      return { background: "#d5a10e" };
    }
    if (params.node.rowIndex % 2 === 0) {
      return { background: "#fff" };
    }
    return { background: "#bddef2" };
  };

  const [profileList, setProfileList] = useState([]);
  const getListOfProfile = async () => {
    try {
      const formdata = {};
      const result = await listOfProfile(formdata);
      if (result.response.successCode === 1) {
        if (
          result.response.responseData &&
          result.response.responseData.length > 0
        ) {
          setProfileList(result.response.responseData);
        } else {
          setProfileList([]);
        }
      } else {
        setProfileList([]);
        setAlertMessage({
          type: "error",
          message: result.response.successMsg,
        });
      }
    } catch (error) {
      setAlertMessage({
        type: "error",
        message: error,
      });
    }
  };

  const [gridApi, setGridApi] = useState();
  const onGridReady = (params) => {
    console.log(params.api);
    setGridApi(params.api);
  };

  const updateProfileData = (newlyAddedProfile) => {
    debugger;
    console.log("newlyAddedProfile", newlyAddedProfile);
    if (gridApi) {
      const rowData = [];
      if (newlyAddedProfile && newlyAddedProfile.length > 0) {
        newlyAddedProfile.forEach((data) => {
          rowData.push(data);
        });
      }
      gridApi.forEachNode((node) => rowData.push(node.data));
      gridApi.setRowData(rowData);
      profileList.unshift(newlyAddedProfile);
      setProfileList([]);
      setProfileList(profileList);
      console.log("profileList", profileList);
    }
  };

  const onSearchMenuList = (val) => {
    gridApi.setQuickFilter(val);
  };

  const [profileListData, setProfileListData] = useState([]);
  const [menuListData, setMenuListData] = useState([]);

  const [treeMenuListData, setTreeMenuListData] = useState([]);
  const [isLoadingMenuList, setIsLoadingMenuList] = useState(false);
  const [recentAddedMenuId, setRecentAddedMenuId] = useState(null);

  const [profilegridApi, setProfileGridApi] = useState();
  const onProfileGridReady = (params) => {
    setProfileGridApi(params.api);
  };

  const recHierarchy = (menu, parent) => {
    if (parent.underMenuId.toString() !== 0) {
      const parentMenu = menuListData.find(
        (x) => x.menuId.toString() === parent.underMenuId.toString()
      );
      if (parentMenu !== null && parentMenu !== undefined) {
        menu.orgHierarchy.push(parentMenu.menuId);
        recHierarchy(menu, parentMenu);
      }
    }
  };

  const buildHierarchy = () => {
    debugger;
    const menuTreeListData = [];
    menuListData.forEach((menu) => {
      const menuData = {
        UserProfileID: menu.userProfileId,
        ProfileMenuID: menu.profileMenuId,
        MenuMasterID: menu.menuId,
        MenuName: menu.menuName,
        WebURL: menu.webURL,
        IsNewlyAdded: menu.IsNewlyAdded,
        orgHierarchy: [menu.menuId],
        AssignmentFlag: menu.assignmentFlag,
        //MenuSequence: menu.MenuSequence,
        UnderMenuID: menu.underMenuId,
      };
      debugger;
      if (menu.underMenuId.toString() !== "0") {
        const parentMenu = menuListData.find(
          (x) => x.menuId.toString() === menu.underMenuId.toString()
        );
        if (parentMenu !== null && parentMenu !== undefined) {
          menuData.orgHierarchy.push(parentMenu.menuId);
          recHierarchy(menuData, parentMenu);
        }
      }
      menuTreeListData.push(menuData);
    });
    console.log("menuTreeListData", menuTreeListData);
    debugger;
    menuTreeListData.forEach((menu) => {
      menu.orgHierarchy = menu.orgHierarchy.reverse();
    });
    setTreeMenuListData(menuTreeListData);
  };

  useEffect(() => {
    debugger;
    if (menuListData != null && menuListData.length > 0) {
      buildHierarchy();
    } else {
      setTreeMenuListData([]);
    }
  }, [menuListData]);

  useEffect(() => {
    debugger;
    if (gridApi && treeMenuListData.length > 0 && recentAddedMenuId) {
      gridApi.forEachNode(function (rowNode) {
        if (rowNode.data.menuId.toString() === recentAddedMenuId.toString()) {
          gridApi.ensureIndexVisible(rowNode.rowIndex);
          setRecentAddedMenuId(null);
        }
      });
    }
  }, [treeMenuListData]);

  const onGetMenuClick = (moduleData) => {
    debugger;
    setMenuListData([]);
    setProfileListData(moduleData);
    getMenuListData(
      "ASSIGNED_MENU_LIST",
      0,
      "",
      1,
      moduleData.profileId,
      moduleData.profileName
    );
    setSelectedRowColorUserProfile(moduleData.UserProfileID);
  };

  const setSelectedRowColorUserProfile = (UserProfileID) => {
    if (onProfileGridReady) {
      onProfileGridReady.forEachNode(function (rowNode) {
        if (rowNode.data.userProfileId === UserProfileID) {
          const newData = {
            ...rowNode.data,
            IsSelected: true,
          };
          rowNode.setData(newData);
        } else {
          rowNode.data.IsSelected = false;
          rowNode.setData(rowNode.data);
        }
      });
    }
  };

  const onAssignMenu = (menu) => {
    debugger;
    getMenuListData(
      "ASSIGN_MENU",
      menu.MenuMasterID,
      menu.MenuName,
      menu.ProfileMenuID,
      profileListData.profileId,
      profileListData.profileName
    );
  };

  const onUnAssignMenu = (menu) => {
    debugger;
    getMenuListData(
      "UNASSIGN_MENU",
      menu.MenuMasterID,
      menu.MenuName,
      menu.ProfileMenuID,
      profileListData.profileId,
      profileListData.profileName
    );
  };

  const getMenuListData = async (
    filterBy,
    menuId,
    menuName,
    profileMenuId,
    profileId,
    profileName
  ) => {
    try {
      setIsLoadingMenuList(true);

      const formData = {
        filterBy: filterBy,
        menuId: menuId,
        menuName: menuName,
        profileMenuId: profileMenuId,
        profileId: profileId,
        profileName: profileName,
      };

      const result = await menuListForProfile(formData);
      setIsLoadingMenuList(false);

      if (result.response.successCode === 1) {
        if (filterBy === "ASSIGN_MENU" || filterBy === "UNASSIGN_MENU") {
          if (
            result.response.responseData &&
            result.response.responseData.ProfileMenuID !== 0
          ) {
            if (gridApi) {
              const itemsToUpdate = [];
              gridApi.forEachNode(function (rowNode) {
                if (rowNode.data.menuId === menuId) {
                  debugger;
                  if (
                    filterBy === "ASSIGN_MENU" &&
                    result.response.responseData &&
                    result.response.responseData.menuList
                  ) {
                    rowNode.data.profileMenuId = Number(
                      result.response.responseData.menuList
                    );
                    rowNode.data.assignmentFlag = 1;
                    rowNode.data.profileId = profileId;
                  } else if (filterBy === "UNASSIGN_MENU") {
                    rowNode.data.profileId = null;
                    rowNode.data.assignmentFlag = 0;
                    rowNode.data.profileId = profileId;
                  }
                  itemsToUpdate.push(rowNode.data);
                  rowNode.setData(rowNode.data);
                  console.log("Updated row data:", rowNode.data);
                }
              });
              // gridApi.updateRowData({
              //   update: itemsToUpdate,
              // });
              // gridApi.refreshCells({ force: true });
              console.log(itemsToUpdate);
            }
            setAlertMessage({
              type: "success",
              message: result.response.successMsg,
            });
          }
        } else if (
          result.response.responseData.menuList &&
          result.response.responseData.menuList.length > 0
        ) {
          setMenuListData(result.response.responseData.menuList);
          console.log(result.response.responseData.menuList);
        } else {
          setMenuListData([]);
        }
      } else {
        setAlertMessage({
          type: "error",
          message: result.response.successMsg,
        });
      }
    } catch (error) {
      setAlertMessage({
        type: "error",
        message: "Something went Wrong! Error Code : 442",
      });
      console.log(error);
    }
  };

  useEffect(() => {
    getListOfProfile();
  }, []);

  // const getProfileList = async () => {
  //   debugger;
  //   try {
  //     const formData = {};
  //     setisLoadingUsersDataList(true);
  //     const result = await listOfProfile(formData);
  //     setisLoadingUsersDataList(false);
  //     if (result.response.successCode === 1) {
  //       if (
  //         result.response.responseData &&
  //         result.response.responseData.profileBeanList &&
  //         result.response.responseData.profileBeanList.length > 0
  //       ) {
  //         setRowDataList(result.response.responseData.profileBeanList);
  //         console.log(rowDataList);
  //       } else {
  //         setRowDataList([]);
  //       }
  //     } else {
  //       setRowDataList([]);
  //       setAlertMessage({
  //         type: "error",
  //         message: result.response.successMsg,
  //       });
  //     }
  //   } catch (error) {
  //     setAlertMessage({
  //       type: "error",
  //       message: "Something went Wrong! Error Code : 442",
  //     });
  //   }
  // };

  // A const [gridApi, setGridApi] = useState();
  // A const onGridReady = (params) => {
  // A console.log(params.api);
  // A setGridApi(params.api);
  // A };

  // A const updateUserData = (newlyAddedUser) => {
  // A  debugger;
  // A  console.log("newlyAddedUser", newlyAddedUser);
  // A  if (gridApi) {
  // A    const rowData = [];
  // A    if (newlyAddedUser && newlyAddedUser.length > 0) {
  // A      newlyAddedUser.forEach((data) => {
  // A        rowData.push(data);
  // A      });
  // A    }
  // A    gridApi.forEachNode((node) => rowData.push(node.data));
  // A    gridApi.setRowData(rowData);
  // A    setRowDataList.unshift(newlyAddedUser);
  // A    setRowDataList([]);
  // A    setRowDataList(rowDataList);
  // A    console.log("userDataList", rowDataList);
  // A  }
  // A };

  // useEffect(() => {
  //   debugger;
  //   getProfileList();
  // }, []);

  return (
    <div className={BizClass.PageStart}>
      {openToggleAddProfilePopup && (
        <AddProfilePopUp
          toggleAddProfile={toggleAddProfile}
          updateProfileData={updateProfileData}
        />
      )}
      {openAssignedUserListPopup && (
        <AssignedUserList
          toggleAssignedUserListPopup={toggleAssignedUserListPopup}
          selectedRowData={selectedRowData}
        />
      )}

      <Splitter varient="column" template="1fr 9px 1fr">
        <div className={BizClass.Card}>
          <PageBar>
            <PageBar.Search />
            <PageBar.Button onClick={() => toggleAddProfile()}>
              Add Profile
            </PageBar.Button>
          </PageBar>
          <DataGrid
            rowData={profileList}
            defaultColDef={{
              flex: 1,
              resizable: true,
            }}
            // components={{
            //   actionTemplate: [],
            // }}
            getRowStyle={getRowStyle}
            onGridReady={onGridReady}
            frameworkComponents={{
              cellTemplate,
            }}
          >
            <DataGrid.Column
              headerName="Action"
              lockPosition="1"
              pinned="left"
              width={80}
              cellRenderer="cellTemplate"
              cellRendererParams={{
                toggleAssignedUserListPopup,
                onGetMenuClick,
              }}
            />
            {/* <DataGrid.Column
              valueGetter="node.rowIndex + 1"
              field="#"
              headerName="Sr No."
              lockPosition="1"
              pinned="left"
              width={200}
            /> */}
            <DataGrid.Column
              headerName="Profile Name"
              field="profileName"
              width={200}
            />
            <DataGrid.Column
              headerName="Profile Description"
              field="profileDescription"
              width={260}
            />
            <DataGrid.Column
              headerName="BR Head Type"
              field="brHeadType"
              width={100}
            />
            <DataGrid.Column
              headerName="User Type"
              field="userType"
              width={100}
            />
          </DataGrid>
        </div>
        <div className={BizClass.Card}>
          <PageBar>
            <PageBar.Search
              onChange={(e) => onSearchMenuList(e.target.value)}
            />
          </PageBar>
          <DataGrid
            rowData={treeMenuListData}
            loader={isLoadingMenuList ? <Loader /> : false}
            defaultColDef={{
              flex: 1,
              resizable: true,
            }}
            frameworkComponents={{
              cellmenuTemplate,
            }}
            autoGroupColumnDef={{
              headerName: "Menu Name",
              minWidth: 220,
              cellRendererParams: {
                innerRenderer: (params) => {
                  return params.data.MenuName;
                },
              },
            }}
            treeData="true"
            animateRows="true"
            groupDefaultExpanded={-1}
            getRowStyle={getRowStyle}
            onGridReady={onGridReady}
            getDataPath={(data) => {
              return data.orgHierarchy;
            }}
          >
            <DataGrid.Column
              hide
              headerName="Menu Name"
              field="MenuName"
              width={50}
            />
            <DataGrid.Column headerName="Web URL" field="ReactURL" width={50} />
            <DataGrid.Column
              headerName="Action"
              lockPosition="1"
              pinned="left"
              width={100}
              cellRenderer="cellmenuTemplate"
              cellRendererParams={{
                onAssignMenu,
                onUnAssignMenu,
              }}
            />
          </DataGrid>
        </div>
      </Splitter>
    </div>
  );
}

export default ProfileManagement;
