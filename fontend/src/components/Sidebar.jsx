import {useState, useEffect} from 'react';
import {ProSidebar, Menu, MenuItem, SubMenu} from 'react-pro-sidebar';
import {Box, IconButton, Typography, useTheme, Divider} from '@mui/material';
import {Link} from 'react-router-dom';
import 'react-pro-sidebar/dist/css/styles.css';
import {tokens} from '../theme';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import CalendarTodayOutlinedIcon
  from '@mui/icons-material/CalendarTodayOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import PieChartOutlineOutlinedIcon
  from '@mui/icons-material/PieChartOutlineOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import PivotTableChartIcon from '@mui/icons-material/PivotTableChart';
import CameraEnhanceIcon from '@mui/icons-material/CameraEnhance';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import EngineeringIcon from '@mui/icons-material/Engineering';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import CategoryIcon from '@mui/icons-material/Category';
import PrecisionManufacturingIcon
  from '@mui/icons-material/PrecisionManufacturing';
import LegendToggleIcon from '@mui/icons-material/LegendToggle';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import ExtensionIcon from '@mui/icons-material/Extension';
import DataThresholdingIcon from '@mui/icons-material/DataThresholding';
import ResetTvIcon from '@mui/icons-material/ResetTv';

const Item = ({title, to, icon, selected, setSelected, state}) => {
  const theme = useTheme ();
  const colors = tokens (theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected (title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} state={state} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme ();
  const colors = tokens (theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState (true);
  const [selected, setSelected] = useState ('Dashboard');
  const [currentDate, setCurrentDate] = useState ('');

  useEffect (() => {
    getCurrentDate ();
  }, []);

  const getCurrentDate = () => {
    const today = new Date ();

    // สร้างวันที่ในรูปแบบ "20240206"
    const formattedDate1 = `${today.getFullYear ()}${(today.getMonth () + 1)
      .toString ()
      .padStart (2, '0')}${today.getDate ().toString ().padStart (2, '0')}`;

    // สร้างวันที่ในรูปแบบ "2024-02-06"
    const formattedDate2 = `${today.getFullYear ()}-${(today.getMonth () + 1)
      .toString ()
      .padStart (2, '0')}-${today.getDate ().toString ().padStart (2, '0')}`;

    // ลบ 1 วัน
    const formattedDate2Object = new Date (formattedDate2);
    formattedDate2Object.setDate (formattedDate2Object.getDate () - 1);
    const year = formattedDate2Object.getFullYear ();
    const month = String (formattedDate2Object.getMonth () + 1).padStart (
      2,
      '0'
    );
    const day = String (formattedDate2Object.getDate ()).padStart (2, '0');
    const formattedDate2_minus1days = `${year}-${month}-${day}`;

    // ลบ 7 วัน
    const formattedDate2Object_1 = new Date (formattedDate2);
    formattedDate2Object_1.setDate (formattedDate2Object_1.getDate () - 7);
    const year2 = formattedDate2Object_1.getFullYear ();
    const month2 = String (formattedDate2Object_1.getMonth () + 1).padStart (
      2,
      '0'
    );
    const day2 = String (formattedDate2Object_1.getDate ()).padStart (2, '0');
    const formattedDate2_minus7days = `${year2}-${month2}-${day2}`;

    setCurrentDate ({
      formattedDate1,
      formattedDate2,
      formattedDate2_minus7days,
      formattedDate2_minus1days,
    });
  };
  return (
    <Box
      sx={{
        '& .pro-sidebar-inner': {
          backgroundColor: theme.palette.mode === 'light'
            ? '#f2f0f0 !important'
            : `${colors.primary[600]} !important`,
        },
        '& .pro-icon-wrapper': {
          backgroundColor: 'transparent !important',
        },
        '& .pro-inner-item': {
          padding: '5px 35px 5px 20px !important',
        },
        '& .pro-inner-item:hover': {
          color: '#868dfb !important',
          // backgroundColor: `${colors.primary[100]} !important`,
        },
        '& .pro-menu-item:hover': {
          color: '#868dfb !important',
          // backgroundColor: `${colors.primary[100]} !important`,
        },
        '& .pro-inner-item:active': {
          color: '#6870fa !important',
          // backgroundColor: `${colors.primary[100]} !important`,
        },
        '& .pro-inner-item:focus': {
          color: `${colors.grey[100]} !important`,
          // backgroundColor: `${colors.primary[100]} !important`,
        },
        '& .pro-item-content:active': {
          color: '#6870fa !important',
        },
        '& .pro-menu-item.active': {
          color: '#6870fa !important',
        },
        '& .pro-inner-list-item ': {
          backgroundColor: 'none !important',
          // : `${colors.primary[400]} !important`,
        },
        // None Collape submenu
        '& .react-slidedown.pro-inner-list-item ': {
          backgroundColor: theme.palette.mode === 'light'
            ? '#f2f0f0 !important'
            : `${colors.primary[800]} !important`,
        },
        // None Collape submenu
        '& .popper-inner ': {
          // backgroundColor: '#6870fa !important',
          backgroundColor: theme.palette.mode === 'light'
            ? '#f2f0f0 !important'
            : `${colors.primary[800]} !important`,
          boxShadow: theme.palette.mode === 'dark'
            ? '0px 3px 5px rgba(158, 158, 158, 0.5)'
            : '0px 3px 5px rgba(0, 0, 0, 0.2)',
        },
        '& .pro-menu.inner-submenu-arrows': {
          padding: '0 !important', // Set padding to 0 for the submenu arrows
        },
        padding: '0px',
        margin: '0px',
        boxShadow: theme.palette.mode === 'dark'
          ? '0px 3px 5px rgba(158, 158, 158, 0.5)'
          : '0px 3px 5px rgba(0, 0, 0, 0.2)',
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed (!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: '10px 0 20px 0',
              color: colors.grey[100],
            }}
          >
            {!isCollapsed &&
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  SMART-AM
                </Typography>
                <IconButton onClick={() => setIsCollapsed (!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>}
          </MenuItem>
          <Box paddingLeft={isCollapsed ? undefined : '10%'}>
            <Item
              title="Home"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {!isCollapsed
              ? <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{m: '15px 0 5px 20px'}}
                >
                  Smart System
                </Typography>
              : <hr
                  style={{
                    border: 'none',
                    height: '2px',
                    margin: '15px 0 5px 20px',
                    width: '45px',
                    // backgroundColor: 'white',
                    backgroundColor: theme.palette.mode === 'light'
                      ? 'black'
                      : 'white',
                  }}
                />}
            <Typography variant="h3" color={colors.grey[100]}>
              <Menu>
                <SubMenu
                  title="Smart Monitoring"
                  icon={<ResetTvIcon />}
                  defaultOpen={false}
                >
                  <Typography variant="h3" color={colors.grey[100]}>
                    {/* <Menu menuItemStyles={menuItemStyles}> */}
                    <Menu>
                      <SubMenu
                        title="SMART Plan"
                        icon={<EditCalendarIcon />}
                        defaultOpen={false}
                        // onClick={() => handleSubMenuClick ('SMART Plan')}
                      >
                        <Item
                          title="Capacity"
                          to={`http://43.72.53.49:8081/AM-SMART/SMART_Plan/Capacity/index.php?select_date=${currentDate.formattedDate1}&biz=AC`}
                          icon={<EditCalendarIcon />}
                          selected={selected}
                          setSelected={setSelected}
                        />
                        <Item
                          title="TEP"
                          to={`http://43.72.53.49:8081/AM-SMART/SMART_Plan/TEP/index.php?select_date_start=${currentDate.formattedDate1}&select_date_end=${currentDate.formattedDate1}&biz=AC`}
                          icon={<EditCalendarIcon />}
                          selected={selected}
                          setSelected={setSelected}
                        />
                      </SubMenu>
                    </Menu>
                  </Typography>
                  <Typography variant="h3" color={colors.grey[100]}>
                    <Menu>
                      <SubMenu
                        title="SMART  WareHouse"
                        icon={<WarehouseIcon />}
                        defaultOpen={false}
                      >
                        <Item
                          title="Progress Recieve"
                          to="http://43.72.53.49:8081/SMART_Warehouse/Dashboard_Progress.php"
                          icon={<WarehouseIcon />}
                          selected={selected}
                          setSelected={setSelected}
                        />
                        <Item
                          title="WareHouse Status"
                          to="http://43.72.53.49:8081/SMART_Warehouse/views/WarehouseStatus"
                          icon={<WarehouseIcon />}
                          selected={selected}
                          setSelected={setSelected}
                        />
                      </SubMenu>
                    </Menu>
                  </Typography>
                  <Typography variant="h3" color={colors.grey[100]}>
                    <Menu>
                      <SubMenu
                        title="SMART Production"
                        icon={<CategoryIcon />}
                        defaultOpen={false}
                      >
                        <Item
                          title="Production Progress"
                          to="http://43.72.53.49:8081/AM-SMART/SMART_Production/PD_Progess/"
                          icon={<CategoryIcon />}
                          selected={selected}
                          setSelected={setSelected}
                        />
                        <Item
                          title="PD Report"
                          to={`http://43.72.53.49:8081/AM-SMART/SMART_Production/PD_Report/?date_start=${currentDate.formattedDate2_minus7days}&date_end=${currentDate.formattedDate2}&line_name=`}
                          // to={`http://43.72.53.49:8081/AM-SMART/SMART_Plan/Capacity/index.php?select_date=${currentDate.formattedDate1}&biz=AC`}
                          icon={<CategoryIcon />}
                          selected={selected}
                          setSelected={setSelected}
                        />
                        <Item
                          title="PD Report By Shot"
                          to={`http://43.72.53.49:8081/AM-SMART/SMART_Production/PD_Report_Shot/?date_start=${currentDate.formattedDate2_minus7days}&date_end=${currentDate.formattedDate2}&line_name=`}
                          // to="http://43.72.53.49:8081/AM-SMART/SMART_Production/PD_Report_Shot/?date_start=2024-01-30&date_end=20240205&line_name="
                          icon={<CategoryIcon />}
                          selected={selected}
                          setSelected={setSelected}
                        />
                      </SubMenu>
                    </Menu>
                  </Typography>
                  <Item
                    title="SMART Machine"
                    to="http://43.72.53.49:8081/AM-SMART/SMART_Machine/"
                    icon={<PrecisionManufacturingIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="SMART Performance"
                    to="http://43.72.53.49:8081/AM-SMART/SMART_Performance/Performance/"
                    icon={<LegendToggleIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Typography variant="h3" color={colors.grey[100]}>
                    <Menu>
                      <SubMenu
                        title="SMART QUALITY"
                        icon={<GpsFixedIcon />}
                        defaultOpen={false}
                      >
                        <Item
                          title="SMART QUALITY"
                          to={`http://43.72.53.49:8081/AM-SMART/SMART_Quailty/SMLD_Quailty/index.php?biz=ALL&mc_type=ARI&date_cd=${currentDate.formattedDate1}&date_start=${currentDate.formattedDate2_minus1days}&date_end=${currentDate.formattedDate2}`}
                          icon={<GpsFixedIcon />}
                          selected={selected}
                          setSelected={setSelected}
                        />
                        <Item
                          title="SMLD"
                          to="/SMLD"
                          icon={<GpsFixedIcon />}
                          selected={selected}
                          setSelected={setSelected}
                        />
                      </SubMenu>
                    </Menu>
                  </Typography>
                  <Item
                    title="SMART Spoilage"
                    to={`http://43.72.53.49:8081/AM-SMART/SMART_Spoilage/Spoilage/?date_start=${currentDate.formattedDate2_minus7days}&date_end=${currentDate.formattedDate2_minus1days}&line_name=`}
                    icon={<DeleteForeverIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="SMART SFG"
                    to="http://43.72.53.49:8081/AM-SMART/SMART_SFG/"
                    icon={<Inventory2Icon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Typography variant="h3" color={colors.grey[100]}>
                    <Menu>
                      <SubMenu
                        title="SMART Man"
                        icon={<SupervisorAccountIcon />}
                        defaultOpen={false}
                      >
                        <Item
                          title="Attendence"
                          to="http://43.72.53.49:8081/Attendance_Dashboard/Attendance/index.php"
                          icon={<SupervisorAccountIcon />}
                          selected={selected}
                          setSelected={setSelected}
                        />
                        <Item
                          title="Skill Matrix"
                          to="http://43.72.53.49:8081/AM-SMART/SMART_Man/Skill_matrix"
                          icon={<SupervisorAccountIcon />}
                          selected={selected}
                          setSelected={setSelected}
                        />
                      </SubMenu>
                    </Menu>
                  </Typography>
                  <Item
                    title={
                      <Box>
                        <Typography sx={{lineHeight: '1.2'}}>
                          SMART Material
                        </Typography>
                        <Typography sx={{lineHeight: '1.2'}}>Supply</Typography>
                      </Box>
                    }
                    to="http://43.72.53.49:8081/AM-SMART/SMART_Material_Supply/"
                    icon={<ExtensionIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="SMART Solder"
                    to="http://43.72.53.49:8081/AM-SMART/SMART_Solder/"
                    icon={<DataThresholdingIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />

                </SubMenu>
                <Typography variant="h3" color={colors.grey[100]}>
                  <Menu>
                    <SubMenu
                      title="Pivottable"
                      icon={<PivotTableChartIcon />}
                      defaultOpen={false}
                    >
                      <Item
                        title="Pivottable Smld"
                        to="/pivottable"
                        icon={<GpsFixedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                      />
                      <Item
                        title="Pivottable Spoilage"
                        to="/pivottable(Spoilage)"
                        icon={<DeleteForeverIcon />}
                        selected={selected}
                        setSelected={setSelected}
                      />
                      <Item
                        title="Pivottable EHum"
                        to="/pivottable(EHum)"
                        icon={<EngineeringIcon />}
                        selected={selected}
                        setSelected={setSelected}
                      />
                    </SubMenu>
                  </Menu>
                </Typography>
              </Menu>
            </Typography>

            {!isCollapsed
              ? <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{m: '15px 0 5px 20px'}}
                >
                  {
                    <Box>
                      <Typography sx={{lineHeight: '1.2'}}>
                        Smart Quality Check
                      </Typography>
                      {/* <Typography sx={{lineHeight: '1.2'}}>
                        Quality Check
                      </Typography> */}
                    </Box>
                  }

                </Typography>
              : <hr
                  style={{
                    border: 'none',
                    height: '2px',
                    margin: '15px 0 5px 20px',
                    width: '45px',
                    backgroundColor: theme.palette.mode === 'light'
                      ? 'black'
                      : 'white',
                  }}
                />}
            <Item
              title="StartUpCheck"
              to="/login"
              state="startupcheck"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {!isCollapsed
              ? <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{m: '15px 0 5px 20px'}}
                >
                  Information
                </Typography>
              : <hr
                  style={{
                    border: 'none',
                    height: '2px',
                    margin: '15px 0 5px 20px',
                    width: '45px',
                    backgroundColor: theme.palette.mode === 'light'
                      ? 'black'
                      : 'white',
                  }}
                />}
            <Item
              title="Manage Team"
              to="/"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Contacts Information"
              to="/"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ Page"
              to="/"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
