import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 400,
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '90%', // 16:9
  },
}));

export default function ImageCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.root} variant="outlined">
      <CardHeader
        style={
          props.classifierResponse.classification === "Hotdog" ? {backgroundColor: '#00FF00'} : {backgroundColor: 'red'}}
        title={props.classifierResponse.classification}
        titleTypographyProps={{variant:'h4', align: 'center' }}
      />
      <CardMedia
        className={classes.media}
        image={props.img_src.length > 0 ? props.img_src : props.img}
      />
    </Card>
  );
}
