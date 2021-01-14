/**
 *
 * @param {text} string
 * text 형식인 boolean 값을 boolean 으로 리턴한다.
 */
export const convertStringToBoolean = (text) => {
  try {
    return JSON.parse(text.toLowerCase())
  } catch (error) {
    throw new Error('string -> boolean 형변환시 오류가 발생했습니다.')
  }
}
