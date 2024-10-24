import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";

const Root = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100vh",
  overflow: "hidden",
}));

const BodyWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  width: "100%",
  height: "100%",
  overflow: "hidden",
  background: "rgb(49, 49, 49)",
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  overflow: "auto",
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,

  background: "linear-gradient(rgb(49, 49, 49), rgb(20, 20, 20))",
}));

const MainLayout = () => {
  return (
    <Root>
      <Header />
      <BodyWrapper>
        <ContentWrapper>
          <Outlet />
        </ContentWrapper>
      </BodyWrapper>
    </Root>
  );
};

export default MainLayout;
