import { Container } from "react-bootstrap";
import "./style.css";
import { LuPhoneOutgoing } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth";

function TutorDetail() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [submittedReviews, setSubmittedReviews] = useState([]);
  const [error, setError] = useState("");
  const [tutor, setTutor] = useState({});
  const { id } = useParams();
  const { tutors, isLogin, setNotifications, booksList, setBooksList } = useContext(AuthContext);
  const [userLogin, setUserLogin] = useState({});
  const user = localStorage.getItem("user");

  useEffect(() => {
    if (user) {
      setUserLogin(JSON.parse(user));
    }
  }, [user]);

  useEffect(() => {
    const findTutor = tutors.find((item) => item.id == id);
    if (findTutor) setTutor(findTutor);
  }, [id, tutors]);
  console.log(tutor.img);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (rating === 0) {
      setError("Vui lòng chọn đánh giá sao trước khi gửi.");
      return;
    }

    if (comment.trim() === "") {
      setError("Vui lòng nhập nội dung bình luận.");
      return;
    }

    const newReview = {
      id: Date.now(),
      rating,
      comment,
      date: new Date().toLocaleDateString(),
    };

    setSubmittedReviews([newReview, ...submittedReviews]);
    setRating(0);
    setComment("");
    setError("");
  };

  const handleRequestTutoring = () => {
    const currentDate = new Date();

    // Định dạng ngày theo kiểu dd/mm/yyyy
    const day = String(currentDate.getDate()).padStart(2, "0"); // Thêm số 0 vào ngày nếu ngày nhỏ hơn 10
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Thêm số 0 vào tháng nếu tháng nhỏ hơn 10
    const year = currentDate.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;
    const notificationToUser = {
      from: userLogin?.id,
      to: id,
      content: `Bạn đã nhận một yêu cầu dạy học từ ${userLogin?.firstName} ${userLogin?.lastName}`,
      createDate: formattedDate,
      read: false,

    };

    const notificationToTutor = {
      from: 0,
      to: userLogin?.id,
      content: `Bạn đã yêu cầu gia sư và đang đợi duyệt`,
      createDate: formattedDate,
      read: false,

    };

    setNotifications((prevNotifications) => [
      ...prevNotifications,
      notificationToUser,
      notificationToTutor,
    ]);

    setBooksList((prev) => [
      ...prev, {
        id: booksList.length + 1,
        user: userLogin?.id,
        tutor: id,
        createDate: formattedDate,
        status: "Đợi duyệt"
      }
    ]);

    alert("Yêu cầu dạy học đã được gửi!");
  };

  return (
    <Container>
      <div className="tutor-detail--container">
        <div className="tutor-detail--wrap">
          <div className="tutor-detail--img">
            <img src={tutor.img} alt="avatar" />
          </div>

          <div className="tutor-detail-info">
            <h3 style={{ color: "#066CCB", margin: 0 }}>Gia sư</h3>

            <div className="tutor-detail--profile">
              <h1>{tutor.name}</h1>
              <div className="tutor-detail-block">
                <p className="tutor-info-detail">
                  <strong>Năm sinh: 2002</strong>
                </p>
                <p className="tutor-info-detail">
                  <strong>Sinh viên: {tutor.university}</strong>
                </p>
                <p className="tutor-info-detail">
                  <strong>Ngành học: {tutor.major}</strong>
                </p>
                <p className="tutor-info-detail">
                  <strong>Môn dạy: {tutor.subject}</strong>
                </p>
              </div>

              <div className="tutor-detail-block">
                <h2>Profile</h2>
                <p className="tutor-info-detail">- Đạt chứng chỉ IELTS 7.0</p>
                <p className="tutor-info-detail">
                  - Điểm thi THPT Quốc Gia (2021) Tiếng Anh: 9,8
                </p>
                <p className="tutor-info-detail">
                  - Thành tích học tập: Cấp 2, cấp 3 tham gia đội tuyển HSG cấp
                  Huyện
                </p>
                <p className="tutor-info-detail">
                  - Cấp 3 học trường THPT Chuyên Thái Nguyên
                </p>
                <p className="tutor-info-detail">
                  - Điểm trung bình GPA Đại học: 3.44 /4.0 ( Giỏi )
                </p>
                <p className="tutor-info-detail">
                  - Có 2 năm kinh nghiệm Gia sư 1 kèm 1, ôn luyện thi học kỳ,
                  chuyển cấp, ôn thi Đại học
                </p>
                <p className="tutor-info-detail">
                  - Có kinh nghiệm giảng dạy trung tâm IEEP, kinh nghiệm dạy hệ
                  Cambridge flyers, ôn luyện thi IELTS
                </p>
              </div>

              <div className="tutor-detail-contact">
                <h2>Liên hệ</h2>

                <div className="tutor-contact--item">
                  <div className="tutor-contact--icon">
                    <LuPhoneOutgoing
                      style={{
                        fontSize: "24px",
                        color: "#155BAC",
                      }}
                    />
                  </div>

                  <p>0123456789</p>
                </div>

                <div className="tutor-contact--item">
                  <div className="tutor-contact--icon">
                    <MdOutlineEmail
                      style={{
                        fontSize: "24px",
                        color: "#4cb877",
                      }}
                    />
                  </div>

                  <p>example@gmail.com</p>
                </div>
                <div className="tutor-contact--item">
                  <div className="tutor-contact--icon">
                    <SlLocationPin
                      style={{
                        fontSize: "24px",
                        color: "#fea63a",
                      }}
                    />
                  </div>
                  <p>Hà Nội</p>
                </div>
              </div>

              {isLogin && (
                <>
                  {userLogin?.role === "student" && (
                    <button
                      className="request-tutoring-btn"
                      onClick={handleRequestTutoring}
                    >
                      Yêu cầu dạy học
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        <div className="rating-container">
          <h2>Đánh giá và bình luận</h2>

          {error && <p className="error-message">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="rating-section">
              <p>Đánh giá của bạn:</p>
              <div className="star-rating">
                {[...Array(5)].map((_, index) => {
                  const ratingValue = index + 1;
                  return (
                    <button
                      type="button"
                      key={ratingValue}
                      className="star-btn"
                      onClick={() => setRating(ratingValue)}
                      onMouseEnter={() => setHover(ratingValue)}
                      onMouseLeave={() => setHover(0)}
                    >
                      <span className="star">
                        {ratingValue <= (hover || rating) ? "★" : "☆"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="comment-section">
              <label htmlFor="comment">Bình luận của bạn:</label>
              <textarea
                id="comment"
                className="comment-input"
                rows="4"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Nhập bình luận của bạn..."
              />
            </div>

            <button type="submit" className="submit-btn">
              Gửi đánh giá
            </button>
          </form>

          {submittedReviews.length > 0 && (
            <div className="reviews-section">
              <h3>Các đánh giá đã gửi:</h3>
              <div className="reviews-list">
                {submittedReviews.map((review) => (
                  <div key={review.id} className="review-item">
                    <div className="review-header">
                      <div className="review-stars">
                        {[...Array(5)].map((_, index) => (
                          <span key={index} className="review-star">
                            {index + 1 <= review.rating ? "★" : "☆"}
                          </span>
                        ))}
                      </div>
                      <span className="review-date">{review.date}</span>
                    </div>
                    <p className="review-comment">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}

export default TutorDetail;
