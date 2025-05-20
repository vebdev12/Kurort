const defaultHeaders = {
  "Content-type": "application/json",
  Accept: "application/json",
};

const BASE_URL = "https://kurort-server.onrender.com/api";

const request = async (
  url,
  method = "GET",
  body = null,
  headers = defaultHeaders
) => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      method,
      body: body ? JSON.stringify(body) : null,
      headers: { ...headers, Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error(`could not featch ${url}, status ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (e) {
    throw e;
  }
};
