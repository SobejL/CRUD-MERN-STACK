import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '../state/postsSlice.jsx';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { Link } from 'react-router-dom';

const PostDetail = ({ post }) => {
  console.log('Received post data:', post);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleDelete = async () => {
    if (!user) {
      setError('You must be logged in');
      return;
    }

    const response = await fetch('/posts/' + post._id, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (response.ok) {
      console.log('New Deleted', data);
      dispatch(deletePost(data));
    }
  };

  return (
    <div className='workout-details'>
      <h4>{post.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {post.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {post.reps}
      </p>
      {post.createdAt && (
        <p>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</p>
      )}

      <img
        src={`/assets/${post.picturePath}`}
        style={{ maxWidth: '100%', maxHeight: '200px' }} // Adjust these values as needed
        alt={post.title}
      />

      <Link to={'/posts/' + post._id}>Update</Link>
      <span onClick={handleDelete}>Delete</span>
    </div>
  );
};

export default PostDetail;
