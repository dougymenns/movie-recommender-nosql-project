import React, { useEffect, useState, useCallback } from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import MaterialTable from "material-table"
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
import Appbar from "./appbar";

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
  const [state, setState] = useState([]);
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);
  const [rank, setRank] = React.useState("");
  const [data, setData] = useState([]);
  const [dataa, setDataa] = useState([]);
  const [comment, setComment] = useState("");
  const [finalData, setfinalData] = useState();
  const [open, setOpen] = React.useState(false);
  const [searchResults, setSearchResults]  = React.useState({
    id: null,
    name: null,
    comments: [],
    year: null,
    description: null,
  });
  const [popup, setPopUp] = React.useState({
    id: null,
    name: null,
    comments: [],
    year: null,
    description: null,
    rank: null
  });
  useEffect(async () => {
    const result = await axios("http://localhost:3000/movies");
    setData(result.data.res);
  }, []);
// console.log(data.map((dd)=>{return dd.comments}))
  const rows = data;
  const getrank = data.map((row)=>{return row.comments})
  const popsize = popup.comments.length
  console.log(popsize)

  const searchmovie = searchResults;
  console.log(searchmovie)
  const handleClickOpen = () => {
    setOpen(true);
  };
  //   const element = data.findIndex(element =>{ return (element.id == 1)})
  //   let final  = [...data]
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
  };
  const handleSearchView = async (details) => {
    setOpen(true);
    setPopUp({
      id: details.id,
      name: details.name,
      comments: details.comments,
      year: details.year,
      description: details.description,
    });
  };
  let getcomments = [...data];
  const element = data.findIndex((element) => {
    return element.id == popup.id;
  });
  let getcomment = getcomments[element];
  const handleSearch = async (evt) => {
    evt.preventDefault();
    setSearching(true)
    const result = data.filter((word) => word.name.includes(search));
    setSearchResults(result)
    console.log('search',result)
  };
  // const handleChange = async () => {
  //   const hi = data.find((x) => x.id === element);
  //   const no = hi.comments.concat({
  //     user: localStorage.getItem("Username"),
  //     comment: comment,
  //     rank: rank,
  //   });
  //   data[element].comments = no;
  //   console.log("hi", data);
  // let getcomments = [...data];
  // const element = data.findIndex((element) => {
  //   return element.id == popup.id;
  // });
  // let getcomment = getcomments[element];
  // // getcomment.concat({user4: comment, rank: rank })
  // // getcomment.comments.push({ user4: comment, rank: rank });
  // console.log("element", getcomment);
  // // let ei = setData({...getcomments,getcomments[element].comments.concat({ user4: comment, rank: rank })});
  // // let yesu = getcomment.concat(getcomments);
  // await setDataa('yes');
  //     console.log('getcomment',state);
  // };

  const handleSubmit = async (evt) => {
   
    // handleChange();
    evt.preventDefault();
    const hi = data.find((x) => x.id === element);
    const score = rank + hi.rank;
     hi["rank"] = score
    console.log(hi)
    const no = hi.comments.concat({
      user: localStorage.getItem("Username"),
      comment: comment,
      rank: rank/(popsize),
    });
    data[element].comments = no;
    setPopUp(data[element]);
    await axios
      .post("http://localhost:3000/movie/add-comment", { list: data })
      .then(function (response) {
        console.log(response);
      });
  };

  return (
    <>
      <Appbar />
      <form onSubmit={handleSearch}>
        <TextField
        className={classes.margin}
        id="input-with-icon-textfield"
        // label="TextField"
        name="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      </form>
      
      {searching ? <TableContainer component={Paper}>
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
              <StyledTableRow key={searchmovie.name}>
                <StyledTableCell component="th" scope="row">
                  {searchmovie[0].name}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {searchmovie[0].description}
                </StyledTableCell>
                <StyledTableCell align="right">{searchmovie[0].year}</StyledTableCell>
                <StyledTableCell align="right">{searchmovie[0].director}</StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleView(searchmovie)}
                  >
                    Rank/Comment
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer> : <><MaterialTable
      title="Simple Action Preview"
      columns={[
        { title: 'Name', field: 'name' },
        { title: 'Description', field: 'description' },
        { title: 'Year', field: 'year', type: 'numeric' },
        {
          title: 'Rank',
          field: 'rank',
        },
      ]}
      data={data}        
      actions={[
        {
          icon: 'save',
          tooltip: 'Save User',
          onClick: (event, rowData) => handleView(rowData)
        }
      ]}
    /></>
      
      }
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
                          secondary={<div>{details.user} <p style={{color:"blue"}}>rank: {details.rank}</p></div>}
                          primary={details.comment} 
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
                      onChange={(e) => setComment(e.target.value)}
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
                        name="rank"
                        onChange={(e) => {
                          setRank(e.target.value);
                        }}
                        label="Rank"
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
                      onClick={(e) => handleSubmit(e)}
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
