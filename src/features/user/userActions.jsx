import moment from 'moment';
import cuid from 'cuid';
import { toastr } from 'react-redux-toastr';
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from '../async/asyncActions';

export const updateProfile = user => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();

  if (user.dateOfBirth !== getState().firebase.profile.dateOfBirth) {
    user.dateOfBirth = moment(user.dateOfBirth).toDate();
  }

  try {
    dispatch(asyncActionStart());
    let getProfile = ({
      displayName,
      dateOfBirth,
      city,
      status,
      about,
      interests,
      occupation,
      origin
    }) => ({
      displayName,
      dateOfBirth,
      city,
      status,
      about,
      interests,
      occupation,
      origin
    });
    const profile = getProfile(user);
    await firebase.updateProfile(profile);
    dispatch(asyncActionFinish());
    toastr.success('Success', 'Profile updated');
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};

export const uploadProfileImage = (file, fileName) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const imageName = cuid();
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  const path = `${user.uid}/user_images`;
  const options = {
    name: imageName
  };

  try {
    dispatch(asyncActionStart());
    let uploadedFile = await firebase.uploadFile(path, file, null, options);
    let downloadURL = await uploadedFile.uploadTaskSnapshot.downloadURL;
    let userDoc = await firestore.get(`users/${user.uid}`);
    if (!userDoc.data().photoURL) {
      await firebase.updateProfile({
        photoURL: downloadURL
      });
      await user.updateProfile({
        photoURL: downloadURL
      });
    }

    await firestore.add(
      {
        collection: 'users',
        doc: user.uid,
        subcollections: [{ collection: 'photos' }]
      },
      {
        name: imageName,
        url: downloadURL
      }
    );

    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
    throw new Error('Problem uploading photo');
  }
};

export const deletePhoto = photo => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;

  try {
    dispatch(asyncActionStart());
    await firebase.deleteFile(`${user.uid}/user_images/${photo.name}`);
    await firestore.delete({
      collection: 'users',
      doc: user.uid,
      subcollections: [{ collection: 'photos', doc: photo.id }]
    });
    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
    throw new Error('Problem deleting the photo');
  }
};

export const setMainPhoto = photo => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();

  try {
    return await firebase.updateProfile({
      photoURL: photo.url
    });
  } catch (error) {
    console.log(error);
    throw new Error('Problem setting main photo');
  }
};
