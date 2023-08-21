const routes = {
  // auth
  home: "/",
  login: "/login",
  forgotPassword: "/forgotPassword",
  emailForgotPassword: "/emailForgotPassword",
  // dashboard
  dashboard: "/dashboard",
  // profile
  profile: "/profile",
  // device
  listDevice: "/device-list",
  addDevice: "/device-list/add-device",
  updateDevice: "/device-list/update-device",
  detailDevice: "/device-list/detail-device",
  //service
  listService: "/service-list",
  addService: "/service-list/add-service",
  updateService: "/service-list/update-service",
  detailService: "/service-list/detail-service",

  //number-ofder
  listNumber: "/number-list",
  addNumber: "/number-list/add-number",
  detailNumber:"/number-list/detail-number"
  
};

const config = {
  routes,
};
export default config;
