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
import Header from '../blog/Header';
import MainFeaturedPost from '../blog/MainFeaturedPost';
import FeaturedPost from '../blog/FeaturedPost';
import Main from '../blog/Main';
import Sidebar from '../blog/Sidebar';
import Footer from '../blog/Footer';
import post1 from '../blog/blog-post.1.md';
import post2 from '../blog/blog-post.2.md';
import post3 from '../blog/blog-post.3.md';
import Box from '@mui/material/Box';
import QuiltedImageList from '../blog/imageList';
import MiniPost from '../post/post';
import { List, ListItem, ListItemText, ListItemButton } from "@mui/material";


import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";



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
];

const posts = [post1, post2, post3];

const hastashes = [
  { title: '#Bình Định', url: '#' },
  { title: '#Phú Yên', url: '#' },
  { title: '#Khánh Hoà', url: '#' },
  { title: '#Hastah1', url: '#' },
  { title: 'Hastah1', url: '#' },
  { title: 'Hastah1', url: '#' },
  { title: 'Hastah1', url: '#' },
  { title: 'Hastah1', url: '#' },
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

const Profile = (props) => {
  const {sections} = props;
  let navigate = useNavigate();

  const [content, setContent] = useState("");
  const { user: currentUser } = useSelector((state) => state.auth);

  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(_content)
        setContent(_content); 
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
        navigate("/login");
      }
    );
  }, []);

  


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

        <Container maxWidth="lg"> 
            <Grid container spacing={3}>
              <Grid item xs={6} sm={6}>
                <Yourself sx={{
                  width: '100%'
                }}/>
              </Grid>

              <Grid item xs={6} sm={6} sx={{
                height: '70vw',
                // overflowY: 'hidden',
                overflow: 'auto',
              }}>
                <Grid container spacing={3}>
                  {/* {featuredPosts.map((post) => (
                    <Grid item xs={12} sm={12} > 
                    <MiniPost  sx = {{width: '100%', height: 300}} key={post.title} post={post} />
                    </Grid>
                  ))} */}
                </Grid>
              </Grid>
            </Grid> 

            <QuiltedImageList />


            <MainFeaturedPost post={mainFeaturedPost} />
            <Grid container spacing={5} sx={{ mt: 10 }}>
              <Main title="From the firehose" posts={posts} />
              <Sidebar
                title={sidebar.title}
                description={sidebar.description}
                archives={sidebar.archives}
                social={sidebar.social}
              />
            </Grid >

            <ComplexGrid sx={{ mt: 10 }}/>
        </Container>
      </>
    // </ThemeProvider>
  );
};


export default Profile;
