const axios = require("axios")
const readline = require("readline-sync")

const axiosInstance = axios.create({
    baseURL: "https://643d0774f0ec48ce904fcb4e.mockapi.io/todo/",
    headers: {
        "Contenty-Type": "application/json"
    }
})


const option = ["GetAllTodos", "GetFalseTodos", "CompleteTodoById", "CreateTodo", "DeleteTodo"]

Main();

async function Main() {
    let respond = readline.keyInSelect(option)
    respond++;
    switch (respond) {
        case 1:
            await getTodo();
            break;
        case 2:
            await isNotSuccess();
            break;
        case 3:
            await makeTrueById();
            break;
        case 4:
            await createTodo();
            break;
        case 5:
            await deleteTodo();
            break;
        default:
            break;
    }
    Main();
}

async function getTodo() {
    const res = await axiosInstance.get()
    console.log(res.data);
}

async function isNotSuccess() {
    const res = await axiosInstance.get()

    let getFalse = res.data.filter(c => c.completed == false)

    console.log(getFalse);
}

async function makeTrueById() {
    let getbyId = readline.question("Enter Id: ")

    const res = await axiosInstance.put(`${getbyId}`, {
        completed: true
    })
    return res;
}

async function createTodo() {
    let getbyTitle = readline.question("Enter title: ")
   
    const res = await axiosInstance.post('', {
        title: getbyTitle,
        completed:false
    })

    return res;
}

async function deleteTodo(){
    let byId = readline.question("Enter Id: ")
    const res = await axiosInstance.delete(`${byId}`)
    return res;
}