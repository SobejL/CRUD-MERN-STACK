import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../state/postsSlice.jsx';

import Dropzone from 'react-dropzone';

const PostForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('title', title);
    formData.append('load', load);
    formData.append('reps', reps);
    formData.append('picture', image);
    formData.append('picturePath', image.name);

    if (!user) {
      setError('You must be logged in');
      return;
    }

    try {
      const response = await fetch('/makePost', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error);
        setEmptyFields(data.emptyFields);
      } else {
        const data = await response.json();
        console.log('New Post', data);

        // Update the state only after a successful response
        setImage(null);
        setTitle('');
        setLoad('');
        setReps('');
        setEmptyFields([]);
        setError(null);

        dispatch(createPost({ data }));
      }
    } catch (error) {
      console.error('Error posting:', error);
    }
  };

  return (
    <form className='create' onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label>Exercise Title:</label>
      <input
        type='text'
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        name='title'
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Load in (kg):</label>
      <input
        type='number'
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        name='load'
        className={emptyFields.includes('load') ? 'error' : ''}
      />

      <label>Reps: </label>
      <input
        type='number'
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        name='reps'
        className={emptyFields.includes('reps') ? 'error' : ''}
      />

      <Dropzone multiple={false} onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div
              {...getRootProps()}
              style={{
                border: '2px dashed #ddd',
                borderRadius: '4px',
                padding: '20px',
                textAlign: 'center',
                cursor: 'pointer',
              }}
            >
              <input {...getInputProps()} />
              {/* <p>Drag 'n' drop some files here, or click to select files</p> */}

              {!image ? (
                <p style={{ color: '#555' }}>Add Image Here</p>
              ) : (
                <p style={{ color: '#333' }}>{image.name}</p>
              )}
            </div>
          </section>
        )}
      </Dropzone>

      <button>Add Workout</button>
      {error && <div className='error'>{error}</div>}
    </form>
  );
};

export default PostForm;
