import config from "../configs/index";
import ListAccountAdmin from "../pages/Admin/ManageAccount/listAccount";
import ClassList from "../pages/Class/classList";
import ClassDetail from "../pages/ClassDetail/classDetail";
import CreateClass from "../pages/CreateClass/createClass";
import ClassListByUser from "../pages/FindClassList/classList";
import Home from "../pages/Home/home";
import HomeAdmin from "../pages/HomeAdmin/homeAdmin";
import Login from "../pages/Login/login";
import Register from "../pages/Register/register";
import TutorDetail from "../pages/TutorDetail/tutorDetail";
import TutorRequestList from "../pages/TutorRequest/tutorRequest";
import UserInfo from "../pages/UserInfo/info";

const publicRoutes = [
  { path: config.router.home, component: Home },

  { path: config.router.tutorDetail, component: TutorDetail },
  { path: config.router.register, component: Register },
  { path: config.router.classList, component: ClassList },
  { path: config.router.class, component: ClassDetail },
  { path: config.router.login, component: Login },
  { path: config.router.info, component: UserInfo },
  { path: config.router.tutorRequest, component: TutorRequestList },
  { path: config.router.classUser, component: ClassListByUser },
  { path: config.router.createClass, component: CreateClass },
  { path: config.router.homeAdmin, component: HomeAdmin, header: null },
  { path: config.router.listAccount, component: ListAccountAdmin, header: null },

];

export { publicRoutes };
