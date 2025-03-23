import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const initialAccounts = [
  {
    id: 1,
    firstName: "Trần",
    lastName: "Linh",
    phone: "0123456789",
    birthDate: "20-12-2002",
    email: "admin@example.com",
    password: "admin123",
    gender: "female",
    role: "admin",
    address: "Thạch Thất, Hà Nội",
  },
  {
    id: 2,
    firstName: "Trần",
    lastName: "Linh",
    gender: "female",

    phone: "0123456789",
    birthDate: "20-12-2002",
    email: "tutor@example.com",
    password: "tutor123",
    role: "tutor",
    address: "Hà Đông, Hà Nội",
  },
  {
    id: 3,
    firstName: "Hoàng",
    lastName: "Minh",
    phone: "0123456789",
    gender: "male",
    birthDate: "20-12-2002",
    email: "student1@example.com",
    password: "student123",
    role: "student",
    address: "Long Biên, Hà Nội",
  },
  {
    id: 4,
    firstName: "Minh",
    lastName: "Đức",
    phone: "0123456789",
    gender: "male",
    birthDate: "20-12-2002",
    email: "student2@example.com",
    password: "student123",
    role: "student",
    address: "Quận 1, Thành phố Hồ Chí Minh",
  },
  {
    id: 5,
    firstName: "Trần",
    lastName: "Vẫn",
    phone: "0123456789",
    birthDate: "20-12-2002",
    gender: "female",
    email: "student3@example.com",
    password: "student123",
    role: "student",
    address: "Thanh Xuân, Hà Nội",
  },
];

const initialTutors = [
  {
    id: 1,
    name: "Trần Hà Linh",
    subject: "Anh, Hóa, Toán",
    university: "Đại học sư phạm",
    major: "Sư phạm toán",
    img: "/assets/images/Hinh-gai-xinh-2009-toc-dai-cute.jpg",
    students: 20,
    address: "Hoàn Kiếm, Hà Nội",
  },
  {
    id: 2,
    name: "Nguyễn Thị Lan",
    subject: "Văn, Lý, Sinh",
    university: "Đại học sư phạm Hà Nội",
    major: "Sư phạm văn",
    img: "/assets/images/231112-aespa-karina-drama-at-inkigayo-documents-1-1721266288951215835648.webp",
    students: 25,
    address: "Cầu Giấy, Hà Nội",
  },
  {
    id: 3,
    name: "Lê Minh Quang",
    subject: "Toán, Hóa, Tin học",
    university: "Đại học Khoa học Tự nhiên",
    major: "Sư phạm toán",
    img: "/assets/images/an-old-professor-in-a-suit-cartoon-male-teacher-teacher_57001_wh860.png",
    students: 18,
    address: "Thanh Xuân, Hà Nội",
  },
  {
    id: 4,
    name: "Phạm Thu Hiền",
    subject: "Anh, Sử, Địa",
    university: "Đại học Ngoại ngữ",
    major: "Sư phạm Anh",
    img: "/assets/images/20241010_Wonyoung_for_Tommy_Hilfiger_03.jpg",
    students: 30,
    address: "Ba Đình, Hà Nội",
  },
  {
    id: 5,
    name: "Trần Hải Nam",
    subject: "Hóa, Sinh, Toán",
    university: "Đại học Khoa học Tự nhiên",
    major: "Sư phạm hóa",
    img: "/assets/images/an-old-professor-in-a-suit-cartoon-male-teacher-teacher_57001_wh860.png",
    students: 22,
    address: "Quận 1, Thành phố Hồ Chí Minh",
  },
  {
    id: 6,
    name: "Lê Hoàng Anh",
    subject: "Văn, Anh, Toán",
    university: "Đại học sư phạm",
    major: "Sư phạm văn",
    img: "/assets/images/an-old-professor-in-a-suit-cartoon-male-teacher-teacher_57001_wh860.png",
    students: 20,
    address: "Quận 3, Thành phố Hồ Chí Minh",
  },
  {
    id: 7,
    name: "Nguyễn Bảo Ngọc",
    subject: "Anh, Toán, Tin học",
    university: "Đại học Sư phạm kỹ thuật",
    major: "Sư phạm Tin học",
    img: "/assets/images/anh-gai-xinh-cuc-dep.jpg",
    students: 15,
    address: "Tân Phú, Thành phố Hồ Chí Minh",
  },
  {
    id: 8,
    name: "Hoàng Minh Tâm",
    subject: "Toán, Tin học",
    university: "Đại học Công nghệ",
    major: "Sư phạm Tin học",
    img: "/assets/images/Anh-gai-xinh-Han-Quoc-.webp",
    students: 24,
    address: "Bình Thạnh, Thành phố Hồ Chí Minh",
  },
  {
    id: 9,
    name: "Phan Thanh Vân",
    subject: "Lý, Hóa",
    university: "Đại học Sư phạm TP.HCM",
    major: "Sư phạm Lý",
    img: "/assets/images/anh-gai-xinh-lop-10-01.webp",
    students: 20,
    address: "Gò Vấp,Thành phố Hồ Chí Minh",
  },
  {
    id: 10,
    name: "Trương Hương Giang",
    subject: "Sử, Địa",
    university: "Đại học Khoa học xã hội và nhân văn",
    major: "Sư phạm sử",
    img: "/assets/images/hinh-anh-dep-ve-hoc-sinh-cap-3-5.jpg",
    students: 28,
    address: "Tân Bình, Thành phố Hồ Chí Minh",
  },
  {
    id: 11,
    name: "Dương Tuấn Anh",
    subject: "Toán, Lý, Hóa",
    university: "Đại học Bách Khoa",
    major: "Sư phạm toán",
    img: "/assets/images/an-old-professor-in-a-suit-cartoon-male-teacher-teacher_57001_wh860.png",
    students: 22,
    address: "Quận 10, Thành phố Hồ Chí Minh",
  },
  {
    id: 12,
    name: "Vũ Thị Hằng",
    subject: "Anh, Hóa",
    university: "Đại học Ngoại ngữ",
    major: "Sư phạm Anh",
    img: "/assets/images/Hinh-anh-gai-xinh-2k8-de-thuong.jpg",
    students: 18,
    address: "Hai Bà Trưng, Hà Nội",
  },
  {
    id: 13,
    name: "Đặng Mạnh Cường",
    subject: "Văn, Hóa, Sử",
    university: "Đại học Sư phạm TP.HCM",
    major: "Sư phạm văn",
    img: "/assets/images/an-old-professor-in-a-suit-cartoon-male-teacher-teacher_57001_wh860.png",
    students: 30,
    address: "Phú Nhuận, Thành phố Hồ Chí Minh",
  },
  {
    id: 14,
    name: "Nguyễn Minh Tâm",
    subject: "Toán, Tin học",
    university: "Đại học Bách Khoa",
    major: "Sư phạm Tin học",
    img: "/assets/images/Hinh-gai-xinh-Viet-Nam-ngau.jpg",
    students: 20,
    address: "Hà Đông, Hà Nội",
  },
  {
    id: 15,
    name: "Trần Thị Thu",
    subject: "Văn, Anh",
    university: "Đại học Sư phạm Hà Nội",
    major: "Sư phạm văn",
    img: "./assets/images/photo-3-17095612230361600987646.webp",
    students: 25,
    address: "Thanh Trì, Hà Nội",
  },
];

const initialCourses = [
  {
    id: 1,
    status: "Chưa giao",
    subject: "Toán",
    code: "ST495",
    grade: "9",
    type: "Offline",
    time: "1 buổi/tuần",
    dateCreated: "12/04/2023 10:04",
    requirements: "DT989 Toán 9/...",
    address: "Hà Nội",
    account: 3,
  },
  {
    id: 2,
    status: "Đang giao",
    subject: "Toán",
    code: "ST702",
    grade: "10",
    type: "Online",
    time: "chưa xác định",
    dateCreated: "12/04/2023 20:04",
    requirements: "DT5368 ONLI...",
    address: "Hà Nội",
    account: 4,
  },
  {
    id: 3,
    status: "Đang duyệt",
    subject: "Vật Lý",
    code: "ST530",
    grade: "11",
    type: "Offline",
    time: "1 buổi/tuần",
    dateCreated: "12/04/2023 11:04",
    requirements: "LT0698 Lý 11/...",
    address: "Hà Nội",
    account: 5,
  },
  {
    id: 4,
    status: "Chưa giao",
    subject: "Vật Lý",
    code: "ST529",
    grade: "9",
    type: "Offline",
    time: "1 buổi/tuần",
    dateCreated: "12/04/2023 11:04",
    requirements:
      "LL2345 Lý 9  Toán 10/ HS nữ/ HS học chuyên ban Xã hội/ HL TB Khá Cần học chắc kiến thức môn Toán và nâng cao dần",
    address: "Hà Nội",
    account: 3,
  },
  {
    id: 5,
    status: "Đang giao",
    subject: "Vật Lý",
    code: "ST529",
    grade: "9",
    type: "Offline",
    time: "1 buổi/tuần",
    dateCreated: "12/04/2023 11:04",
    requirements:
      "LL2345 Lý 9  Toán 10/ HS nữ/ HS học chuyên ban Xã hội/ HL TB Khá Cần học chắc kiến thức môn Toán và nâng cao dần",
    address: "Hà Nội",
    account: 4,
  },
  {
    id: 6,
    status: "Đã hoàn thành",
    subject: "Vật Lý",
    code: "ST529",
    grade: "9",
    type: "Offline",
    time: "1 buổi/tuần",
    dateCreated: "12/04/2023 11:04",
    requirements:
      "LL2345 Lý 9  Toán 10/ HS nữ/ HS học chuyên ban Xã hội/ HL TB Khá Cần học chắc kiến thức môn Toán và nâng cao dần",
    address: "Hà Nội",
    account: 5,
  },
  {
    id: 7,
    status: "Chưa giao",
    subject: "Vật Lý",
    code: "ST529",
    grade: "9",
    type: "Offline",
    time: "1 buổi/tuần",
    dateCreated: "12/04/2023 11:04",
    requirements:
      "LL2345 Lý 9  Toán 10/ HS nữ/ HS học chuyên ban Xã hội/ HL TB Khá Cần học chắc kiến thức môn Toán và nâng cao dần",
    address: "Hà Nội",
    account: 3,
  },
  {
    id: 8,
    status: "Đang duyệt",
    subject: "Vật Lý",
    code: "ST529",
    grade: "9",
    type: "Offline",
    time: "1 buổi/tuần",
    dateCreated: "12/04/2023 11:04",
    requirements:
      "LL2345 Lý 9  Toán 10/ HS nữ/ HS học chuyên ban Xã hội/ HL TB Khá Cần học chắc kiến thức môn Toán và nâng cao dần",
    address: "Hà Nội",
    account: 4,
  },
  {
    id: 9,
    status: "Chưa giao",
    subject: "Vật Lý",
    code: "ST529",
    grade: "9",
    type: "Offline",
    time: "1 buổi/tuần",
    dateCreated: "12/04/2023 11:04",
    requirements:
      "LL2345 Lý 9  Toán 10/ HS nữ/ HS học chuyên ban Xã hội/ HL TB Khá Cần học chắc kiến thức môn Toán và nâng cao dần",
    address: "Hà Nội",
    account: 3,
  },
  {
    id: 10,
    status: "Đang giao",
    subject: "Vật Lý",
    code: "ST529",
    grade: "9",
    type: "Offline",
    time: "1 buổi/tuần",
    dateCreated: "12/04/2023 11:04",
    requirements:
      "LL2345 Lý 9  Toán 10/ HS nữ/ HS học chuyên ban Xã hội/ HL TB Khá Cần học chắc kiến thức môn Toán và nâng cao dần",
    address: "Hà Nội",
    account: 4,
  },
  {
    id: 11,
    status: "Đã hoàn thành",
    subject: "Vật Lý",
    code: "ST529",
    grade: "9",
    type: "Offline",
    time: "1 buổi/tuần",
    dateCreated: "12/04/2023 11:04",
    requirements:
      "LL2345 Lý 9  Toán 10/ HS nữ/ HS học chuyên ban Xã hội/ HL TB Khá Cần học chắc kiến thức môn Toán và nâng cao dần",
    address: "Hà Nội",
    account: 5,
  },
  {
    id: 12,
    status: "Chưa giao",
    subject: "Vật Lý",
    code: "ST529",
    grade: "9",
    type: "Offline",
    time: "1 buổi/tuần",
    dateCreated: "12/04/2023 11:04",
    requirements:
      "LL2345 Lý 9  Toán 10/ HS nữ/ HS học chuyên ban Xã hội/ HL TB Khá Cần học chắc kiến thức môn Toán và nâng cao dần",
    address: "Hà Nội",
    account: 3,
  },
  {
    id: 13,
    status: "Đang giao",
    subject: "Vật Lý",
    code: "ST529",
    grade: "9",
    type: "Offline",
    time: "1 buổi/tuần",
    dateCreated: "12/04/2023 11:04",
    requirements:
      "LL2345 Lý 9  Toán 10/ HS nữ/ HS học chuyên ban Xã hội/ HL TB Khá Cần học chắc kiến thức môn Toán và nâng cao dần",
    address: "Hà Nội",
    account: 4,
  },
  {
    id: 14,
    status: "Đang duyệt",
    subject: "Vật Lý",
    code: "ST529",
    grade: "9",
    type: "Offline",
    time: "1 buổi/tuần",
    dateCreated: "12/04/2023 11:04",
    requirements:
      "LL2345 Lý 9  Toán 10/ HS nữ/ HS học chuyên ban Xã hội/ HL TB Khá Cần học chắc kiến thức môn Toán và nâng cao dần",
    address: "Hà Nội",
    account: 5,
  },
  {
    id: 15,
    status: "Chưa giao",
    subject: "Vật Lý",
    code: "ST529",
    grade: "9",
    type: "Offline",
    time: "1 buổi/tuần",
    dateCreated: "12/04/2023 11:04",
    requirements:
      "LL2345 Lý 9  Toán 10/ HS nữ/ HS học chuyên ban Xã hội/ HL TB Khá Cần học chắc kiến thức môn Toán và nâng cao dần",
    address: "Hà Nội",
    account: 3,
  },
];

const initialNotification = [
  {
    from: 2,
    to: 3,
    content: "Gia sư đã yêu cầu nhận lớp dạy mà bạn đăng",
    createDate: "23/03/2025",
    read: false,
  },
  {
    from: 5,
    to: 2,
    content: "Bạn đã nhận được một yêu cầu dạy học",
    createDate: "23/03/2025",
    read: false,
  },
];

const initialBooksTutor = [
  {
    id: 1,
    user: 3,
    tutor: 2,
    status: "Đợi duyệt",
    crateDate: "23/03/2025"
  },
  {
    id: 2,
    user: 4,
    tutor: 2,
    status: "Đợi duyệt",
    crateDate: "23/03/2025"
  },
];

function AuthProvider({ children }) {
  const getFromLocalStorage = (key, defaultValue) => {
    const savedData = localStorage.getItem(key);

    return savedData ? JSON.parse(savedData) : defaultValue;
  };

  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({});

  const [accounts, setAccounts] = useState(
    getFromLocalStorage("accounts", initialAccounts)
  );
  const [tutors, setTutors] = useState(
    getFromLocalStorage("tutors", initialTutors)
  );
  const [courses, setCourses] = useState(
    getFromLocalStorage("courses", initialCourses)
  );

  const [notifications, setNotifications] = useState(
    getFromLocalStorage("notifications", initialNotification)
  );

  const [booksList, setBooksList] = useState(
    getFromLocalStorage("booksList", initialBooksTutor)
  );

  // Lưu dữ liệu vào localStorage mỗi khi có sự thay đổi
  useEffect(() => {
    localStorage.setItem("accounts", JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    localStorage.setItem("tutors", JSON.stringify(tutors));
  }, [tutors]);

  useEffect(() => {
    localStorage.setItem("courses", JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem("booksList", JSON.stringify(booksList));
  }, [booksList]);

  return (
    <AuthContext.Provider
      value={{
        isLogin,
        setIsLogin,
        user,
        setUser,
        accounts,
        setAccounts,
        tutors,
        setTutors,
        courses,
        setCourses,
        notifications,
        setNotifications,
        booksList,
        setBooksList
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
