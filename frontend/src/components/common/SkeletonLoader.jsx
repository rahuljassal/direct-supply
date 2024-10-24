import * as React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export default function SkeletonArray(props) {
  let vh =
    Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    ) - 150;

  const skeletonArray = Array.from(
    { length: Math.round(vh / props.height) },
    () => ""
  );
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        bottom: "-25px",
        height: "90vh",
      }}
    >
      {skeletonArray.map((_, i) => (
        <Box sx={{ display: "flex", width: "100%" }} key={i}>
          <Skeleton
            animation="wave"
            width={"15%"}
            height={props.height}
            sx={{ marginRight: 1 }}
          />
          <Skeleton animation="wave" width={"10%"} sx={{ marginRight: 1 }} />
          <Skeleton animation="wave" width={"10%"} sx={{ marginRight: 1 }} />
          <Skeleton animation="wave" width={"22%"} sx={{ marginRight: 1 }} />
          <Skeleton animation="wave" width={"13%"} sx={{ marginRight: 1 }} />
          <Skeleton animation="wave" width={"30%"} sx={{ marginRight: 1 }} />
        </Box>
      ))}
    </Box>
  );
}
