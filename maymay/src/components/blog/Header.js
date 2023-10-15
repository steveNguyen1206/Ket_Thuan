import React, { useState, useEffect, useCallback } from "react";
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import {Box} from "@mui/material";
import { Link } from "react-router-dom";
import { colors } from '@mui/material';
import { logout } from "../../slices/auth";
import EventBus from "../../common/EventBus";
import { useDispatch, useSelector } from "react-redux";
import PostAddRoundedIcon from '@mui/icons-material/PostAddRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';


import {
  retrievePosts,
  findPostsByTitle,
} from "../../actions/posts";


function Header(props) {
  const { sections, title } = props;

  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
    } else {
      setShowModeratorBoard(false);
      setShowAdminBoard(false);
    }
      EventBus.on("logout", () => {
        logOut();
      });

      return () => {
        EventBus.remove("logout");
      };
    }, [currentUser, logOut]);

    const [currentPost, setCurrentPost] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchTitle, setSearchTitle] = useState("");
    const posts = useSelector(state => state.posts);


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

    const findByTitle = (title) => {
      refreshData();
      const res = dispatch(findPostsByTitle(title));
      console.log(res)
    };

    const onSerchEnter = (e) => {
      if(e.keyCode == 13){
        console.log('value', e.target.value);
        findByTitle(e.target.value)
   
     }
    }
  
    
    const Search = styled('div')(({ theme }) => ({
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    }));
    
    const SearchIconWrapper = styled('div')(({ theme }) => ({
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }));
    
    const StyledInputBase = styled(InputBase)(({ theme }) => ({
      color: 'inherit',
      '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          width: '12ch',
          '&:focus': {
            width: '20ch',
          },
        },
      },
    }));

  return (
    <React.Fragment>
      <Toolbar sx={{position: "relative"}} >
        {/* <Link to={"/blog"}>
          <img src={require("../../images/loogo.png")} alt="Logo" width="80px" height="80px" />
        </Link> */}


         <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          // sx={{ flex: 0 }}
        >
        <Link to={"/blog"}>
          <img src={require("../../images/loogo.png")} alt="Logo" width="auto" height="80px" />
        </Link>
        </Typography> 


        <Toolbar sx={{position: "absolute",  right: 0}}> 

          <Search >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              sx={{minWidth: '250px'}}
              placeholder="search inside yourself "
              inputProps={{ 'aria-label': 'search' }}
              onKeyUp={onSerchEnter}
            />
          </Search>

          {currentUser ? (
            <>  
              <Link to="/makepost">
                <PostAddRoundedIcon 
                sx={{fontSize: 30, width: '50px',  marginLeft: 2}}
                color="primary"
                />
              </Link>
              <Link to="/profile">
                <AccountCircleIcon 
                sx={{ marginInline: 2}}
                color="primary"
                />
              </Link>
                  <Button variant="outlined" size="small" href="/login" onClick={logOut}>
                    LogOut
                  </Button>        
            </>
        ) : (
            <>
            <Link to={"/login"} >
            <Button sx={{marginRight: 1}} variant="outlined" size="small">
              Log in
            </Button>
            </Link>

            <Link to={"/register"} className="nav-link">
              <Button variant="outlined" size="small" >
                Sign up
              </Button>
            </Link>
            </>
          ) }
        
        </Toolbar>


      </Toolbar>
      
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ padding: '15px 0', borderBottom: 0, borderColor: 'divider', maxWidth:'lg', margin:'auto', justifyContent: 'space-between', overflowX: 'auto' }}
      >
        {sections.map((section,index) => (
          
          <Link key={index} to={section.url} >
            <Button
              variant="contained"
              sx={{
                backgroundColor: section.color,
                color: section.textcolor,
                textTransform: "none",
                fontSize: 15,
              }}
            >
              {section.title}
            </Button>
          </Link>
        ))}
      </Toolbar>

    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
