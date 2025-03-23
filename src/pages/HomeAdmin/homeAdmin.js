import { useState, useEffect, useContext } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from "recharts";
import { LayoutDashboard, Users, GraduationCap, BookOpen, MapPin } from "lucide-react";
import "./style.css"; // Import the CSS file
import { AuthContext } from "../../context/auth";

export default function HomeAdmin() {
  const { accounts, courses, tutors } = useContext(AuthContext);
  const [userStats, setUserStats] = useState({ students: 0, tutors: 0, admins: 0 });
  const [courseStats, setCourseStats] = useState([]);
  const [locationStats, setLocationStats] = useState([]);
  const [subjectStats, setSubjectStats] = useState([]);
  const [genderStats, setGenderStats] = useState([]);

  // COLORS for charts
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"];

  useEffect(() => {
    // Calculate user statistics
    const userCounts = accounts.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {});
    
    setUserStats({
      students: userCounts.student || 0,
      tutors: userCounts.tutor || 0,
      admins: userCounts.admin || 0
    });

    // Calculate course statistics by status
    const courseByStatus = courses.reduce((acc, course) => {
      acc[course.status] = (acc[course.status] || 0) + 1;
      return acc;
    }, {});

    setCourseStats(Object.entries(courseByStatus).map(([name, value]) => ({ name, value })));

    // Calculate location statistics from tutors
    const cities = tutors.reduce((acc, tutor) => {
      const city = tutor.address.split(",").pop().trim();
      acc[city] = (acc[city] || 0) + 1;
      return acc;
    }, {});

    setLocationStats(Object.entries(cities).map(([name, value]) => ({ name, value })));

    // Calculate subject statistics
    const subjects = {};
    tutors.forEach(tutor => {
      const tutorSubjects = tutor.subject.split(", ");
      tutorSubjects.forEach(subject => {
        subjects[subject] = (subjects[subject] || 0) + 1;
      });
    });

    setSubjectStats(Object.entries(subjects).map(([name, value]) => ({ name, value })));

    // Calculate gender statistics
    const genderCount = accounts.reduce((acc, user) => {
      acc[user.gender] = (acc[user.gender] || 0) + 1;
      return acc;
    }, {});

    setGenderStats(Object.entries(genderCount).map(([name, value]) => ({ name, value })));

  }, [accounts, courses, tutors]);

  // Stats for summary cards
  const summaryStats = [
    { title: "Tổng người dùng", value: accounts.length, icon: <Users size={24} className="icon-blue" /> },
    { title: "Tổng gia sư", value: userStats.tutors, icon: <GraduationCap size={24} className="icon-green" /> },
    { title: "Tổng học sinh", value: userStats.students, icon: <Users size={24} className="icon-yellow" /> },
    { title: "Tổng khóa học", value: courses.length, icon: <BookOpen size={24} className="icon-purple" /> },
  ];

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1 className="admin-title">
          <LayoutDashboard className="icon-blue" />
          Thống kê hệ thống
        </h1>
        <p className="admin-subtitle">Xem tổng quan về người dùng, khóa học và gia sư</p>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        {summaryStats.map((stat, index) => (
          <div key={index} className="summary-card">
            <div className="icon-container">
              {stat.icon}
            </div>
            <div className="stat-content">
              <p className="stat-title">{stat.title}</p>
              <p className="stat-value">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts section */}
      <div className="charts-container">
        {/* User Role Distribution */}
        <div className="chart-card">
          <h2 className="chart-title">Phân bố vai trò người dùng</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Học sinh', value: userStats.students },
                    { name: 'Gia sư', value: userStats.tutors },
                    { name: 'Quản trị viên', value: userStats.admins }
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {[0, 1, 2].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Course Status */}
        <div className="chart-card">
          <h2 className="chart-title">Trạng thái khóa học</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={courseStats}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Location Distribution */}
        <div className="chart-card">
          <h2 className="chart-title">
            <MapPin className="icon-red" />
            Phân bố địa điểm
          </h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={locationStats}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {locationStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subject Distribution */}
        <div className="chart-card">
          <h2 className="chart-title">Môn học phổ biến</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={subjectStats}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={80} />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}