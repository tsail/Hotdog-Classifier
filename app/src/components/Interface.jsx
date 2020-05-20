import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import AppImage from '../img/app.png';
import ImageCard from './ImageCard';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      Project inspired by HBO series <Link href="https://www.hbo.com/silicon-valley">Silicon Valley</Link> (S4E4)
      <br/>
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${Image})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(4, 0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textFieldSpacing: {
    paddingBottom: '1em',
  },

}));

export default function SeefoodApp() {
  const classes = useStyles();

  const [textValue, setTextValue] = useState('')
  const [userRequest, setUserRequest] = useState({
    loading: false,
    img: AppImage,
    isHotdogText: 'Hotdog Classifier',
    probability: '',
  });

  return (
    <Container maxWidth="sm">
      <div className={classes.paper}>
        <ImageCard
          img_src={userRequest.img}
          classifierResponse={
            {
            'classification': userRequest.isHotdogText,
            'probability': userRequest.probability,
            }
          }
        />
      <Box mt={2}>
        <Typography variant="body2" color="textSecondary" component="p">
          <Link variant="body2" href="https://github.com/tsail">
            01 Full project source code
          </Link>
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          <Link href="https://github.com/tsail/Hotdog-Classifier/blob/master/model/PyTorch-Model.ipynb">
            02 Model source code
          </Link>
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          <Link href="https://itsmelarry.com">
            03 Personal
          </Link>
        </Typography>
      </Box>
    </div>
      <TextField
        variant="outlined"
        required
        fullWidth
        label="Image URL"
        placeholder=".jpg .jpeg or .png"
        onChange={e => setTextValue(e.target.value)}
        className={classes.textFieldSpacing}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        onClick={() => {
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({'url': textValue})
          };

          setUserRequest({
            loading: true,
            img: textValue,
            isHotdogText: 'hang on... crunching numbers...',
            probability: '',
          })

          fetch('http://54.152.229.99/', requestOptions)
            .then((response) => response.json())
            .then((data) => {
              setUserRequest({
                loading: false,
                img: textValue,
                isHotdogText: data.classification,
                probability: data.probability,
              });
            })
            .catch((error) => {
              setUserRequest({
                loading: false,
                img: AppImage,
                isHotdogText: 'Try again. We failed to find the image.',
                probability: '',
              });
            });
      }}
      >
      {userRequest.loading ? <CircularProgress size={25} color="secondary" /> : 'Classify'}
      </Button>
      <Box mt={8}>
        <Copyright />
      </Box>
</Container>

  );
}
