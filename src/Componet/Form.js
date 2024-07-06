import { Button, Grid, TextField, Typography, colors } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "../Componet/Table.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    salary: "",
  });
  const [tableData, setTableData] = useState("");
  const [open, setOpen] = React.useState(false);
  const [viewData, setViewData] = React.useState("");
  const [isEdit, setIsEdit] = React.useState(false);

  const handleOpen = (data) => {
    setViewData(data);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((v) => ({ ...v, [name]: value }));
  };

  // For Creating Data
  const handleSubmit = async () => {
    const payload = {
      id: !isEdit ? 0 : formData.id,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      salary: formData.salary,
    };
    try {
      var res;
      isEdit
        ? (res = await axios.put(
            "https://localhost:7235/api/employee/update",
            payload
          ))
        : (res = await axios.post(
            "https://localhost:7235/api/employee/create",
            payload
          ));
      setFormData(res.data);
      setIsEdit(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        salary: "",
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  // For Getting Data
  const GetData = async () => {
    try {
      const res = await axios.get(`https://localhost:7235/api/employee/getAll`);
      setTableData(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  // For binding Data on Edit Icon clicks
  const handleUpdate = (data) => {
    setIsEdit(true);
    setFormData({
      id: data.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      salary: data.salary,
    });
  };

  // for Delete Data
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://localhost:7235/api/employee/delete/${id}`);
      GetData();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCancel = () => {
    setIsEdit(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      salary: "",
    });
  };

  useEffect(() => {
    GetData();
  }, [formData]);
  return (
    <Grid sx={{ p: 5 }}>
      <Typography variant="h4">
        {!isEdit ? "Createing Employee Form" : "Update Employee Form"}
      </Typography>
      <Grid container spacing={2}>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <TextField
            fullWidth
            label="Eamil ID"
            variant="outlined"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <TextField
            fullWidth
            label="Phone Number"
            variant="outlined"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </Grid>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <TextField
            fullWidth
            label="Salary"
            variant="outlined"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
          />
        </Grid>
        <Grid item lg={3} md={4} sm={6} xs={12} spacing={5}>
          <Button variant="contained" color="success" onClick={handleSubmit}>
            {!isEdit ? "Submit" : "Update"}
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleCancel}
            sx={{ ml: 1 }}
          >
            Cencel
          </Button>
        </Grid>
      </Grid>

      <table>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone Number</th>
          <th>Salary</th>
          <th>Action</th>
        </tr>
        {tableData &&
          tableData?.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>{item.salary}</td>
              <td>
                <Button onClick={() => handleOpen(item)}>View</Button>
                <button onClick={() => handleUpdate(item)}>Update</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
      </table>

      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              color={"red"}
            >
              {viewData.name}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Grid>
                <Typography variant="p" color={"gray"}>
                  Employee ID
                </Typography>
                :<span style={{ color: "blue" }}> {viewData.id}</span>
              </Grid>
              <Grid>
                <Typography variant="p" color={"gray"}>
                  Name
                </Typography>
                :<span style={{ color: "blue" }}> {viewData.name}</span>
              </Grid>
              <Grid>
                <Typography variant="p" color={"gray"}>
                  Email ID
                </Typography>
                :<span style={{ color: "blue" }}> {viewData.email}</span>
              </Grid>
              <Grid>
                <Typography variant="p" color={"gray"}>
                  Phone Number
                </Typography>
                :<span style={{ color: "blue" }}> {viewData.phone}</span>
              </Grid>
              <Grid>
                <Typography variant="p" color={"gray"}>
                  Salary
                </Typography>
                :<span style={{ color: "blue" }}> {viewData.salary}</span>
              </Grid>
            </Typography>
          </Box>
        </Modal>
      </div>
    </Grid>
  );
};

export default Form;
