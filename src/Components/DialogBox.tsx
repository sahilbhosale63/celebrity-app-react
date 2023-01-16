import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

export default function DialogBox(props: any) {
  const { isDialogOpen, handleDeleteBtn, deleteCelebrity, item } = props;

  return (
    <div>
      <Dialog
        open={isDialogOpen}
        onClose={handleDeleteBtn}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteBtn}>Cancel</Button>
          <Button onClick={() => deleteCelebrity(item)} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
