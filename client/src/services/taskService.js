const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');
const API_URL = `${API_BASE_URL}/api/tasks`;

const buildErrorMessage = async (response) => {
  try {
    const data = await response.json();
    return data.message || 'Something went wrong.';
  } catch (error) {
    return 'Something went wrong.';
  }
};

export const getTasks = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(await buildErrorMessage(response));
  }

  return response.json();
};

export const createTask = async (taskData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  });

  if (!response.ok) {
    throw new Error(await buildErrorMessage(response));
  }

  return response.json();
};

export const updateTask = async (taskId, updates) => {
  const response = await fetch(`${API_URL}/${taskId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    throw new Error(await buildErrorMessage(response));
  }

  return response.json();
};

export const deleteTask = async (taskId) => {
  const response = await fetch(`${API_URL}/${taskId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(await buildErrorMessage(response));
  }

  return response.json();
};
