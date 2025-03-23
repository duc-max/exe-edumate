import "./style.css";

function Filter() {
  return (
    <div className="filter-tutor">
      <h4>Địa điểm</h4>

      <form className="filter-form">
        <div className="filter-input--block">
            <input type="checkbox" name="address" />
            <span>Hà Nội</span>
        </div>

        <div className="filter-input--block">
            <input type="checkbox" name="address" />
            <span>TP.Hồ Chí Minh</span>
        </div>

        <div className="filter-input--block">
            <input type="checkbox" name="address" />
            <span>Hải phòng</span>
        </div>

        <div className="filter-input--block">
            <input type="checkbox" name="address" />
            <span>Quảng Ninh</span>
        </div>
        <div className="filter-input--block">
            <input type="checkbox" name="address" />
            <span>Đà nẵng</span>
        </div>
      </form>
    </div>
  );
}

export default Filter;
