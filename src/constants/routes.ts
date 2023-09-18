export const usersURL = "/users";
export const userURL: `${typeof usersURL}/:userId` = `${usersURL}/:userId`;
export const profileURL: `${typeof usersURL}/me` = `${usersURL}/me`;
export const updateAvatarURL: `${typeof profileURL}/avatar` = `${profileURL}/avatar`;
export const cardsURL = "/cards";
export const cardURL: `${typeof cardsURL}/:cardId` = `${cardsURL}/:cardId`;
export const likeCardURL: `${typeof cardURL}/likes` = `${cardURL}/likes`;
export const legacyLikeCardURL = "/cards/likes/:cardId";
