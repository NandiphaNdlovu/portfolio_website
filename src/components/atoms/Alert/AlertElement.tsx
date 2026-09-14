import { CheckIcon } from "@heroicons/react/24/outline";
import { Alert } from "@mui/material";

export default function AlertElement() {
  return (
    <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
      Here is a gentle confirmation that your action was successful.
    </Alert>
  );
}
