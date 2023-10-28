import {DeleteOutline} from "@mui/icons-material";
import {Button} from "@mui/material";

export const DeleteButton = ({ action }) => (
    <Button
        variant="contained"
        color="error"
        type="button"
        onClick={action}
    >
        <DeleteOutline color="action" />
    </Button>

)