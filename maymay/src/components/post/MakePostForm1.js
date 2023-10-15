import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { LinearProgress, OutlinedInput, Paper } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';
import '../../index.css'


// api services
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../../actions/posts";

// state
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

export default function MakePostForm1() {

  const { user: currentUser} = useSelector((state) => state.auth);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [path, setPath] = useState(null)
  const [res, setRes] = useState({});
  const handleSelectFile = (e) =>  { 
    setFile(e.target.files[0]); 
    const [filePath] = document.querySelector("#imgInp").files
      if (filePath) {
        console.log(filePath)
        setPath(URL.createObjectURL(filePath))
      }
  };

  const initialPostState = {
    id: null,
    title: "",
    postBody: "",
    hashtag: "",
    url: "",
    user: currentUser,
  };
  const [post, setPost] = useState(initialPostState);
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = event => {
    const { name, value } = event.target;
    setPost({ ...post, [name]: value });
    console.log(post)
  };

  const savePost = async () => {
    try {
      setLoading(true);
      const data = new FormData();
      data.append("my_file", file);
      const res = await axios.post("http://localhost:8080/upload", data);
      setRes(res.data);

      const url = res.data.url;
      const { title, postBody, hashtag, user } = post;
  
      dispatch(createPost(title, postBody, hashtag, url, user))
        .then(data => {
          setPost({
            id: data.id,
            title: data.title,
            postBody: data.postBody, 
            hashtag: data.hashtag,
            url: data.url,
            user: data.user
  
          });
          setSubmitted(true);
  
          console.log(data);
        })
        .catch(e => {
          console.log(e);
        });

    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const newPost = () => {
    setPost(initialPostState);
    setSubmitted(false);
    setFile(null);
    setPath(null);
  };

  return (
    <React.Fragment>

   
      <Grid container spacing={3} sx={{padding: 8}}>
        {submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <Link to={'/blog'}>
              <Button className="btn btn-success">
                Back Home
              </Button>
            </Link>
          </div>
        ) : (
        <>
        <Grid item xs={12} sm={12}>
          <Typography variant="h6" gutterBottom>
            Title
          </Typography>
          <TextField
            required
            id="firstName"
            name="title"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
          />
        </Grid>


        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Hashtag
          </Typography>

          <TextField
            required
            id="hashtag1"
            name="hashtag"
            label="#1"
            variant="standard"
            onChange={handleInputChange}
          />

        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Tag other
          </Typography>
          <TextField
            required
            id="tag-other"
            name="tagOther1"
            label="#to1"
            variant="standard"
          />
        </Grid>
        
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Message
          </Typography>
          <TextField
            id="filled-textarea"
            name="postBody"
            placeholder="Tell your story here"
            fullWidth
            multiline
            minRows={10}
            variant="standard"
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Select an image
          </Typography>

          <OutlinedInput accept="image/*" type='file' id="imgInp" onChange={handleSelectFile}> Select file </OutlinedInput>
          { path && <img id="blah" src={path} alt="your image" className='img-display'/>}
        </Grid>
        {loading && 
        <Box sx={{position: 'absolute', top: '50%', left:'50%', transform: 'translayte: (-100px, -100px)'}}>
          <Paper sx={{ backgroundColor: 'rgba(255, 255, 255, .8)', display: 'flex', height: '200px', width: '200px', alignItems: 'center', justifyContent: 'center'}}>
            <CircularProgress sx={{height: '100px', width: '100px', fontSize: 50}} />
          </Paper>
        </Box>
        }
        <Button
            variant="contained"
            onClick={savePost}
            sx={{ mt: 3, ml: 1 }}
          >
            Shared
        </Button>
      </>)}
      </Grid>
    </React.Fragment>
  );
}