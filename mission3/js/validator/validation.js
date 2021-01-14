/**
 * 
 * @param {Array} data 
 * data 가 배열인지 확인
 */
export const isArrayData = (data) => {
    if (!Array.isArray(data)) {
        throw new Error('올바른 데이터를 넘겨주세요.');
    }
}

/**
 * 
 * @param {Target} target 
 * 파라미터로 넘어온 target이 존재하는지 확인.
 */
export const checkTarget = (targetId) => {
    const curTarget = document.querySelector(`#${targetId}`);
    if (!curTarget) {
        throw new Error('target이 올바르지 않습니다.')
    }
}
