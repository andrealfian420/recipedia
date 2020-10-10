import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import UserProfileNavbar from '../layout/UserProfileNavbar';
import UpdateProfile from './UpdateProfile';

const ProfileInfo = (props) => {
  useEffect(() => {
    document.title = 'Edit Profile Info';
    props.cleanupUpdateMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="px-16 py-6 bg-gray-100 md:col-span-10">
      <UserProfileNavbar />
      <UpdateProfile />
    </main>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    cleanupUpdateMessage: () => dispatch({ type: 'CLEANUP_UPDATE_MESSAGE' }),
  };
};

export default connect(null, mapDispatchToProps)(ProfileInfo);
