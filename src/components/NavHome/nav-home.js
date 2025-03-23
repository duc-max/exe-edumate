import { Select } from "antd";
import { CiSearch } from "react-icons/ci";

import "./style.css";

function NavHome() {
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <div className="nav-wrapper">
      <div className="nav-container">
        <div className="nav-filter">
          <Select
            suffixIcon=""
            placeholder="Chọn tiêu chí gia sư"
            onChange={onChange}
            style={{color: "#fff"}}
            options={[
              {
                value: "jack",
                label: "Xếp hạng",
              },
              {
                value: "lucy",
                label: "Giờ dạy",
              },
              {
                value: "tom",
                label: "Số học sinh đã dạy",
              },
            ]}
          />
        </div>

        <div className="nav-search">
          <input
            placeholder="Tìm gia sư..."
            className="nav-search--input"
          />
          <button className="nav-search--button">
            <CiSearch style={{
                fontSize: "20px"
            }}/>
          </button>
        </div>
      </div>
    </div>
  );
}

export default NavHome;
