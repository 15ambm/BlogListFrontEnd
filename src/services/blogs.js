import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async() => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async newData => {
  const config = {
    headers:{Authorization: token}
  }
  const response = await axios.post(baseUrl, newData, config)
  return response.data
}

const update = async (newData, id) => {
  const response = await axios.put(`${baseUrl}/${id}`, newData)
  return response
}

const remove = async (id) => {
  const config = {
    headers:{Authorization: token}
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response
}

export default { getAll, create, update, remove, setToken }