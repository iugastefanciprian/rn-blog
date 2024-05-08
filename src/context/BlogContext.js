import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer';

const blogReducer = (state, action) => {
  switch (action.type) {
    case 'get_blogposts':
      return action.payload;
    case 'delete_blogpost':
      return state.filter((blogPost) => blogPost.id !== action.payload);
    default:
      return state;
  }
};

const getBlogPosts = (dispatch) => {
  return async () => {
    try {
      const response = await jsonServer.get('/blogposts');
      dispatch({ type: 'get_blogposts', payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
};

const addBlogPost = () => {
  return async (title, content, callback) => {
    await jsonServer.post('/blogposts', { title, content });

    if (callback) callback();
  };
};

const deleteBlogPost = (dispatch) => {
  return async (id) => {
    await jsonServer.delete(`/blogposts/${id}`);
    dispatch({ type: 'delete_blogpost', payload: id });
  };
};

const editBlogPost = () => {
  return async (id, title, content, callback) => {
    await jsonServer.put(`/blogposts/${id}`, { title, content });

    if (callback) callback();
  };
};

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
  []
);
