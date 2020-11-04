import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import UserProfileNavbar from '../layout/UserProfileNavbar';
import UpdateProfile from './UpdateProfile';
import UpdatePassword from './UpdatePassword';

const ProfileInfo = (props) => {
  useEffect(() => {
    document.title = 'Edit Profile Info';
    props.cleanupUpdateMessage();
    props.cleanupPasswordMessage();
    props.cleanupErrorMessage();
    props.cleanupPasswordErrorMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="px-16 py-6 bg-gray-100 md:col-span-10 mt-8 md:mt-0">
      <UserProfileNavbar />
      <UpdateProfile />
      <UpdatePassword />
    </main>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    cleanupUpdateMessage: () => dispatch({ type: 'CLEANUP_UPDATE_MESSAGE' }),
    cleanupPasswordMessage: () =>
      dispatch({ type: 'CLEANUP_PASSWORD_SUCCESS_MESSAGE' }),
    cleanupErrorMessage: () => dispatch({ type: 'CLEANUP_ERROR_MESSAGE' }),
    cleanupPasswordErrorMessage: () =>
      dispatch({ type: 'CLEANUP_PASSWORD_ERROR_MESSAGE' }),
  };
};

export default connect(null, mapDispatchToProps)(ProfileInfo);
