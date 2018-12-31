import moment from "moment";
import { toastr } from "react-redux-toastr";

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
    toastr.success("Success", "Profile updated");
  } catch (error) {
    console.log(error);
  }
};
