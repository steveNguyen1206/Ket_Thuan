import * as React from 'react';
import PropTypes from 'prop-types';
import Slider, { SliderThumb } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import FavoriteIcon from '@mui/icons-material/Favorite';

function ValueLabelComponent(props) {
  const { children, value } = props;

  return (
    <Tooltip enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  value: PropTypes.number.isRequired,
};


const AirbnbSlider = styled(Slider)(({ theme }) => ({
  color: '#77dd77',
  height: 3,
  padding: '13px 0',
  '& .MuiSlider-thumb': {
    height: 36,
    width: 36,
    backgroundColor: '#ffff',
    textAlign: 'center',
    boxShadow: 'none',
    border: 'none',
    // border: '3px solid currentColor',,
    '& .pixelized--heart': {
      display: 'block',
      backgroundColor: null,
      width: '10px',
      height: '10px',
      boxShadow: "10px 00px #f6bfc6, 20px 00px #f6bfc6, 40px 00px #f6bfc6, 50px 00px #f6bfc6, 00px 10px #f6bfc6, 10px 10px #f6bfc6, 20px 10px #f6bfc6, 30px 10px #f6bfc6, 40px 10px #f6bfc6, 50px 10px #f6bfc6, 60px 10px #f6bfc6, 00px 20px #f6bfc6,10px 20px #f6bfc6,20px 20px #f6bfc6,30px 20px #f6bfc6,40px 20px #f6bfc6,50px 20px #f6bfc6,60px 20px #f6bfc6, 10px 30px #f6bfc6,20px 30px #f6bfc6,30px 30px #f6bfc6,40px 30px #f6bfc6,50px 30px #f6bfc6, 20px 40px #f6bfc6,30px 40px #f6bfc6,40px 40px #f6bfc6, 30px 50px #f6bfc6",
      transform: 'translate(-14px, -12px) scale(0.5)',
  
    },

    '&.pixel-block': {
      position: 'absolute',
      width: '60px',
      height: '50px',
    }
  },
  '& .MuiSlider-track': {
    height: 7,

  },
  '& .MuiSlider-rail': {
    color: theme.palette.mode === 'dark' ? '#ff6666' : '#ff6666',
    opacity: theme.palette.mode === 'dark' ? undefined : 1,
    height: 7,
  },
}));

function AirbnbThumbComponent(props) {
  const { children,  ...other } = props;
  return (
    <SliderThumb {...other}>
      {children}
      {/* <span className="airbnb-bar" />
      <span className="airbnb-bar" />
      <span className="airbnb-bar" /> */}
      {/* <FavoriteIcon className='heart-thumb'/> */}
      <div className="pixel-block">
        <div className="pixelized--heart">
        </div>
      </div>
    </SliderThumb>
  );
}

AirbnbThumbComponent.propTypes = {
  children: PropTypes.node,
};

export default function CustomizedSlider(props) {
  const {sx} = props;

  return (
    <Box sx={sx}>
      <AirbnbSlider
        slots={{ thumb: AirbnbThumbComponent }}
        getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
        defaultValue={20}
      />
    </Box>
  );
}
