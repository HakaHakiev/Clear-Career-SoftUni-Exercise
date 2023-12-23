import * as api from "./api.js";

const host = "http://localhost:3030";
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

// Application-specific request
// get all listings
export async function getAllOffers() {
  return await api.get(host + "/data/offers?sortBy=_createdOn%20desc");
}

// get listing by id
export async function getOfferById(id) {
  return await api.get(host + `/data/offers/${id}`);
}

// create listing
export async function addOffer(fact) {
  return await api.post(host + "/data/offers", fact);
}

// edit listing by id
export async function editOfferById(id, fact) {
  return await api.put(host + `/data/offers/${id}`, fact);
}

// delete listing by id
export async function deleteOfferById(id) {
  return await api.del(host + `/data/offers/${id}`);
}

export async function apply(offerId) {
  return await api.post(host + `/data/applications`, offerId);
}

export async function getTotalApplies(offerId) {
  return await api.get(
    host +
      `/data/applications?where=offerId%3D%22${offerId}%22&distinct=_ownerId&count`
  );
}

export async function didUserApply(offerId, userId) {
  return await api.get(
    host +
      `/data/applications?where=offerId%3D%22${offerId}%22%20and%20_ownerId%3D%22${userId}%22&count`
  );
}
