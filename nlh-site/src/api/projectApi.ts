import http from "./http";

export const getAllProjects = () => http.get(`/projects`);