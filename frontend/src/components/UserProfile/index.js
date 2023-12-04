import React, { useState, useEffect } from 'react';
import { getCurrentUser } from '../../store/session';
import NavBar from '../NavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './index.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import EmptyUser from '../Images/EmptyUser.png';

// import empty-user from '../Images/empty-user.jpeg';

const UserProfile = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        dispatch(getCurrentUser());
        setFadeIn(true);
    }, []);

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
        <div className={`app-container ${fadeIn ? 'fade-in' : ''}`}>
            <NavBar />
            <div className={`profile-container ${fadeIn ? 'fade-in' : ''}`}>
                {/* <div className={`profile-greeting ${fadeIn ? 'fade-in' : ''}`}>Greetings, {user?.username ? user?.username : 'Guest'}</div> */}
                <div className={`profile-details-div ${fadeIn ? 'fade-in' : ''}`}>
                    <div className="profile-img-div">
                        <div className="profile-back-to-main-div">
                            <button className="profile-back-to-main-button">
                                <FontAwesomeIcon icon={faArrowLeft} style={{ fontSize: '40px', color: '#022a54f0' }} />
                            </button>
                        </div>

                        <div className="profile-img-container">
                            <img className="profile-img" alt="uploaded-user" src={EmptyUser} />
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
                            
                        <div className="profile-details">
                            <div className="profile-label">{user?.firstName} {user?.lastName}</div>
                            <div className="profile-label">{user?.username}</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default UserProfile;

