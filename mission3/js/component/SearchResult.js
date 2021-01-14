import { checkTarget, isArrayData } from '../validator/validation.js'

function SearchResult({$app, searchResultData}) {

    if(new.target !== SearchResult) {
        throw new Error('new 키워드로 함수의 인스턴스를 생성해야 합니다.')
    }

    const $target = document.createElement('div');
    $target.id = 'search-result';
    $app.appendChild($target);

    this.$target = $target;
    this.searchResultData = searchResultData;
    
    this.validate = () => {
        checkTarget(this.$target.id);
        isArrayData(this.searchResultData);
    };

    this.render = () => {
        const resultHtmlString = `${this.searchResultData
            .map( resultData => `<img src= "${resultData.imageUrl}">` )
            .join('')}`;
        $target.innerHTML = resultHtmlString;
    };

    this.setState = (nextData) => {
        this.searchResultData = nextData;
        this.validate();
        this.render();
    };
}

export default SearchResult
