const API_URL = import.meta.env.VITE_API_URL;


export const getItems = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const createItem = async (item) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
  return response.json();
};

export const deleteItem = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};
