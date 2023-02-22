import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteClass } from "../../redux/class/class";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Menu,
  MenuItem,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Update from "./Update";

function ClassRow(props) {
  const { item } = props;
  // redux
  const dispatch = useDispatch();
  const deleteClassroom = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/ClassRoom/${id}`);
      dispatch(deleteClass(id));
      setOpenDelete(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  // update form
  const [openUpdate, setOpenUpdate] = useState(false);

  // delete
  const [openDelete, setOpenDelete] = useState(false);
  const [openWarning, setWarning] = useState(false);
  const saveDelete = (data) => {
    data.totalStudent === 0 ? deleteClassroom(data.id) : setWarning(true);
  };

  // menu item
  const [openMenu, setOpenMenu] = useState(null);
  const open = Boolean(openMenu);
  const handleClick = (event) => {
    setOpenMenu(event.currentTarget);
  };
  const handleClose = () => {
    setOpenMenu(null);
  };
  const onUpdate = () => {
    setOpenMenu(null);
    setOpenUpdate(true);
  };
  const onDelete = () => {
    setOpenMenu(null);
    setOpenDelete(true);
  };
  return (
    <TableRow
      key={item.className}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {item.className}
      </TableCell>
      <TableCell align="right">
        {item.shiftSession === 1
          ? "Morning"
          : item.shiftSession === 2
          ? "Afternoon"
          : "Evening"}
      </TableCell>
      <TableCell align="right">{item.totalStudent}</TableCell>
      <TableCell align="right" sx={{ display: "flex", gap: 1 }}>
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          variant="contained"
          size="small"
          startIcon={<MoreVertIcon />}
        >
          Action
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={openMenu}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem
            onClick={() => onUpdate()}
            dense={false}
            sx={{ color: "green" }}
          >
            <EditIcon
              fontSize="small"
              color="success"
              sx={{ marginRight: 1 }}
            />
            Update
          </MenuItem>
          <MenuItem onClick={() => onDelete()} sx={{ color: "red" }}>
            <DeleteIcon
              fontSize="small"
              color="error"
              sx={{ marginRight: 1 }}
            />
            Delete
          </MenuItem>
        </Menu>
      </TableCell>
      <Dialog fullWidth={true} maxWidth="sm" open={openUpdate}>
        <Update item={{ ...item }} setOpenUpdate={setOpenUpdate} />
      </Dialog>
      {/* delete */}
      <Dialog
        open={openDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography
            variant="h6"
            component="div"
            // sx={{ fontWeight: "600", color: "#3C21C6" }}
          >
            Confirm ?
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure want to delete classroom {item.className}?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ padding: "0px 20px 16px 16px" }}>
          <Button
            onClick={() => setOpenDelete(false)}
            color="inherit"
            size="small"
            variant="contained"
          >
            Cancel
          </Button>
          <Button
            onClick={() => saveDelete(item)}
            color="error"
            size="small"
            variant="contained"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/* warning */}
      <Dialog
        open={openWarning}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography variant="h6" component="div" color="success">
            Warning ?
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Can not delete this class. There are students in this class.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ padding: "0px 20px 16px 16px" }}>
          <Button
            onClick={() => setWarning(false)}
            color="primary"
            size="small"
            variant="contained"
            autoFocus
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </TableRow>
  );
}
export default ClassRow;
