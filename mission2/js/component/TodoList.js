import { useArrayState, checkTypes } from '../validator/validation.js'
import { convertStringToBoolean } from '../util/util.js'
import { TODO_STORAGE_KEY } from '../data/constant.js'

function TodoList({$app, todoData, setTodoList, countTodoItem}) {
    const $target = document.createElement('div');
    $target.id = "todo-list";
    $app.appendChild($target);

    this.$target = $target;
    this.todoData = todoData;
    this.validate = (todoData) => {
        if (new.target !== TodoList) {
          throw new Error('new 키워드로 함수의 인스턴스를 생성해야 합니다.')
        }
        useArrayState(todoData);
        checkTypes(
          todoData,
            ({ text, isCompleted }) =>
              typeof text === 'string' && typeof isCompleted === 'boolean'
          );
    };

    this.render = () => {
      const todoListStringHtml = '<ul id="todoUl">' +
        this.todoData
          .map((todo, index) => {
            const delBtnHtml = `<button class="deleteBtn" type="button" data-index=${index}> 삭제 </button>`;
            const liHtml = `<li class="todoLi" data-completed=${todo.isCompleted} data-index=${index}>`;
            return `${liHtml}` 
                + (todo.isCompleted ? `<s> ${todo.text} </s>` : `${todo.text}`) 
                + `${delBtnHtml}</li>`;
          })
          .join('') +
        '</ul>';
  
      $target.innerHTML = todoListStringHtml;
    };

    this.setState = (nextData) => {
      this.validate(nextData);
      this.todoData = nextData;
      countTodoItem(this.todoData);
      this.render();
      this.setEvent();
    };

    this.setEvent = () => {
        // 이벤트 위임 : 요소마다 이벤트 핸들러를 할당하지 않고, 요소들의 공통 조상에 이벤트 핸들러를 할당하여 관리.
        const todoUl = document.querySelector('#todoUl');

        todoUl.addEventListener('click', (event) => {
          const target = event.target;
          const todoLi = target.closest('li');
          const todoDelBtn = target.closest('button');
          const index = todoLi.dataset.index;
          const isCompleted = convertStringToBoolean(todoLi.dataset.completed);
          const items = this.todoData;

          if(todoDelBtn) {
            items.splice(index,1);
          } else {
            if(isCompleted) {
              items[index] = {text : items[index].text , isCompleted : false};
            } else {
              items[index] = {text : items[index].text , isCompleted : true};
            }
          }

          setTodoList(items);
          this.setState(items);
        });
    };
    
    this.setState(todoData);
  }
  
  export default TodoList
