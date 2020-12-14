import Register from 'views/Register.js';
import Login from 'views/Login.js';
import CreateAppointment from 'views/Patient/CreateAppointment';
import DoctorReport from 'views/Doctor/DoctorReport';
import Calendar from 'views/Doctor/Calendar';
import Users from 'views/Admin/Users';
import ResetPassword from 'views/ResetPassword';
import ForgotPassword from 'views/ForgotPassword';
import NotFound from 'views/NotFound';
import Profile from 'views/Profile';
import Insurances from 'views/Admin/Insurances';
import Qualifications from 'views/Admin/Qualifications';
import Landing from 'views/Landing';
import Pricing from 'views/Admin/Pricing';
import Timetable from 'views/Admin/Timetable';
import Payments from 'views/Admin/Payments';

var routes = {
  admin: [
    {
      path: '/index',
      name: 'Users',
      icon: 'ni ni-collection',
      component: Users,
      layout: '/admin',
    },
    {
      path: '/profile',
      name: 'Profile',
      icon: 'ni ni-single-02',
      component: Profile,
      layout: '/admin',
    },
  ],
  data_manager: [
    {
      path: '/index',
      name: 'Users',
      icon: 'ni ni-collection',
      component: Users,
      layout: '/admin',
    },
    {
      path: '/timetable',
      name: 'Timetable',
      icon: 'ni ni-calendar-grid-58',
      component: Timetable,
      layout: '/admin',
    },
    {
      path: '/insurances',
      name: 'Insurances',
      icon: 'ni ni-support-16',
      component: Insurances,
      layout: '/admin',
    },
    {
      path: '/qualifications',
      name: 'Qualifications',
      icon: 'ni ni-paper-diploma',
      component: Qualifications,
      layout: '/admin',
    },
    {
      path: '/prices',
      name: 'Prices',
      icon: 'ni ni-credit-card',
      component: Pricing,
      layout: '/admin',
    },
    {
      path: '/payments',
      name: 'Payments',
      icon: 'ni ni-credit-card',
      component: Payments,
      layout: '/admin',
    },
    {
      path: '/appointments',
      name: 'Appointments',
      icon: 'ni ni-tv-2',
      component: DoctorReport,
      layout: '/admin',
    },
    {
      path: '/profile',
      name: 'Profile',
      icon: 'ni ni-single-02',
      component: Profile,
      layout: '/admin',
    },
  ],
  patient: [
    {
      path: '/create-appointment',
      name: 'Appointment',
      icon: 'ni ni-calendar-grid-58',
      component: CreateAppointment,
      layout: '/patient',
    },
  ],
  default: [
    {
      path: '/index',
      name: 'Dashboard',
      icon: 'ni ni-tv-2 text-primary',
      component: DoctorReport,
      layout: '/admin',
    },
  ],
  doctor: [
    {
      path: '/index',
      name: 'Dashboard',
      icon: 'ni ni-tv-2 text-primary',
      component: DoctorReport,
      layout: '/admin',
    },
    {
      path: '/timetable',
      name: 'Timetable',
      icon: 'ni ni-calendar-grid-58',
      component: Timetable,
      layout: '/admin',
    },
    {
      path: '/calendar',
      name: 'My Calendar',
      icon: 'ni ni-calendar-grid-58',
      component: Calendar,
      layout: '/admin',
    },
    {
      path: '/profile',
      name: 'Profile',
      icon: 'ni ni-single-02',
      component: Profile,
      layout: '/admin',
    },
  ],
  auth: [
    {
      path: '/login',
      name: 'Login',
      icon: 'ni ni-key-25 text-info',
      component: Login,
      layout: '/auth',
    },
    {
      path: '/register',
      name: 'Register',
      icon: 'ni ni-circle-08 text-pink',
      component: Register,
      layout: '/auth',
    },
    {
      path: '/forgot-password',
      name: 'Frogot Password',
      icon: 'ni ni-key-25 text-info',
      component: ForgotPassword,
      layout: '/auth',
    },
    {
      path: '/reset-password',
      name: 'Reset Password',
      icon: 'ni ni-key-25 text-info',
      component: ResetPassword,
      layout: '/auth',
    },
    {
      path: '/home',
      name: 'Reset Password',
      icon: 'ni ni-key-25 text-info',
      component: Landing,
      layout: '/auth',
    },
    {
      path: '/not-found',
      name: 'Not Found',
      icon: 'ni ni-key-25 text-info',
      component: NotFound,
      layout: '/auth',
    },
  ],
};
export default routes;
