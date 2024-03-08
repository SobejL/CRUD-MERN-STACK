import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../state/postsSlice.jsx';

// Components
import PostDetail from '../components/PostDetail.jsx';
import PostForm from '../components/PostForm.jsx';

const Home = () => {
  const posts = useSelector((state) => state.posts.posts);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/posts', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          dispatch(getPosts(data));
          console.log(data);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchPosts();
    }
  }, [dispatch, user]);

  return (
    <div className='home'>
      <div className='workouts'>
        {loading ? (
          <p>Loading...</p>
        ) : (
          posts &&
          posts.map((post, index) => (
            <PostDetail key={post._id || index} post={post} />
          ))
        )}
      </div>

      <PostForm />
    </div>
  );
};

export default Home;
