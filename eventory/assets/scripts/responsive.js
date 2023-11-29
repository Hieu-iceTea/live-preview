function showMenuNav() {
    document.querySelectorAll('.template-components-header1')
        .forEach(e => e.classList.remove('hide'))
}

function hideMenuNav() {
    document.querySelectorAll('.template-components-header1')
        .forEach(e => e.classList.add('hide'))
}
