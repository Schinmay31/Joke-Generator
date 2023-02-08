
function onlyone(checkbox) {
    var checkboxes = document.getElementsByClassName("onlyOne");
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false
    });
}