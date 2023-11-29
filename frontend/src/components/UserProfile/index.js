import React, { useState } from 'react';
import { getCurrentUser } from '../../store/session';
import NavBar from '../NavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import EmptyUser from '../Images/EmptyUser.jpeg';
import './index.css';

const UserProfile = () => {
    const user = getCurrentUser();
    const [uploadedImage, setUploadedImage] = useState(null);

    const handleImageChange = (event) => {
        const selectedImage = event.target.files[0];

        if (selectedImage) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setUploadedImage(reader.result);
            };

            reader.readAsDataURL(selectedImage);
        }
    };

    return (
        <div className="app-container">
            <NavBar />
            <div className="profile-container">
                <div className="profile-greeting">Greetings, {user?.username ? user?.username : 'Guest'}</div>
                <div className="profile-details-div">
                    <div className="profile-img-div">
                        <div className="profile-back-to-main-div">
                            <button className="profile-back-to-main-button">
                                <FontAwesomeIcon icon={faArrowLeft} style={{ fontSize: '40px', color: '#022a54f0' }} />
                            </button>
                        </div>
                        <div className="profile-img-container">
                            <img className="profile-img" alt="uploaded-user" src={uploadedImage || EmptyUser} />
                            <label htmlFor="imageInput" className="upload-label">
                                Upload Image
                                <input
                                    id="imageInput"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    style={{ display: 'none' }}
                                />
                            </label>
                        </div>
                    </div>

                    <div className="profile-details">
                        <div className="profile-email">Bob{user?.email}</div>
                        <div className="profile-username">Bob{user?.username}</div>
                        <div className="profile-age">Bob{user?.age}</div>
                        <div className="profile-first">Bob{user?.firstName}</div>
                        <div className="profile-last">Bob{user?.lastName}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;

