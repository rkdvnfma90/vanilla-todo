/**
 * 
 * @param {text} string 
 * text 형식인 boolean 값을 boolean 으로 리턴한다.
 */
export const convertStringToBoolean = (text) => {
    try {
        return JSON.parse(text.toLowerCase())
    } catch (error) {
        throw new Error('string -> boolean 형변환시 오류가 발생했습니다.');
    }
}

/**
 * 
 * @param {parseData} string 
 * JSON parse를 실행한다.
 */
export const jsonParse = (parseData) => {
    try {
        return JSON.parse(parseData);
    } catch (error) {
        throw new Error('JSON parse시 오류가 발생했습니다.');
    }
}

/**
 * 
 * @param {jsonData} json 
 * JSON stringify를 실행한다.
 */
export const jsonStringify = (jsonData) => {
    try{
        return JSON.stringify(jsonData);
    }catch(error) {
        throw new Error('JSON stringify시 오류가 발생했습니다.');
    }
}

/**
 * 
 * @param {localStorageKey, localStorageData} 
 * 로컬스토리지에서 아이템을 저장한다.
 */
export const setItemLocalStorage = (localStorageKey, localStorageData) => {
    try {
        localStorage.setItem(localStorageKey, JSON.stringify(localStorageData));
    } catch(error) {
        throw new Error(`localStorage에 항목추가시 에러가 발생하였습니다. ${error}`);
    }
}

/**
 * 
 * @param {localStorageKey} 
 * 로컬스토리지에서 아이템을 가져온다.
 */
export const getItemLocalStorage = (localStorageKey) => {
    try {
        if(!localStorage.getItem(localStorageKey)) {
            return [];
        } else {
            return JSON.parse(localStorage.getItem(localStorageKey));
        }
    } catch(error) {
        throw new Error(`localStorage 항목조회시 에러가 발생하였습니다. ${error}`);
    }
    
}
