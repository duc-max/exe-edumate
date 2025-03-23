import React, { useContext, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import { AuthContext } from "../../context/auth";
import { Link } from "react-router-dom";

// Hàm lấy tọa độ từ địa chỉ
const getCoordinates = async (address) => {
  const apiKey =
    "pk.eyJ1IjoiZHVjdHJhbjEyMjAwMiIsImEiOiJjbTQ2cmFubGwwaTNoMnNyNnhpemR2OGF1In0.AhqC0rYjFPk95vO_p_s9Sg";
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${apiKey}`;
  const response = await axios.get(url);
  if (response.data.features.length > 0) {
    return {
      lat: response.data.features[0].center[1],
      lng: response.data.features[0].center[0],
    };
  }
  return null;
};

const MapComponent = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [tutorLocations, setTutorLocations] = useState([]);
  const [userLogin, setUserLogin] = useState({});

  const user = localStorage.getItem("user");

  useEffect(() => {
    if (user) {
      setUserLogin(JSON.parse(user));
    }
  }, [user]);

  const { tutors } = useContext(AuthContext);

  useEffect(() => {
    if (userLogin?.address) {
      getCoordinates(userLogin?.address).then((coords) => {
        if (coords) {
          setUserLocation(coords);
        }
      });
    }
  }, [userLogin?.address]); // Chạy lại khi địa chỉ người dùng thay đổi

  // Lấy tọa độ cho tất cả gia sư
  useEffect(() => {
    if (tutors && tutors.length > 0) {
      Promise.all(tutors.map((tutor) => getCoordinates(tutor.address))).then(
        (locations) => {
          const updatedTutors = tutors.map((tutor, index) => ({
            ...tutor,
            lat: locations[index]?.lat,
            lng: locations[index]?.lng,
          }));
          setTutorLocations(updatedTutors);
        }
      );
    }
  }, [tutors]);

  // Tạo biểu tượng cho gia sư
  const customIcon = (avatar) =>
    new L.Icon({
      iconUrl: avatar,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40],
    });

  // Tạo biểu tượng cho vị trí của người dùng
  const userIcon = new L.Icon({
    iconUrl: "./assets/images/location-position-icon-1640x2048-6jqx3f7e.png",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });

  return (
    <MapContainer
      center={userLocation || { lat: 21.0285, lng: 105.8542 }}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {userLocation && (
        <Marker position={userLocation} icon={userIcon}>
          <Popup>Bạn đang ở đây!</Popup>
        </Marker>
      )}

      {/* Hiển thị danh sách gia sư */}
      {tutorLocations.map((tutor) =>
        tutor.lat && tutor.lng ? (
          <Marker
            key={tutor.id}
            position={{ lat: tutor.lat, lng: tutor.lng }}
            icon={customIcon(tutor.img)}
          >
            <Popup>
              <Link to={`chi-tiet-gia-su/${tutor.id}`}>
                <img src={tutor.img} alt={tutor.name} width="50" height="50" />
              </Link>
              <p>{tutor.name}</p>
            </Popup>
          </Marker>
        ) : null
      )}
    </MapContainer>
  );
};

export default MapComponent;
