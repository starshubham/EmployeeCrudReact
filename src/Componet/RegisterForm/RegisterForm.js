import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useSpring, animated } from "@react-spring/web";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart, lineElementClasses } from "@mui/x-charts/LineChart";

const Fade = React.forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const fields = [
  { name: "fName", label: "First Name" },
  { name: "lName", label: "Last Name" },
  { name: "address", label: "Address" },
  { name: "emailId", label: "Email ID" },
  { name: "mobileNo", label: "Mobile No." },
  { name: "password", label: "Password" },
];
const RegisterForm = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [data, setData] = React.useState({
    fName: "",
    lName: "",
    address: "",
    emailId: "",
    mobileNo: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((v) => ({ ...v, [name]: value }));
  };
  const handleSubmit = () => {
    console.log(data);
  };

  const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
  const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
  const amtData = [2400, 2210, 0, 2000, 2181, 2500, 2100];
  const xLabels = [
    "Page A",
    "Page B",
    "Page C",
    "Page D",
    "Page E",
    "Page F",
    "Page G",
  ];
  return (
    <Grid container spacing={3} sx={{ p: 3 }}>
      <Grid item xs={12}>
        <Typography variant="h4">Create Employee</Typography>
      </Grid>
      <Grid item xs={12} textAlign="right">
        <Button onClick={handleOpen} variant="contained">
          Open modal
        </Button>
        <Modal
          aria-labelledby="spring-modal-title"
          aria-describedby="spring-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              TransitionComponent: Fade,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography id="spring-modal-title" variant="h6" component="h2">
                Hello
              </Typography>
              <Typography id="spring-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography>
            </Box>
          </Fade>
        </Modal>
      </Grid>
      <Grid container spacing={2}>
        {fields.map((field, index) => (
          <Grid item lg={3} md={4} sm={6} xs={12} key={index}>
            <TextField
              fullWidth
              id={`outlined-basic-${index}`}
              label={field.label}
              variant="outlined"
              name={field.name}
              value={data[field.name]}
              onChange={handleChange}
            />
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item lg={6} md={12} xs={12}>
          <Button fullWidth variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
        <Grid item lg={6} md={12} xs={12}>
          <Button fullWidth variant="contained" color="error">
            Cancel
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <BarChart
            series={[
              { data: [35, 44, 24, 34] },
              { data: [51, 6, 49, 30] },
              { data: [15, 25, 30, 50] },
              { data: [60, 50, 15, 25] },
            ]}
            height={430}
            xAxis={[{ data: ["Q1", "Q2", "Q3", "Q4"], scaleType: "band" }]}
            margin={{ top: 20, bottom: 30, left: 40, right: 10 }}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <LineChart
            height={450}
            series={[
              {
                data: uData,
                label: "uv",
                area: true,
                stack: "total",
                showMark: false,
              },
              {
                data: pData,
                label: "pv",
                area: true,
                stack: "total",
                showMark: false,
              },
              {
                data: amtData,
                label: "amt",
                area: true,
                stack: "total",
                showMark: false,
              },
            ]}
            background={"blue"}
            xAxis={[{ scaleType: "point", data: xLabels }]}
            sx={{
              [`& .${lineElementClasses.root}`]: {
                display: "none",
              },
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RegisterForm;
