import { MY_NAME, TODO_API_URL, TODO_API_DELAY_URL } from '../data/constant.js'

const request = async (url, option = {}) => {
  const res = await fetch(`${TODO_API_URL}/${url}${TODO_API_DELAY_URL}`, option)

  if (res.ok) {
    return await res.json()
  } else {
    alert(`${res.status} : 에러가 발생하였습니다.`)
  }
}

/**
 *
 * @param {String} name
 * 사용자의 todo 리스트 조회
 */
export const searchTodosByName = async (name) => {
  return await request(name)
}

/**
 *
 * @param {String} userName
 * @param {String} content
 * 사용자의 todo를 저장
 */
export const createTodo = async ({ userName, content }) => {
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content: content,
    }),
  }
  return await request(userName, option)
}

/**
 *
 * @param {String} _id
 * 해당 _id의 todo 삭제
 */
export const deleteTodo = async ({ _id }) => {
  const option = {
    method: 'DELETE',
  }
  return await request(`${MY_NAME}/${_id}`, option)
}

/**
 * todo 리스트 전체삭제
 */
export const deleteAllTodos = async () => {
  const option = {
    method: 'DELETE',
  }
  return await request(`${MY_NAME}/all`, option)
}

/**
 *
 * @param {String} _id
 * 해당 Todo의 _id로 상태값 업데이트
 */
export const toggleTodo = async ({ _id }) => {
  const option = {
    method: 'PUT',
  }
  return await request(`${MY_NAME}/${_id}/toggle`, option)
}

/**
 * 전체 유저 조회
 */
export const searchUsers = async () => {
  return await request('users')
}
