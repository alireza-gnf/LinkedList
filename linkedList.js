class Node {
    constructor(value=null, next=null) {
        this.value = value
        this.next = next
    }

    toString() {
        return `${this.value}`
    }
}

class LinkedList {
    #head = null
    constructor(node=null) {
        if (node instanceof Node) {
            this.#head = node
        }
    }

    insert(value) {
        if (value instanceof LinkedList) {
            const size = value.size()
            if (size > 0) {
                value.at(size - 1).next = this.#head
                this.#head = value.at(0)
            }
        } else {
            const newNode = value instanceof Node ? value : new Node(value)
            newNode.next = this.#head
            this.#head = newNode
        }
    }

    insertLast(value) {
        let newNode
        if (value instanceof LinkedList) {
            newNode = value.at(0)
        } else {
            newNode = value instanceof Node ? value : new Node(value)
        }
        if (!this.#head) {
            this.#head = newNode
            return
        }
        let lastNode = this.#head
        while (lastNode.next) {
            lastNode = lastNode.next
        }
        lastNode.next = newNode
    }

    size() {
        let size = 0
        if (this.#head) {
            let lastNode = this.#head
            do {
                size++
                lastNode = lastNode.next
            } while (lastNode);
        }
        return size
    }

    at(index) {
        if (this.#head && index >= 0 && (this.#head.size() >= index)) {
            let currentNode = this.#head
            for (let i = 0; i <= index; i++) {
                if (i === index)
                    return currentNode
                currentNode = currentNode.next
            }
        }

        return null
    }

    join(separator=',') {
        let result = ""
        if (this.#head) {
            let currentNode = this.#head
            do {
                result += (currentNode.toString() + `${separator} `)
                currentNode = currentNode.next
            } while (currentNode)
        }

        return result.replace(new RegExp(`${separator} $`), "")
    }

    map(fn) {
        if (typeof fn != "function")
            throw new Error("fn is not a function")
        
        let newList = new LinkedList()
        if (this.#head) {
            let currentNode = this.#head
            do {
                let newNode = new Node(fn(currentNode.value))
                newList.insertLast(newNode)
                currentNode = currentNode.next
            } while (currentNode)
        }

        return newList
    }

    filter(fn) {
        if (typeof fn != 'function')
            throw new Error("fn is not a function")
        
        let newList = new LinkedList()
        if (this.#head) {
            let currentNode = this.#head
            do {
                if (fn(currentNode.value)) {
                    let newNode = new Node(currentNode.value)
                    newList.insertLast(newNode)
                }
                currentNode = currentNode.next
            } while (currentNode)
        }

        return newList
    }

    find(fn) {
        if (typeof fn != 'function')
            throw new Error("fn is not a function")

        if (this.#head) {
            let currentNode = this.#head
            while (currentNode) {
                if (fn(currentNode.value))
                    return currentNode
                currentNode = currentNode.next
            }
        }
        return null
    }
}

const list1 = new LinkedList(new Node(1))
list1.insertLast(new Node(2, new Node(3, new Node(4))))
const list2 = list1.map((value) => { return value * 25 })
list2.at(0).value = 65
console.log(list1.join())

console.log(list2.join())

console.log(list2.find(value => value === 65))

const list3 = list2.filter(value => value % 3 === 0 )
console.log(list3.join())

list3.insert(list1)
console.log(list3.join())

list3.insertLast(list2)
console.log(list3.join())
