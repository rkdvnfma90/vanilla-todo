/**
 * 
 * @param {data} data 
 * 파라미터로 넘어온 data 가 null, undefined 거나 배열여부 확인.
 */
export const useArrayState = (data) => {
    if (!Array.isArray(data)) {
        throw new Error('올바른 데이터를 넘겨주세요.');
    }
}
  
/**
 * 
 * @param {target} target 
 * 파라미터로 넘어온 target이 존재하는지 확인.
 */
export const checkTarget = (targetId) => {
    let curTarget = document.querySelector(`#${targetId}`);
    if (!curTarget) {
        throw new Error('target이 올바르지 않습니다.')
    }
}

/**
 * 
 * @param {data} data 
 * @param {checkCallback} checkCallback 
 * 파라미터로 넘어온 data가 checkCallback을 만족하는지 확인.
 */
export const checkTypes = (data, checkCallback) => {
    if (!data.every(checkCallback)) {
        throw new Error('data 형식이 맞지 않습니다.')
    }
}

/**
 * 
 * @param {inputData} inputData 
 * to-do 항목을 입력할 때 빈값 확인.
 */
export const validateTextValueCheck = (inputData) => {
    if(!inputData.text) {
        throw new Error('to-do 항목을 입력해주세요.');
    }
}

/**
 * 
 * @param {checkData} checkData 
 * @param {constructor} constructor 
 * checkData가 obj 형식인지 확인
 */
export const validateObjectType = (checkData, obj) => {
    if(!checkData.constructor === obj) {
        throw new Error('Object 형식이 맞지 않습니다.')
    }
    
}
  