window.model = {
    data: {
        todo_items: {
            //{content,
            //datetime,
            //done<bool>,
            //star<bool>,}
        },
        filter: 'All'
    },
    TOKEN: 'TodoMVC'
};

(function() {
    let model = window.model
    let key = "todo_items"
    Object.assign(model, {
        init: function(callback) {
            let data = window.localStorage.getItem(key)
            if (data) {
                model.data = JSON.parse(data)
            }
            if (callback) callback();
        },
        flush: function(callback) {
            window.localStorage.setItem(key, JSON.stringify(model.data))
            if (callback) callback();
        }
    });
})();