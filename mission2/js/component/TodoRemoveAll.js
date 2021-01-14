import { REMOVE_ALL_EVENT } from '../data/constant.js'

function TodoRemoveAll({$app}) {
    const $target = document.createElement('button');
    const $targetText = document.createTextNode('전체삭제');
    $target.id = 'todo-remove-all';
    $target.appendChild($targetText);
    $app.appendChild($target);

    this.$target = $target;
    this.validate = () => {
        if(new.target !== TodoRemoveAll) {
            throw new Error('new 키워드로 함수의 인스턴스를 생성해야 합니다.')
        }
    };

    this.addRemoveAllEvent = () => {
        $target.addEventListener('click', (event) => {
            const removeAllEvent = new CustomEvent(REMOVE_ALL_EVENT);
            event.target.dispatchEvent(removeAllEvent);
        })
    };

    this.init = () => {
        this.validate();
        this.addRemoveAllEvent();
    };
    
    this.init();
}

export default TodoRemoveAll
