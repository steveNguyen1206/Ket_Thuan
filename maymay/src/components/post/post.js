import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import { StyledEngineProvider } from '@mui/material/styles';
import CustomizedSlider from '../slider/hearSlider';
import { Box, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';
import Face2RoundedIcon from '@mui/icons-material/Face2Rounded';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(90deg)' : 'rotate(-90deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function MiniPost(props) {
    const { post } = props;
    const { sx, ratio } = props;

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    const a = {
        ...sx,
        display: 'flex',
        alignItems: 'center', justifyContent: 'space-around'
    };

  return (

    <Card sx={a}>
          <StyledEngineProvider injectFirst>
        </StyledEngineProvider>
      <hearSlider />

      <CardMedia
        sx={{ height: '90%', aspectRatio: ratio, borderRadius: 5, marginLeft: 1, boxShadow: '7px 10px 25px 0 rgba( 0, 0, 0, .5)'}}
        image={post.url}
      />
      <CardContent sx={{flex:1, padding: 4}}>
          {post.user && (
            <Box sx={{ justifyContent: 'space-around'}}>
              <Avatar  sx={{ width:  80, height: 80 }} aria-label="avatar"
                alt={post.user.username}
                src="/static/images/avatar/1.jpg">
              </Avatar>
              <Box>
                <Typography gutterBottom variant="h5" component="div">
                  {post.user.username}
                </Typography>
                <Typography variant="h6">
                  {post.title}
                </Typography>
              </Box>
            </Box>
          )}
          
        

        <CardActions sx={{width: '100%', display:'flex', justifyContent: 'right'}}>

        <Typography sx={{ color: '#22C3F0', fontStyle: 'italic'}}>
          {'#'+post.hashtag}
        </Typography>

        <Link to={'/post/' + post.id}>
          <Face2RoundedIcon sx={{marginLeft: 2}}/>
        </Link>
        </CardActions>
        <CustomizedSlider sx={{width: '100%'}}/>
      </CardContent>

    </Card>
  );
}