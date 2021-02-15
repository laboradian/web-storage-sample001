let elmKeySess,
    elmValSess,
    elmKeyLocal,
    elmValLocal,
    elmSessDataList,
    elmLocalDataList;
window.addEventListener('DOMContentLoaded', (event) => {
    elmKeySess = document.querySelector('#keySess');
    elmValSess = document.querySelector('#valSess');
    elmKeyLocal = document.querySelector('#keyLocal');
    elmValLocal = document.querySelector('#valLocal');
    elmSessDataList = document.querySelector('#sessDataList');
    elmLocalDataList = document.querySelector('#localDataList');
    showSessData();
    showLocalData();
  
    document.querySelector('#btnSaveSess').addEventListener('click', () => {
        sessionStorage.setItem(elmKeySess.value, elmValSess.value);
        showSessData();
    });

    document.querySelector('#btnClearSess').addEventListener('click', () => {
        sessionStorage.clear();
        showSessData();
    });

    document.querySelector('#btnSaveLocal').addEventListener('click', () => {
        localStorage.setItem(elmKeyLocal.value, elmValLocal.value);
        showLocalData();
    });

    document.querySelector('#btnClearLocal').addEventListener('click', () => {
        localStorage.clear();
        showLocalData();
    });
});
const showSessData = () => {
    clearSess();
    Object.keys(sessionStorage).forEach((key) => {
        const li = document.createElement("li");
        li.appendChild(document.createTextNode(`${key}: ${sessionStorage.getItem(key)}`));

        const a = document.createElement('a');
        const link = document.createTextNode("削除する");
        a.appendChild(link);
        a.href = "";
        a.style.marginLeft = "1em";
        a.onclick = () => {
            sessionStorage.removeItem(key);
            showSessData();
            return false;
        };
        li.appendChild(a);

        elmSessDataList.appendChild(li);
    });
};
const clearSess = () => {
  elmSessDataList.innerHTML = '';
};
const showLocalData = () => {
    let i;
    clearLocal();
    Object.keys(localStorage).forEach((key) => {
        const li = document.createElement("li");
        li.appendChild(document.createTextNode(`${key}: ${localStorage.getItem(key)}`));

        const a = document.createElement('a');
        const link = document.createTextNode("削除する");
        a.appendChild(link);
        a.href = "";
        a.style.marginLeft = "1em";
        a.onclick = () => {
            localStorage.removeItem(key);
            showLocalData();
            return false;
        };
        li.appendChild(a);

        elmLocalDataList.appendChild(li);
    });
};
const clearLocal = () => {
  elmLocalDataList.innerHTML = '';
};