import {useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {updatePost} from "../state/postsSlice.jsx"
import { useParams,useNavigate } from 'react-router-dom'

import Dropzone from 'react-dropzone'

const PostUpdateForm = () => {

    const {id} = useParams()
    console.log(id)
    const posts = useSelector(state => state.posts.posts)
    const user = useSelector(state => state.auth.user)  
    const post = posts.find(u => u.id === id)
    console.log(post)


  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');
  
  const [emptyFields, setEmptyFields] = useState([])

  const [image, setImage] = useState(null)


  const [error,setError] = useState(null)


const handleUpdate = async (e) =>{
  e.preventDefault()

  const formData = new FormData();

  formData.append("title", title);
  formData.append("load", load);
  formData.append("reps", reps);
  
  // Check if image is not null before accessing its properties
  if (image) {
    formData.append("picture", image);
    formData.append("picturePath", image.name);
  }

  if (!user) {
    setError('You must be logged in');
    return;
  }


    const response = await fetch('/updatePost/'+id,{
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${user.token}`
  },
    body: formData,
})





  const data = await response.json()



  if(!response.ok){
      setError(data.error)
      setEmptyFields(data.emptyFields)
  }

  if(response.ok){
      setTitle('')
      setLoad('')
      setReps('')
      setEmptyFields([])
      setError(null)

            dispatch(updatePost({ data }))

      console.log("New Edit", data)

            // Navigate to the home page
            navigate("/");
    
  }


}


const dropzoneStyle = {
  border: '2px dashed #ccc',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};

const dropzoneContainerStyle = {
  marginTop: '15px',
};

return (
  <form className='create' onSubmit={handleUpdate}>
      <h3>Add a New Workout</h3>

      <label>Exercise Title:</label>
      <input
      type='text'
      onChange={(e) => setTitle(e.target.value)}
      value={title}
      name='title'
    //   className={emptyFields.includes('title') ? 'error' : ''}
      />

<label>Load in (kg):</label>
      <input
      type='number'
      onChange={(e) => setLoad(e.target.value)}
      value={load}
      name='load'
    //   className={emptyFields.includes('load') ? 'error' : ''}
      />

<label>Reps: </label>
      <input
      type='number'
      onChange={(e) => setReps(e.target.value)}
      value={reps}
      name='reps'
    //   className={emptyFields.includes('reps') ? 'error' : ''}
      />



<Dropzone
        multiple={false}
        onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
        style={dropzoneContainerStyle} // Apply styles to the container
      >
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()} style={dropzoneStyle}> {/* Apply styles to the dropzone */}
              <input {...getInputProps()} />

              {!image ? (
                <p>Add Image Here</p>
              ) : (
                <p>{image.name}</p>
              )}
            </div>
          </section>
        )}
      </Dropzone>

  <button>Add Workout</button>
  {error && <div className='error'>{error}</div>}
  </form>
)
}

export default PostUpdateForm