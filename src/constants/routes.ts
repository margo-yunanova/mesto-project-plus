export const userURL = "/users";
export const updateProfileURL = "/me";
export const updateAvatarURL: `${typeof updateProfileURL}/avatar` = `${updateProfileURL}/avatar`;
export const cardsURL = "/cards";
export const cardURL: `${typeof cardsURL}/:cardId` = `${cardsURL}/:cardId`;
export const likeCardURL: `${typeof cardURL}/likes` = `${cardURL}/likes`;
