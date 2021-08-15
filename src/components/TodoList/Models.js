class Group  {
    
    constructor (name, color = 'default') {
        this.name = name
        this.color = color
        this.icon = null
        this.todoList = []
    }

}

class Todo {

    constructor (text) {
        this.text = text;
        this.completed = false
        this.start = null
        this.end = null
        this.archived = false
        this.deleted = false
        this.deletionDate = null
        this.group = null
    }

}

export { Todo, Group }