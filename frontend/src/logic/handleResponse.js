const handleResponse = (data, status) => {
  if (status === 400) {
    throw new Error("Bad request");
  }

  if (status === 500) {
    throw new Error("Internal server error");
  }

  return data;
};

export default handleResponse;
