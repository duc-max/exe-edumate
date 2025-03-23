import { FaArrowRight } from "react-icons/fa6";
import { IoIosStar } from "react-icons/io";
import { PiStudent } from "react-icons/pi";
import { Link } from "react-router-dom";

import "./style.css";

function Card({ tutor }) {
  return (
    <div className="card-wrapper">
      <div>
        <div className="card-img">
          <img src={tutor?.img} alt="avatar" />
        </div>

        <div className="card-info">
          <h2 className="tutor-name">{tutor?.name}</h2>

          <div className="card-edu">
            <p>Môn: {tutor?.subject}</p>
            <p>Sinh viên: {tutor?.university}</p>
            <p>Ngành học: {tutor?.major}</p>
          </div>
          <div className="card-group">
            <div className="card-group--item">
              <PiStudent style={{ fontSize: "20px" }} />
              <span>{tutor?.students} học sinh</span>
            </div>
            <div className="card-group--item">
              <IoIosStar style={{ fontSize: "20px", color: "#ff9f29" }} />
              <span>4.6 (2.4k)</span>
            </div>
          </div>

          <div style={{ padding: "20px 0" }}>
            <Link to={`chi-tiet-gia-su/${tutor.id}`} className="card-link">
              <span>Chi tiết</span>
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
