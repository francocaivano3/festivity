import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography  } from '@mui/material';
const ConfirmDialog = ({open, onClose, onConfirm, message, dark}) => {


    return (
      <Dialog
        open={open}
        onClose={onClose}
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "10px",
            padding: "20px",
            backgroundColor: "#5d15f9",
            color: "white",
            boxShadow: 24,
          },
        }}
      >
        <DialogTitle>Confirmación</DialogTitle>
        <DialogContent>
          <p>{message}</p>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onClose}
            sx={{
              color: "white",
              borderColor: "#6366f1",
              "&:hover": {
                backgroundColor: "rgba(99, 102, 241, 0.1)",
              },
            }}
            variant="outlined"
          >
            Cancelar
          </Button>
          <Button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            sx={{
              backgroundColor: "#6366f1",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#224ed9",
              },
            }}
            variant="contained"
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    );
}

export default ConfirmDialog;