import {
  InputAdornment,
  TextField,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
  Grid,
  Paper,
  Box,
} from "@mui/material";
import React from "react";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import PasswordOutlinedIcon from "@mui/icons-material/PasswordOutlined";
import yarlVibelogo from "../assets/images/IMG-20240427-WA0001_prev_ui.png";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import { amber } from "@mui/material/colors";
import { login } from "../services/loginPageApi";

function LoginForm() {
  const lightTheme = createTheme({
    palette: {
      mode: "light",
      background: {
        default: "#fef7dd", // Light mode background color
      },
      primary: {
        main: amber[400],
      },
    },
  });
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      background: {
        default: "#1E2A31", // Dark mode background color
      },
      primary: {
        main: amber[400],
      },
    },
  });
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const theme = isDarkMode ? darkTheme : lightTheme;

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    console.log("change");
  };

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [remember, setRemember] = React.useState(false);
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://res.cloudinary.com/sagacity/image/upload/c_crop,h_2400,w_3600,x_0,y_0/c_limit,dpr_auto,f_auto,fl_lossy,q_80,w_1080/The_Nash_weyxvb.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
          }}
        >
          <Box
            sx={{
              my: 2,
              mx: 2,
              display: "flex",
              justifyContent: "flex-end", // Align to the right
            }}
          >
            <Switch
              checked={isDarkMode}
              onChange={toggleDarkMode}
              color="primary"
              inputProps={{ "aria-label": "toggle button" }}
              className="items-left"
            />
          </Box>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h3" className="font-bold mb-4">
              Welcome
            </Typography>
            <div className="flex items-center mb-8">
              <img
                src={yarlVibelogo}
                alt="Yarl Vibe Logo"
                className="h-20 mr-10"
              />
              <Typography component="h1" variant="h4" className="mt-4 mb-2">
                Yarl Vibe
              </Typography>
            </div>
            <div>
              <TextField
                id="input-with-icon-id"
                label={
                  <Typography
                    component="span"
                    sx={{
                      color: theme.palette.text.primary,
                      fontWeight: "bold",
                      fontFamily: "monospace",
                      fontSize: "1.25rem",
                    }}
                  >
                    Id
                  </Typography>
                }
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BadgeOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
                className="mb-8"
                placeholder="########"
                sx={{
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "Orange",
                  },
                }}
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  // console.log(inputId);
                }}
              />
              <TextField
                id="input-with-icon-password"
                label={
                  <Typography
                    component="span"
                    sx={{
                      color: theme.palette.text.primary,
                      fontWeight: "bold",
                      fontFamily: "monospace",
                      fontSize: "1.25rem",
                    }}
                  >
                    Password
                  </Typography>
                }
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PasswordOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
                className="mb-none"
                placeholder="********"
                type="password"
                sx={{
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "Orange", // Change underline color to red
                  },
                }}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  // console.log(inputPassword);
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={remember}
                    onChange={(e) => {
                      setRemember(e.target.checked);
                      // console.log(remember);
                    }}
                    value="remember"
                    color="primary"
                  />
                }
                label="Remember me"
              />
              <Button
                variant="contained"
                fullWidth
                sx={{
                  mt: 3,
                  fontWeight: "bold",
                  borderRadius: 1,
                  padding: "12px 0",
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.text.primary,
                  "&:hover": {
                    backgroundColor: amber[300],
                  },
                }}
                onClick={handleLogin}
              >
                Login
              </Button>
            </div>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );

  async function handleLogin(e) {
    e.preventDefault();
    // login Data
     const loginData = {
      username,
      password,
      remember,
    };
    console.log(loginData);

    try {
      const userData = await login(loginData);
      console.log("Successfully login", userData);
    } catch (err) {
      console.log("login failed: ", err);
    }
  }
}

export default LoginForm;
