/* eslint-disable no-useless-concat */
// // Development base url

const currentURL = window.location.href;
let parts = currentURL.split(":");
let path = parts[0] + ":" + parts[1];
export const baseUrl = path + ":" + "8000";

//Production base url for docker

// const currentURL = window.location.href;
//   let parts = currentURL.split("/");
//   let path = parts[0]+"//"+parts[2];
// export const baseUrl = path+":"+"8000";
