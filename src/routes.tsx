import { createHashRouter } from "react-router-dom";
import InsertKeysPage from "./pages/insert-keys";
import BackupPage from "./pages/backup";

const router = createHashRouter([
  {
    path: "/",
    element: <InsertKeysPage />,
  },
  {
    path: "/backup",
    element: <BackupPage />,
  },
]);

export default router;
