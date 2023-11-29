import React, { useState, useEffect } from 'react';
import { getCurrentUser } from '../../store/session';
import NavBar from '../NavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import EmptyUser from '../Images/EmptyUser.jpeg';
import './index.css';

const UserProfile = () => {
    const user = getCurrentUser();
    const [uploadedImage, setUploadedImage] = useState(null);
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
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
                <div className={`profile-greeting ${fadeIn ? 'fade-in' : ''}`}>Greetings, {user?.username ? user?.username : 'Guest'}</div>
                <div className={`profile-details-div ${fadeIn ? 'fade-in' : ''}`}>
                    <div className="profile-img-div">
                        <div className="profile-back-to-main-div">
                            <button className="profile-back-to-main-button">
                                <FontAwesomeIcon icon={faArrowLeft} style={{ fontSize: '40px', color: '#022a54f0' }} />
                            </button>
                        </div>

                        <div className="profile-img-container">
                            <img className="profile-img" alt="uploaded-user" src={uploadedImage || EmptyUser} />
                        </div>
                            
                        <div className="upload-label-container">
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
                        <div className="profile-email">Email: {user?.email}</div><button>Edit</button>
                        <div className="profile-username">Username: {user?.username}</div><button>Edit</button>
                        <div className="profile-age">Age: {user?.age}</div><button>Edit</button>
                        <div className="profile-first">First Name: {user?.firstName}</div><button>Edit</button>
                        <div className="profile-last">Last Name: {user?.lastName}</div><button>Edit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;

