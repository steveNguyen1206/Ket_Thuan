import  React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { Container, Box } from '@mui/material';
import { Paper } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import {useParams} from 'react-router-dom';

import { createPost } from "../../actions/posts";
import postServices from '../../services/post.services';

import '../../index.css'

const products = [
  {
    name: 'Product 1',
    desc: 'A nice thing',
    price: '$9.99',
  },
  {
    name: 'Product 2',
    desc: 'Another thing',
    price: '$3.45',
  },
  {
    name: 'Product 3',
    desc: 'Something else',
    price: '$6.51',
  },
  {
    name: 'Product 4',
    desc: 'Best thing of all',
    price: '$14.11',
  },
  { name: 'Shipping', desc: '', price: 'Free' },
];

const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];

export default function ViewPost(props) {

  const { id } = useParams();
  const initialPostState = {
    id: null,
    title: "",
    postBody: "",
    posted_date_formed: "",
    hashtag: "",
  };

  const [currentPost, setCurrentPost] = useState(initialPostState);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const getPost = id => {
    postServices.get(id)
      .then(response => {
        setCurrentPost(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getPost(id);
  }, [id]);

  return (
    <React.Fragment>
      <Container sx={{textAlign: 'center'}}>
        <Paper variant="outlined" sx={{ 
            my: { xs: 3, md: 6 }, 
            p: { xs: 2, md: 3 }, 
            borderRadius: 4,  width: '100%', padding: 20}}>

          <Typography variant="h4" gutterBottom>
            {currentPost.title}
          </Typography>

          <List sx={{ width: '100%',  display: 'flex', justifyContent: 'center' }}>
            {currentPost.hashtag.split(",").map((ht, index) => (
                <ListItemText primary={'#'+ht}/>
            ))} 
          </List>

            {currentPost.user && (
              <Typography variant="h6" gutterBottom>
                @{currentPost.user.username} at {currentPost.posted_date_formed}
              </Typography>
            )}

            {currentPost.url && (
              <img id="blah" src={currentPost.url} alt="post_image" className='img-display'/>
            )}

            <Box sx={{ marginTop: 5}}>
              <Typography variant="body" gutterBottom>
                 {currentPost.postBody}
              </Typography>
            </Box>

          {/* <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Shipping
              </Typography>
              <Typography gutterBottom>John Smith</Typography>
              <Typography gutterBottom>{addresses.join(', ')}</Typography>
            </Grid>
            <Grid item container direction="column" xs={12} sm={6}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Payment details
              </Typography>
              <Grid container>
                {payments.map((payment) => (
                  <React.Fragment key={payment.name}>
                    <Grid item xs={6}>
                      <Typography gutterBottom>{payment.name}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography gutterBottom>{payment.detail}</Typography>
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>
            </Grid>
          </Grid> */}


        </Paper>
      </Container>
    </React.Fragment>
  );
}