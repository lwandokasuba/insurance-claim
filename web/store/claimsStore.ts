import { Claim } from "../types";

let claims: Claim[] = [];

export const getClaimsStore = async () => {
  const data = await fetch(`${process.env.EXPRESS_API_URL}/claims/get`)
    .then(async (res) => await res.json())
    .catch((error) => {
      console.error("Error fetching claims:", error);
      return [];
    });

    console.log("Claims data:", data);
  claims = data.data;
  return claims;
}

export const getClaimStore = async (id: number) => {
  const data = await fetch(`${process.env.EXPRESS_API_URL}/claims/get/${id}`)
    .then((res) => res.json())
    .catch((error) => {
      console.error("Error fetching claim:", error);
      return null;
    });
  return data.data;
}

export const setClaimsStore = async (newClaims: Partial<Claim>) => {
  const data = await fetch(`${process.env.EXPRESS_API_URL}/claims/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newClaims),
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error("Error setting claims:", error);
      return null;
    });

  claims = [...claims, data.data];
  return claims;
};

export const updateClaimsStore = async (id: number, updatedClaim: Claim) => {
  const data = await fetch(`${process.env.EXPRESS_API_URL}/claims/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedClaim),
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error("Error updating claim:", error);
      return null;
    });

  claims = claims.map((claim) => (claim.id === id ? data : claim));
  return claims;
};

export const deleteClaimsStore = async (id: number) => {
  const data = await fetch(`${process.env.EXPRESS_API_URL}/claims/delete/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error("Error deleting claim:", error);
      return null;
    });

  claims = claims.filter((claim) => claim.id !== id);
  return claims;
};
