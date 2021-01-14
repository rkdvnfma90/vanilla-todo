/**
 * 
 * @param {url, inputData} param
 * fetch로 api 호출
 */
export const onFetch = async ({url, inputData}) => {
    try {
        const response = await fetch(inputData ? `${url}=${inputData}` : `${url}`);
        const searchResultData = await response.json();
        return searchResultData;
    } catch (error) {
        console.error(`Error : ${error}`);
    }
}

/**
 * 
 * @param {inputData, fnc, debounceTime} param
 * 디바운스 기능
 */
export const onDebounce = function({inputData, fetchFunction, delay}) {
    if (this.timer) {
        clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
        fetchFunction(inputData);
    }, delay);
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
        return JSON.parse(localStorage.getItem(localStorageKey));
    } catch(error) {
        throw new Error(`localStorage 초기화시 에러가 발생하였습니다. ${error}`);
    }
    
}
