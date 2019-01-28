export const userDetailedQuery = ({ user, userUid }) => {
  if (userUid) {
    return [
      {
        collection: 'users',
        doc: userUid,
        storeAs: 'profile'
      },
      {
        collection: 'users',
        doc: userUid,
        subcollections: [{ collection: 'photos' }],
        storeAs: 'photos'
      }
    ];
  } else {
    return [
      {
        collection: 'users',
        doc: user.uid,
        subcollections: [{ collection: 'photos' }],
        storeAs: 'photos'
      }
    ];
  }
};
