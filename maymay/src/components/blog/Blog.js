import React, { useState, useEffect } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import MediaControlCard from '@mui/material/Card'
import ComplexGrid from '../ComplexGrid';
import Yourself from '../post/Yourself'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Box from '@mui/material/Box';
import QuiltedImageList from './imageList';
import MiniPost from '../post/post';
import { List, ListItem, ListItemText, ListItemButton } from "@mui/material";


import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


import {
  retrievePosts,
  findPostsByTitle,
  deleteAllPosts,
} from "../../actions/posts";


const mainFeaturedPost = {
  title: 'Title of a longer featured blog post',
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: 'https://source.unsplash.com/random?wallpapers',
  imageText: 'main image description',
  linkText: 'Continue reading…',
};

const featuredPosts = [
  {
    title: 'Featured post',
    date: 'Nov 12',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageLabel: 'Image Text',
    author: 'Sou',
    date: '12-06-2023'

  },
  {
    title: 'Post title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageLabel: 'Image Text',
    author: 'Key',
    date: '23-12-2023'

  },

  {
    title: 'Post title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageLabel: 'Image Text',
    author: 'Key',
    date: '23-12-2023'

  },

  {
    title: 'Post title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageLabel: 'Image Text',
    author: 'Key',
    date: '23-12-2023'

  },

  {
    title: 'Post title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageLabel: 'Image Text',
    author: 'Key',
    date: '23-12-2023'

  },
  {
    title: 'Featured post',
    date: 'Nov 12',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageLabel: 'Image Text',
    author: 'Sou',
    date: '12-06-2023'

  },
  {
    title: 'Post title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageLabel: 'Image Text',
    author: 'Key',
    date: '23-12-2023'

  },

  {
    title: 'Post title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageLabel: 'Image Text',
    author: 'Key',
    date: '23-12-2023'

  },

  {
    title: 'Post title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageLabel: 'Image Text',
    author: 'Key',
    date: '23-12-2023'

  },

  {
    title: 'Post title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageLabel: 'Image Text',
    author: 'Key',
    date: '23-12-2023'

  },
];

// const posts = [post1, post2, post3];

const hastashes = [
  { title: '#Chữa lành', url: '#' },
  { title: '#Tâm lý', url: '#' },
  { title: '#Phát triển bản thân', url: '#' },
  { title: '#Mối quan hệ', url: '#' },
  { title: '#Thấu hiểu', url: '#' },
  { title: '#Tình cảm', url: '#' },
  { title: '#Yêu thương', url: '#' },
  { title: '#Chia sẻ', url: '#' },
]

const sidebar = {
  title: 'About',
  description:
    'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
  archives: [
    { title: 'March 2020', url: '#' },
    { title: 'February 2020', url: '#' },
    { title: 'January 2020', url: '#' },
    { title: 'November 1999', url: '#' },
    { title: 'October 1999', url: '#' },
    { title: 'September 1999', url: '#' },
    { title: 'August 1999', url: '#' },
    { title: 'July 1999', url: '#' },
    { title: 'June 1999', url: '#' },
    { title: 'May 1999', url: '#' },
    { title: 'April 1999', url: '#' },
  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
};



// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme({  
  typography: {
    fontFamily: 
      '"Yellowtail", cursive',
  },
});

const Blog = (props) => {
  const {sections} = props;
  let navigate = useNavigate();

  const [content, setContent] = useState("");
  const { user: currentUser } = useSelector((state) => state.auth);

  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  // useEffect(() => {
  //   UserService.getUserBoard().then(
  //     (response) => {
  //       setContent(response.data);
  //     },
  //     (error) => {
  //       const _content =
  //         (error.response &&
  //           error.response.data &&
  //           error.response.data.message) ||
  //         error.message ||
  //         error.toString();
  //       console.log(_content)
  //       setContent(_content); 
  //       if (error.response && error.response.status === 401) {
  //         EventBus.dispatch("logout");
  //       }
  //       // navigate("/login");
  //     }
  //   );
  // }, []);


  const [currentPost, setCurrentPost] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  const posts = useSelector(state => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrievePosts());
    console.log(posts)
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value; 
    setSearchTitle(searchTitle);
  };

  const refreshData = () => {
    setCurrentPost(null);
    setCurrentIndex(-1);
  };

  const setActivePost = (post, index) => {
    setCurrentPost(post);
    setCurrentIndex(index);
  };

  const removeAllPosts = () => {
    dispatch(deleteAllPosts())
      .then(response => {
        console.log(response);
        refreshData();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    refreshData();
    const res = dispatch(findPostsByTitle(searchTitle));
    console.log(posts)
  };

  


  return (
    // <ThemeProvider theme={defaultTheme}>
    <>
        <Box sx={{ position: 'absolute',  top: '50%', left: '5vh', transform: 'translateY(-50%)'}}>
          <List>
            {hastashes.map((hastash, index) => (
              <ListItemButton
                selected={selectedIndex === index}
                onClick={(event) => handleListItemClick(event, index)}>

                <ListItemText 
                  primary={hastash.title}
                />
              </ListItemButton>
            ))}
          </List>  
        </Box>   

        <Container maxWidth="md" sx={{minHeight: '100vh'}}> 
            <Grid container spacing={5}>

              <Grid container spacing={0} sx={{ mt: 7 }}>
              <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}></Grid>
                <Grid container spacing={2}>
                  {posts && posts.map((post, index) => (
                    <Grid item xs={index % 5 === 0 ? 12 : 6} key={post.title}>
                      <MiniPost ratio = {index % 5 === 0 ? 2 : 1} sx={index % 5 === 0 ? { width: '100%', height: 280, borderRadius: '25px',overflow: 'hidden' } : { width: '100%', height: 280,borderRadius: '25px',overflow: 'hidden' }} post={post} />
                    </Grid>
                  ))}
                </Grid>

              </Grid>
            {/* </Grid>  */}
            </Grid>
            
        </Container>
      </>
    // </ThemeProvider>
  );
};


export default Blog;
