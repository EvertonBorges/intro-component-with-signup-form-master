function validateForm() {
    const nodesInputGroup = document.querySelectorAll('div.input-group');

    for (let i = 0; i < nodesInputGroup.length; i++) {
        const node = nodesInputGroup[i];
        onBlurEvent(node, false);
    }

    let isValid = true;

    for (let i = 0; i < nodesInputGroup.length; i++) {
        const node = nodesInputGroup[i];
        const icon = node.children[0].children[1];
        const label = node.children[1];

        isValid = !(icon.style.display === 'block' || label.style.display === 'block')

        if (!isValid) break;
    }

    return isValid;
}

function onFocusEvent(node) {
    const border = node.children[0];
    const icon = node.children[0].children[1];
    const label = node.children[1];

    const classListBorder = border.classList;
    if (classListBorder.contains('input-error')) classListBorder.remove('input-error');

    icon.style.display = 'none';
    label.style.display = 'none';
}

function onBlurEvent(node, isCheckButton = true) {
    let isValidField = true;

    const input = node.children[0].children[0];
    const icon = node.children[0].children[1];
    const label = node.children[1];

    switch(input.name) {
        default: isValidField = !IsEmpty(input.value); break;
        case 'lastName': isValidField = !IsEmpty(input.value); break;
        case 'emailAddress': isValidField = IsEmail(input.value); break;
        case 'password': isValidField = !IsEmpty(input.value); break;
    }

    if (!isValidField) {
        icon.style.display = 'block';
        label.style.display = 'block';

        const border = node.children[0];
        const classListBorder = border.classList;
        if (!classListBorder.contains('input-error')) classListBorder.add('input-error');
    }

    if (isCheckButton) enableButton();
}

function enableButton() {
    const buttonSubmit = document.getElementsByClassName('btn-submit')[0];
    buttonSubmit.disabled = !validateForm();
}

function IsEmpty(text = "") {
    return !text || text === "";
}

// font: https://codigofonte.com.br/codigos/validacao-completa-de-email-com-javascript-e-expressao-regular
function IsEmail(email){
    var exclude=/[^@\-\.\w]|^[_@\.\-]|[\._\-]{2}|[@\.]{2}|(@)[^@]*\1/;
    var check=/@[\w\-]+\./;
    var checkend=/\.[a-zA-Z]{2,3}$/;
    if(((email.search(exclude) != -1)||(email.search(check)) == -1)||(email.search(checkend) == -1)){return false;}
    else {return true;}
}