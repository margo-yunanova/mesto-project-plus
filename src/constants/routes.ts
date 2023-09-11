export const usersURL = "/users";
export const userURL: `${typeof usersURL}/:userId` = `${usersURL}/:userId`;
export const updateProfileURL: `${typeof usersURL}/me` = `${usersURL}/me`;
export const updateAvatarURL: `${typeof updateProfileURL}/avatar` = `${updateProfileURL}/avatar`;
export const cardsURL = "/cards";
export const cardURL: `${typeof cardsURL}/:cardId` = `${cardsURL}/:cardId`;
export const likeCardURL: `${typeof cardURL}/likes` = `${cardURL}/likes`;
export const legacyLikeCardURL = "/cards/likes/:cardId";
