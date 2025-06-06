import AppPage from "../Components/AppPage";
import AuthorizeView from "../Components/AuthorizeView";
import AccountInformation from "../Components/Account/AccountInformation";
import AccountDelete from "../Components/Account/AccountDelete";
import { Divider } from "@mui/material";

export default function Account() {
  return (
    <AuthorizeView>
      <AppPage>
        <AccountInformation />
        <Divider sx={{ my: 4 }} />
        <AccountDelete />
      </AppPage>
    </AuthorizeView>
  );
}
