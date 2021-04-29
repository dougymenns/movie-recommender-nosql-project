import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  table: {
    minWidth: 700,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CustomizedTables() {
  const classes = useStyles();
  const [rank, setRank] = React.useState('');
  const [data, setData] = useState([]);
  const [comment, setComment] = useState('');
  const [finalData, setfinalData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [popup, setPopUp] = React.useState({
    id: null,
    name: null,
    comments: [],
    year: null,
    description: null,
  });

  useEffect(async () => {
    const result = await axios("http://localhost:3000/movies");

    setData(result.data.res);
  }, []);

  const rows = data;
  const handleChange = (event) => {
    setComment(event.target.value);
    console.log(comment)
  };
  
  const handleSubmit = async (evt) => {
      evt.preventDefault();
    // setfinalData([
    //   ...getcomments,
    //   getcomments[element].comments.push({ user: comment, rank: rank }),
    // ]);
    axios
      .post("http://localhost:3000/movie/add-comment", { list: finalData })
      .then(function (response) {
        console.log(response);
      });
    console.log("fin", finalData);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleView = async (details) => {
    setOpen(true);
    setPopUp({
      id: details.id,
      name: details.name,
      comments: details.comments,
      year: details.year,
      description: details.description,
    });
    let getcomments = [...data];
    const element = getcomments.findIndex((elemento) => elemento.id === popup.id);
        console.log(getcomments.findIndex((elemento) => elemento.id === popup.id));
  };
  console.log(popup.id)

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Movie</StyledTableCell>
              <StyledTableCell align="right">Description</StyledTableCell>
              <StyledTableCell align="right">Year</StyledTableCell>
              <StyledTableCell align="right">Director</StyledTableCell>
              <StyledTableCell align="right">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.description}
                </StyledTableCell>
                <StyledTableCell align="right">{row.year}</StyledTableCell>
                <StyledTableCell align="right">{row.director}</StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleView(row)}
                  >
                    Rank/Comment
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {popup.name}
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={6} sm={2}>
              {/* <Paper className={classes.paper}>xs=6 sm=3</Paper> */}
            </Grid>
            <Grid item xs={6} sm={8}>
              <br />
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    component="picture"
                    alt="Contemplative Reptile"
                    image={popup.image}
                    title="Contemplative Reptile"
                    src="https://picsum.photos/200"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {popup.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {popup.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              <br />
              <br />
              <Typography>Comments</Typography>

              <Paper className={classes.paper}>
                <List>
                  {popup.comments.map((details) => (
                    <>
                      <ListItem button>
                        <ListItemText
                          primary={details.user}
                          secondary={details.comment}
                        />
                      </ListItem>
                      <Divider />
                    </>
                  ))}
                </List>
                <Grid container>
                  <Grid item xs={6} sm={5}>
                    <TextField
                      id="filled-basic"
                      label="Comment"
                      variant="filled"
                      name="comment"
                      value={comment}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <InputLabel id="demo-simple-select-outlined-label">
                        Rank
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={rank}
                        onChange={handleChange}
                        label="Rank"
                        name="rank"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Button
                      variant="contained"
                      onClick={handleSubmit}
                      fullWidth="true"
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            <Grid item xs={6} sm={2}>
              {/* <Paper className={classes.paper}>xs=6 sm=3</Paper> */}
            </Grid>
          </Grid>
        </div>
      </Dialog>
    </>
  );
}
