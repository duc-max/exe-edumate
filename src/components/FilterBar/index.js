import React, { useState } from 'react';

const FilterBar = () => {
  const [formData, setFormData] = useState({
    code: '',
    classLevel: '',
    subject: '',
    province: '',
    district: '',
    timeSlot: '',
    format: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    // Here you would typically send the data to your API
  };

  return (
    <div className="filter-container">
      <h1 className="filter-title">Phụ huynh tìm gia sư</h1>
      <form className="filter-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="code"
          placeholder="Mã số lớp"
          value={formData.code}
          onChange={handleInputChange}
          className="filter-input"
        />
        
        <select
          name="classLevel"
          value={formData.classLevel}
          onChange={handleInputChange}
          className="filter-select"
        >
          <option value="">Lớp học</option>
          <option value="1">Lớp 1</option>
          <option value="2">Lớp 2</option>
          <option value="3">Lớp 3</option>
          {/* Add more options as needed */}
        </select>
        
        <select
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          className="filter-select"
        >
          <option value="">Môn học</option>
          <option value="math">Toán</option>
          <option value="physics">Vật lý</option>
          <option value="chemistry">Hóa học</option>
          {/* Add more options as needed */}
        </select>
        
        <input
          type="text"
          name="province"
          placeholder="Tỉnh thành"
          value={formData.province}
          onChange={handleInputChange}
          className="filter-input"
        />
        
        <input
          type="text"
          name="district"
          placeholder="Quận huyện"
          value={formData.district}
          onChange={handleInputChange}
          className="filter-input"
        />
        
        <select
          name="timeSlot"
          value={formData.timeSlot}
          onChange={handleInputChange}
          className="filter-select"
        >
          <option value="">Chọn buổi học</option>
          <option value="morning">Sáng</option>
          <option value="afternoon">Chiều</option>
          <option value="evening">Tối</option>
        </select>
        
        <select
          name="format"
          value={formData.format}
          onChange={handleInputChange}
          className="filter-select"
        >
          <option value="">Hình thức học</option>
          <option value="online">Trực tuyến</option>
          <option value="offline">Trực tiếp</option>
        </select>
        
        <button type="submit" className="filter-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
        </button>
      </form>
    </div>
  );
};

// Add custom styles - no framework classes used
const styles = `
  .filter-container {
    width: 100%;
    background-color: #0d6efd;
    padding: 20px 0;
    font-family: Arial, sans-serif;
  }
  
  .filter-title {
    text-align: center;
    color: white;
    margin-bottom: 20px;
    font-size: 28px;
    font-weight: bold;
  }
  
  .filter-form {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 1200px;
    margin: 0 auto;
    gap: 5px;
  }
  
  .filter-input, .filter-select {
    padding: 10px;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    flex: 1;
    min-width: 150px;
    max-width: 200px;
    background-color: white;
  }
  
  .filter-select {
    appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' fill='%23333' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: calc(100% - 10px) center;
    padding-right: 30px;
  }
  
  .filter-button {
    background-color: white;
    border: none;
    border-radius: 4px;
    padding: 10px 15px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #0d6efd;
  }
  
  .filter-button:hover {
    background-color: #f0f0f0;
  }
  
  @media screen and (max-width: 768px) {
    .filter-input, .filter-select {
      min-width: 100px;
      max-width: 150px;
    }
  }
  
  @media screen and (max-width: 576px) {
    .filter-form {
      flex-direction: column;
    }
    
    .filter-input, .filter-select {
      min-width: 90%;
      max-width: 90%;
    }
    
    .filter-button {
      margin-top: 10px;
      width: 90%;
    }
  }
`;

// Add the styles to the component
const FilterBarWithStyles = () => {
  return (
    <>
      <style>{styles}</style>
      <FilterBar />
    </>
  );
};

export default FilterBarWithStyles;