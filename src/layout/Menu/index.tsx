import { useLocation, useNavigate } from "react-router-dom";
import { Button, Menu } from "antd";
import type { MenuProps } from "antd";
import { useEffect, useState } from "react";

import { useAppDispatch } from "../../redux";
import PathSlice from "../../redux/slices/PathSlice";
import "./Menu.css";
import "./styleMenu.css";
import config from "../../config/routes";
import {
  DashboardIcon03,
  Element4,
  LogoutIcon,
  Monitor,
  MoreIcon,
  ReportIcon,
  ServiceIcon,
  SettingIcon,
} from "../../components/icons";
import { logo } from "../../assect/img/1index";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps["items"] = [
  getItem("Dashboard", "/dashboard", <Element4 />),
  getItem("Thiết bị", "/device-list", <Monitor />),
  getItem("Dịch vụ", "/service-list", <ServiceIcon />),
  getItem("Cấp số", "/number-list", <DashboardIcon03 />),
  getItem("Báo cáo", "/report", <ReportIcon />),
  getItem("Cài đặt hệ thống", "Cài đặt hệ thống", <SettingIcon />, [
    getItem("Quản lý vai trò", "/settings/role-list"),
    getItem("Quản lý tài khoản", "/settings/account-list"),
    getItem("Nhật ký người dùng", "/settings/user-log"),
  ]),
];
function MenuNav() {
  const { pathname } = useLocation();
  const [selected, setSelected] = useState(pathname);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    switch (pathname) {
      case "/dashboard":
        setSelected(pathname);
        dispatch(
          PathSlice.actions.setPath([
            {
              name: "Dashboard",
              link: config.routes.dashboard,
            },
          ])
        );
        break;
      case "/device-list":
        setSelected(pathname);
        dispatch(
          PathSlice.actions.setPath([
            {
              name: "Thiết bị",
              link: "",
            },
            {
              name: "Danh sách thiết bị",
              link: config.routes.listDevice,
            },
          ])
        );
        break;
      case "/service-list":
        setSelected(pathname);
        dispatch(
          PathSlice.actions.setPath([
            {
              name: "Dịch vụ",
              link: "",
            },
            {
              name: "Danh sách dịch vụ",
              link: config.routes.listService,
            },
          ])
        );
        break;
      case "/number-list":
        setSelected(pathname);
        dispatch(
          PathSlice.actions.setPath([
            {
              name: "Cấp số",
              link: "",
            },
            {
              name: "Danh sách cấp số",
              link: config.routes.listNumber,
            },
          ])
        );
        break;
      case "/report":
        setSelected(pathname);
        dispatch(
          PathSlice.actions.setPath([
            {
              name: "Báo cáo",
              link: "",
            },
            {
              name: "Lập báo cáo",
              link: config.routes.report,
            },
          ])
        );
        break;
      case "/settings/role-list":
        setSelected(pathname);
        dispatch(
          PathSlice.actions.setPath([
            {
              name: "Cài đặt hệ thống",
              link: "",
            },
            {
              name: "Quản lý vai trò",
              link: config.routes.listRole,
            },
          ])
        );
        break;
      case "/settings/account-list":
        setSelected(pathname);
        dispatch(
          PathSlice.actions.setPath([
            {
              name: "Cài đặt hệ thống",
              link: "",
            },
            {
              name: "Quản lý tài khoản",
              link: config.routes.listAccount,
            },
          ])
        );
        break;
      case "/settings/user-log":
        setSelected(pathname);
        dispatch(
          PathSlice.actions.setPath([
            {
              name: "Cài đặt hệ thống",
              link: "",
            },
            {
              name: "Nhật ký hoạt động",
              link: config.routes.userLog,
            },
          ])
        );
        break;
      case "/profile":
        setSelected(pathname);
        dispatch(
          PathSlice.actions.setPath([
            {
              name: "Thông tin cá nhân",
              link: "",
            },
          ])
        );
        break;
    }
  }, [pathname, dispatch]);
  const handleSelectItem: MenuProps["onClick"] = (e) => {
    navigate(e.key);
    setSelected(e.key);
  };
  const handleLogout = () => {
    navigate("/login");
  };
  return (
    <div className="wrapper_menu">
      <img src={logo} alt="" className="logo_menu" />
      <Menu
        className="menubar"
        onClick={handleSelectItem}
        mode="vertical"
        items={items}
        expandIcon={<MoreIcon />}
        selectedKeys={pathname === "/profile" ? [""] : [selected]}
      />
      <Button
        onClick={handleLogout}
        className="btn-logout"
        icon={<LogoutIcon />}
      >
        Đăng xuất
      </Button>
    </div>
  );
}

export default MenuNav;
