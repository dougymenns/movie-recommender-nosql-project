import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Appbar from "./appbar";
// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {"Copyright © "}
//       <Link color="inherit" href="https://material-ui.com/">
//         Your Website
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     marginTop: theme.spacing(8),
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main,
//   },
//   form: {
//     width: "100%", // Fix IE 11 issue.
//     marginTop: theme.spacing(1),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
// }));

// export default function Profile() {
//   const history = useHistory();

//   const classes = useStyles();
//   const [name, setName] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     axios
//       .post(`http://localhost:3000/add-users`, { name: name, password: password})
//       .then((res) => {
//         console.log(res);
//         console.log(res.data);
//         if (res.data.name == name && res.data.password == password) {
//           swal("Welcome!🎉 ", "Log In & Rank A Movie!", "success");
//           return setTimeout(() => {
//             history.push("/login");
//           }, 3000);
//         } else {
//           swal("Sorry Try Again ", "Invalid credentials", "error");
//           return setTimeout(() => {
//             history.push("/");
//           }, 3000);
//         }
//       });
//   };
//   console.log(name)
//   return (
//     <Container component="main" maxWidth="xs">
//       <CssBaseline />
//       <div className={classes.paper}>
//         <Avatar className={classes.avatar}>
//           <LockOutlinedIcon />
//         </Avatar>
//         <Typography component="h1" variant="h5">
//           Register
//         </Typography>
//         <form className={classes.form} noValidate>
//           <TextField
//             variant="outlined"
//             margin="normal"
//             required
//             fullWidth
//             id="name"
//             label="Name"
//             name="name"
//             autoComplete="name"
//             autoFocus
//             onChange={(e) => setName(e.target.value)}
//             autoFocus
//           />
//           <TextField
//             variant="outlined"
//             margin="normal"
//             required
//             fullWidth
//             name="password"
//             label="Password"
//             type="password"
//             id="password"
//             autoComplete="current-password"
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <FormControlLabel
//             control={<Checkbox value="remember" color="primary" />}
//             label="Remember me"
//           />
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             color="primary"
//             className={classes.submit}
//             onClick={handleSubmit}
//           >
//             Sign In
//           </Button>
//           <Grid container>
//             <Grid item xs>
//               <Link href="#" variant="body2">
//                 Forgot password?
//               </Link>
//             </Grid>
//             <Grid item>
//               <Link href="#" variant="body2">
//                 {"Don't have an account? Sign Up"}
//               </Link>
//             </Grid>
//           </Grid>
//         </form>
//       </div>
//       <Box mt={8}>
//         <Copyright />
//       </Box>
//     </Container>
//   );
// }

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ["Shipping address", "Payment details", "Review your order"];

export default function Checkout() {
  const history = useHistory();

  const classes = useStyles();
  const [name, setName] = useState(localStorage.getItem("Username"));
  const [password, setPassword] = useState(localStorage.getItem("Username"));
  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(`http://localhost:3000/add-users`, {
        name: name,
        password: password,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        if (res.data.name == name && res.data.password == password) {
          swal(
            "Hurray!🎉 ",
            "Changes Updated Successfully! Please login again to verify",
            "success"
          );
          return setTimeout(() => {
            history.push("/login");
          }, 3000);
        } else {
          swal("Sorry Try Again ", "Invalid credentials", "error");
          return setTimeout(() => {
            history.push("/");
          }, 3000);
        }
      });
  };

  const handleDelete = (event) => {
    event.preventDefault();

    axios
      .post(`http://localhost:3000/delete-user`, {
        name: name,
        password: password,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        if (
          name == localStorage.getItem("Username") &&
          password == localStorage.getItem("Password")
        ) {
          swal(
            "Opps!😔 ",
            "We Hate To See You Go, Come Back Soon...",
            "success"
          );
          return setTimeout(() => {
            history.push("/");
          }, 3000);
        } else {
          swal("Sorry Try Again ", "Invalid credentials", "error");
          return setTimeout(() => {
            history.push("/");
          }, 3000);
        }
      });
  };
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Appbar />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h4" variant="h5" align="center">
            Profile Settings
          </Typography>

          <React.Fragment>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                value={name}
                name="name"
                autoFocus
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />

              <Grid container>
                <Grid item xs>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleSubmit}
                  >
                    Update
                  </Button>
                </Grid>
                <Grid item xs>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                    onClick={handleDelete}
                  >
                    Delete Account
                  </Button>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs>
                  <Link href="/movies" variant="body2">
                    Go Back
                  </Link>
                </Grid>
                <Grid item>
                  {/* <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link> */}
                </Grid>
              </Grid>
            </form>
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}
