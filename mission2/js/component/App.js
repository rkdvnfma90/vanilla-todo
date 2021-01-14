import TodoList from './TodoList.js'
import TodoInput from './TodoInput.js'
import TodoCount from './TodoCount.js'
import TodoRemoveAll from './TodoRemoveAll.js'
import { TODO_STORAGE_KEY, REMOVE_ALL_EVENT } from '../data/constant.js'
import { setItemLocalStorage, getItemLocalStorage } from '../util/util.js'

function App({$app}) {
    this.$app = $app;
    this.init = () => {
        this.initLocalStorage();
        this.todoInput = new TodoInput({
            $app,
            addTodoItem,
        });
        this.todoRemoveAll = new TodoRemoveAll({
            $app,
        });
        this.todoCount = new TodoCount({
            $app,
        });
        this.todoList = new TodoList({
            $app,
            todoData: this.todoData,
            setTodoList,
            countTodoItem,
        });

        this.initRemoveAllBtn();
    };
    
    const addTodoItem = (newTodoItem) => {
        const localStorageItem = getItemLocalStorage(TODO_STORAGE_KEY);
        localStorageItem.push(newTodoItem);
        setItemLocalStorage(TODO_STORAGE_KEY, localStorageItem);
        this.todoList.setState(getItemLocalStorage(TODO_STORAGE_KEY));
    };

    const countTodoItem = (todoItem) => {
        const completedTodoList = todoItem.filter((data) => {
            return data.isCompleted === true;
        });
        const countTodoData = {
            allTodoListCount : todoItem.length,
            completedTodoListCount : completedTodoList.length
        };
        this.todoCount.setState(countTodoData);
    };

    const setTodoList = (todoList) => {
        setItemLocalStorage(TODO_STORAGE_KEY, todoList);
        this.todoList.setState(getItemLocalStorage(TODO_STORAGE_KEY));
    };
    
    this.initLocalStorage = () => {
        const localStorageItem = getItemLocalStorage(TODO_STORAGE_KEY);

        if(localStorageItem !== null) {
            this.todoData = localStorageItem;
        } else {
            this.todoData = [];
        }
    };

    this.initRemoveAllBtn = () => {
        const removeAllBtn = this.todoRemoveAll.$target;
        removeAllBtn.addEventListener(REMOVE_ALL_EVENT, (event) => {
            localStorage.clear();
            this.todoData = [];
            this.todoList.setState(this.todoData);
        });
    };

    this.init();
}

export default App
