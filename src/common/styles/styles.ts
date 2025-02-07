import styled from "@emotion/styled";

export const style = {
  borderRadius: "10px",
  background: "#333",
  color: "#fff",
  fontSize: "16px",
};

export const ButtonStyle = {
  maxWidth: 230,
  padding: "10px 20px",
  borderRadius: 2,
  boxShadow: 3,
  textAlign: "center",
  color: "white",
};

export const PreloaderContainer = styled("div")({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
});

export const Img = styled("img")({
  width: "100px",
  height: "auto",
});

export const textColor = {
  color: "#000",
};
