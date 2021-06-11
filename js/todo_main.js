window.onload = function() {
    vt.success("Welcome Back 🌸~", {
        title: undefined,
        position: "top-right",
        duration: 1500,
        closable: true,
        focusable: true,
        callback: undefined
    });

    let now_type = window.location.hash.split("#")[1]
    if (!now_type) {
        now_type = "ALL"
    }

    model.init(function() {
        window.location.href = "#ALL"
        initMyToDo();
    });

    $("#All_btn").addEventListener("click", function() {
        window.location.href = "#ALL"
        vt.success("Change To All ~", {
            title: undefined,
            position: "top-right",
            duration: 1000,
            closable: true,
            focusable: true,
            callback: undefined
        })
        $("#All_btn").classList.add("active")
        $("#Done_btn").classList.remove("active")
        $("#ToDo_btn").classList.remove("active")
        filter(event, "ALL")
    })
    $("#Done_btn").addEventListener("click", function() {
        window.location.href = "#Done"
        vt.success("Change To Done ~", {
            title: undefined,
            position: "top-right",
            duration: 1000,
            closable: true,
            focusable: true,
            callback: undefined
        })
        $("#All_btn").classList.remove("active")
        $("#Done_btn").classList.add("active")
        $("#ToDo_btn").classList.remove("active")
        filter(event, "Done")
    })
    $("#ToDo_btn").addEventListener("click", function() {
        window.location.href = "#ToDo"
        vt.success("Change To ToDo ~", {
            title: undefined,
            position: "top-right",
            duration: 1000,
            closable: true,
            focusable: true,
            callback: undefined
        })
        $("#All_btn").classList.remove("active")
        $("#Done_btn").classList.remove("active")
        $("#ToDo_btn").classList.add("active")
        filter(event, "ToDo")
    })

    $("#delete_All").addEventListener("click", function() {

        deleteAll(event, now_type)
    })
    $("#done_All").addEventListener("click", function() {
        doneAll()
    })
    $("#notdone_All").addEventListener("click", function() {
        notdoneAll()
    })
}

function initMyToDo() {
    var todo_cnt = 0;
    var done_cnt = 0;
    for (let key in model.data.todo_items) {
        let item = model.data.todo_items[key]
        if (item.done) done_cnt++;
        else todo_cnt++;

        let now_h2 = $CRE("h2")
        now_h2.innerHTML = item.content
        now_h2.addEventListener("click", function() {
            doneToDo(event, this)
        })

        let now_del_btn = $CRE("button")
        now_del_btn.innerHTML = "Delete"
        now_del_btn.addEventListener("click", function() {
            deleteToDo(event, this)
        })

        let now_star_btn = $CRE("button")
        now_star_btn.classList.add("star_btn")
        now_star_btn.addEventListener("click", function() {
            starToDo(event, this)
        })

        let now_div = $CRE("div")
        now_div.setAttribute("id", key)
        now_div.classList.add("item")
        if (item.done) {
            now_div.classList.remove("pink")
            now_div.classList.add("blue")
        } else {
            now_div.classList.remove("blue")
            now_div.classList.add("pink")
        }
        now_div.appendChild(now_h2)
        now_div.appendChild(now_del_btn)
        now_div.appendChild(now_star_btn)

        $("#todo_items").appendChild(now_div)

        updateStar(now_div, model.data.todo_items[key].star)
        updateDone(now_div, model.data.todo_items[key].done)
    }
}

function addToDo() {
    let now_content = $("#add_input").value
    now_content = now_content.trim()
    if (now_content.length >= 1) {
        let timestamp = new Date().getTime()
        let now_item_id = "item-" + timestamp
        model.data.todo_items[now_item_id] = {
            content: now_content,
            datetime: new Date(),
            done: false,
            star: false,
        }
        model.flush()
        let item = model.data.todo_items[now_item_id]

        let now_h2 = $CRE("h2")
        now_h2.innerHTML = now_content
        now_h2.addEventListener("click", function() {
            doneToDo(event, this)
        })

        let now_del_btn = $CRE("button")
        now_del_btn.innerHTML = "Delete"
        now_del_btn.addEventListener("click", function() {
            deleteToDo(event, this)
        })

        let now_star_btn = $CRE("button")
        now_star_btn.innerHTML = "Star"
        now_star_btn.classList.add("star_btn")
        now_star_btn.addEventListener("click", function() {
            starToDo(event, this)
        })

        let now_div = $CRE("div")
        now_div.setAttribute("id", now_item_id)
        now_div.classList.add("item")
        if (item.done) {
            now_div.classList.remove("pink")
            now_div.classList.add("blue")
        } else {
            now_div.classList.remove("blue")
            now_div.classList.add("pink")
        }
        now_div.appendChild(now_h2)
        now_div.appendChild(now_del_btn)
        now_div.appendChild(now_star_btn)

        $("#todo_items").appendChild(now_div)
        $("#add_input").value = ""
        vt.success("Add Note ~", {
            title: undefined,
            position: "top-right",
            duration: 1000,
            closable: true,
            focusable: true,
            callback: undefined
        })
    }
}

function updateMyToDo(hash) {
    var todo_items = $All(".item")
    for (let item of todo_items) {
        if (item) {
            let item_id = item.getAttribute("id")
            let now_item = model.data.todo_items[item_id]
            if (hash === "ALL" || (hash === "Done" && now_item.done) || (hash === "ToDo" && (!now_item.done))) {
                setTimeout(function() {
                    item.classList.remove("hide")
                }, 0)
                item.style.display = "block"
            } else {
                item.classList.add("hide")
                setTimeout(function() {
                    item.style.display = "none"
                }, 400)
            }
        }
    }
}

function deleteToDo(event, now) {
    let now_item = now.parentNode
    let now_id = now_item.getAttribute("id")
    delete model.data.todo_items[now_id]
    model.flush()
    setItemStyle(now_item, "Delete", "")
}

function starToDo(event, now) {
    let now_item = now.parentNode,
        now_id = now_item.getAttribute("id")
    model.data.todo_items[now_id].star = !model.data.todo_items[now_id].star
    model.flush()
    updateStar(now_item, model.data.todo_items[now_id].star)
}

function updateStar(now_item, isStar) { //更新Star样式表
    let now_start_btn = now_item.querySelector(".star_btn")
    if (isStar) { //前置状态已收藏，进行取消收藏操作
        now_item.style.backgroundColor = "red"
        now_start_btn.innerHTML = "Cancel"

    } else { //前置状态未收藏，进行收藏操作
        now_item.style.backgroundColor = ""
        now_start_btn.innerHTML = "Star"
    }
}

function doneToDo(event, now) {
    let now_item = now.parentNode,
        now_id = now_item.getAttribute("id")
    model.data.todo_items[now_id].done = !model.data.todo_items[now_id].done
    model.flush()
    updateDone(now_item, model.data.todo_items[now_id].done)
}

function deleteAll(event, type) {
    for (let key in model.data.todo_items) {
        let now_item = model.data.todo_items[key]
        if (type === "ALL" || (type === "Done" && now_item.done) || (type === "ToDo" && !now_item.done)) {
            setItemStyle(now_item, "Delete", "")
            delete model.data.todo_items[key]
        }
    }
    model.flush()
    updateMyToDo(type)
}

function setItemStyle(now_item, type, hash) {
    if (type === "Done") { //已完成样式，只可能在
        if (hash === "Done") {
            setTimeout(function() {
                now_item.classList.remove("pink")
                now_item.classList.add("blue")
            }, 400)
        } else if (hash === "ToDo") {
            now_item.classList.add("hide")
            setTimeout(function() {
                now_item.style.display = "none"
                now_item.classList.remove("pink")
                now_item.classList.add("blue")
            }, 400)
        } else { //ALL变色不用延时
            now_item.classList.remove("pink")
            now_item.classList.add("blue")
        }
    } else if (type === "ToDo") { //待完成样式
        if (hash === "Done") {
            now_item.classList.add("hide")
            setTimeout(function() {
                now_item.style.display = "none"
                now_item.classList.remove("blue")
                now_item.classList.add("pink")
            }, 400)
        } else if (hash === "ToDo") {
            setTimeout(function() {
                now_item.classList.remove("blue")
                now_item.classList.add("pink")
            }, 400)
        } else { //ALL变色不用延时
            now_item.classList.remove("blue")
            now_item.classList.add("pink")
        }
    } else if (type === "Delete") {
        now_item.classList.add("hide")
        setTimeout(function() {
            $("#todo_items").removeChild(now_item)
                //now_item.style.display = "none"
        }, 400)
    }
}

function doneAll() {
    for (let key in model.data.todo_items) {
        if (model.data.todo_items[key].done) {
            continue
        }
        model.data.todo_items[key].done = true
        updateDone($("#" + key), true)
    }
    model.flush()
}

function notdoneAll() {
    for (let key in model.data.todo_items) {
        if (!model.data.todo_items[key].done) {
            continue
        }
        model.data.todo_items[key].done = false
        updateDone($("#" + key), false)
    }
    model.flush()
}

function clearAll() {
    $("#todo_items").innerHTML = ""
}

function updateDone(now_item, isDone) {
    let now_h2 = now_item.querySelector("h2");
    let hash = window.location.hash.split("#")[1]
    if (isDone) {
        let now_content = now_h2.innerHTML,
            now_s = $CRE("s")
        now_s.innerHTML = now_content
        now_h2.innerHTML = ""
        now_h2.appendChild(now_s)
        setItemStyle(now_item, "Done", hash)
    } else {
        let now_s = now_h2.querySelector("s")
        if (now_s) {
            let now_content = now_s.innerHTML
            now_h2.removeChild(now_s)
            now_h2.innerHTML = now_content
        }
        setItemStyle(now_item, "ToDo", hash)
    }
}

function filter(event, type) {
    updateMyToDo(type)
}

$("#add").addEventListener("click", addToDo)


$("#add_input").addEventListener("keydown", function(event) {
    var e = event || window.event;
    if (e && e.keyCode == 13) {
        addToDo()
    }
})