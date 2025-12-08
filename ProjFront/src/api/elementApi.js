// src/api/elementsApi.js
import axiosClient from "./axiosClient"

export const getElements = () => {
  return axiosClient.get("/elements")
}

export const getElementById = (id) => {
  return axiosClient.get(`/elements/${id}`)
}

export const searchElements = (query) => {
  return axiosClient.get(`/elements/search`, {
    params: { q: query }
  })
}

