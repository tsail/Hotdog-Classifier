import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '10%',
    minWidth: 425,

  },
  media: {
    paddingTop: '100%', // 16:9
  },
  cardHeaderStyle: {
    color: "white",
    boxShadow: "0 8px 40px -5px rgba(0,0,0,0.25)",
    minHeight: 80,
  }
}));

export default function ImageCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.root} variant="outlined">
      <CardHeader
        className={classes.cardHeaderStyle}
        style={
          props.classifierResponse.classification === "Hotdog" ? {backgroundColor: '#8FB9A8'} : {backgroundColor: '#475C7A '}}
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
