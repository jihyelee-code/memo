require.context("../image", true);

function createMemoHandler(e){
    e.preventDefault();

}

function memoCreator(){
    const ADD_BTN_ATTR = "addMemo";
    const addBtn = document.querySelector(`[button-action="${ADD_BTN_ATTR}"]`);
    addBtn.addEventListener('click', createMemoHandler);
}

memoCreator();
