import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ImageCard from './ImageCard'
import Image from '../img/img01.png';
import AppImage from '../img/app.png';
import Link from '@material-ui/core/Link';
import CircularProgress from '@material-ui/core/CircularProgress';


function Footnotes() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {' Project inspired by HBO series Silicon Valley'}
      <br/>
      <Link color="inherit" href="https://itsmelarry.com">
        https://itsmelarry.com
      </Link>
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
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
    <Grid container component="main" className={classes.root}>
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
            <Typography variant="h2">SEEFOOD APP</Typography>
            <Box mt={5} />
            <ImageCard
              img_src={userRequest.img}
              classifierResponse={{
                'classification': userRequest.isHotdogText,
                'probability': userRequest.probability,
              }}
              />
            <Box mt={2} />
            Trained on MobileNetV2 architecture. Recorded ~90% accuracy. 
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              autoFocus
              label="Image URL"
              onChange={e => setTextValue(e.target.value)}
            />
          <Box mt={1} />
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
                  isHotdogText: 'hang on... banging out a couple of matrices together...',
                  probability: '',
                })
                console.log(JSON.stringify({'url': textValue}));
                console.log(textValue);
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
                    console.log(error);
                    console.log(userRequest);
                    setUserRequest({
                      loading: false,
                      img: AppImage,
                      isHotdogText: 'Unable to read image from source provided. Try another image!',
                      probability: '',
                    });
                  });
              }}
            >
              {userRequest.loading ? <CircularProgress size={25} color="secondary" /> : 'Classify'}
            </Button>
        </div>
        <Box mt={5}>
          <Footnotes />
        </Box>
      </Grid>
    </Grid>
  );
}
