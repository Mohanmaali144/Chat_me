export const chatAPI = {
  getUserContacts: (userId) => {
    return `/api/users/${userId}/contacts`;
  },
  getUserMessages: ({ userId, chatId, type }) => {
    return `/api/users/${userId}/messages?chatId=${chatId}&type=${type}`;
  },
  postUserMessage: ({ userId, chatId, type }) => {
    return `/api/users/${userId}/message?chatId=${chatId}&type=${type}`;
  },
  updateReadStatus: ({ userId, chatId, type }) => {
    return `/api/users/${userId}/messages/status?chatId=${chatId}&type=${type}`;
  },


  // postCreateRoom: (userId) => {
  //   return `/api/users/${userId}/room`;
  // }

  postCreateRoom: (userId) => {
    return `/api/users/CreateRoom`;
  },

  getFollowers: (userId) => {
    return `/api/users/${userId}/followers`;
  },
  getFollowings: (userId) => {
    return `/api/users/${userId}/followings`;
  },
  getBlockedUser: (userId) => {
    return `/api/users/${userId}/blocked`;
  },

};
