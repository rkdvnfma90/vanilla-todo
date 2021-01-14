import SearchKeyword from './SearchKeyword.js'
import SearchResult from './SearchResult.js'
import SearchHistory from './SearchHistory.js'
import { JJALBOT_HISTORY_STORAGE_KEY } from '../constant/constant.js'
import { setItemLocalStorage, getItemLocalStorage} from '../util/util.js'

function App({$app}) {
    this.$app = $app;
    this.searchResultData = [];
    this.init = () => {
        this.initLocalStorage();
        this.searchKeyword = new SearchKeyword({
            $app,
            onSearchResult,
            onAddSearchHistory,
        });
        this.searchHistory = new SearchHistory({
            $app,
            onFetchJjalbot,
            searchHistoryData: this.searchHistoryData
        });
        this.searchResult = new SearchResult({
            $app,
            searchResultData: this.searchResultData
        });
    };

    this.initLocalStorage = () => {
        const localStorageItem = getItemLocalStorage(JJALBOT_HISTORY_STORAGE_KEY);
        if(localStorageItem !== null) {
            this.searchHistoryData = new Set(localStorageItem);
        } else {
            this.searchHistoryData = new Set();
        }
    };

    const onSearchResult = (searchResultData) => {
        this.searchResult.setState(searchResultData);
    };

    const onAddSearchHistory = (inputData) => {
        this.searchHistoryData.add(inputData);
        setItemLocalStorage(JJALBOT_HISTORY_STORAGE_KEY, [...this.searchHistoryData]);
        const localStorageItem = getItemLocalStorage(JJALBOT_HISTORY_STORAGE_KEY);
        this.searchHistory.setState(localStorageItem);
    };

    const onFetchJjalbot = (historyData) => {
        this.searchKeyword.fetchData(historyData);
    }

    this.init();
}

export default App
