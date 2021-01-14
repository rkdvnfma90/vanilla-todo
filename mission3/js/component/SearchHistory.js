function SearchHistory({$app, searchHistoryData, onFetchJjalbot}) {

    if(new.target !== SearchHistory) {
        throw new Error('new 키워드로 함수의 인스턴스를 생성해야 합니다.')
    }

    const $target = document.createElement('div');
    const $historyUl = document.createElement('ul');
    $target.id = 'search-history';
    $historyUl.id = 'history-ul';

    $target.appendChild($historyUl);    
    $app.appendChild($target);

    this.$target = $target;
    this.searchHistoryData = [...searchHistoryData];
    
    this.setEvent = () => {
        const historyUl = document.querySelector('#history-ul');
        historyUl.addEventListener('click', (event) => {
            const target = event.target;
            onFetchJjalbot(target.innerText);
        })
    };

    this.render = () => {
        const searchHistoryHtml = `
            ${this.searchHistoryData.map(history => {
                return `<li> ${history} </li>`;
            }).join('')} 
        `;
        
        $historyUl.innerHTML = searchHistoryHtml;
    };

    this.setState = (nextData) => {
        this.searchHistoryData = nextData;
        this.render();
    };
    
    this.setEvent();
    this.setState(this.searchHistoryData);
}

export default SearchHistory
