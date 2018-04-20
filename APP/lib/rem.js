function rem () {
    document.getElementsByTagName('html')[0].style.fontSize = document.documentElement.offsetWidth * 0.1 + 'px';
}
rem();
window.addEventListener('resize', function () {
    rem()
});