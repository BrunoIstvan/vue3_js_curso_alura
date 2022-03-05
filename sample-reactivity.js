const project = {
    id: 1,
    description: 'Nome do projeto'
}

const proxy = new Proxy(project, {

    get(obj, key) {
        console.log(`Alguém pediu a chave ${key} do projeto`)
        return obj[key]
    },
    set(obj, key, value) {
        console.log(`Alguém alterou a chave ${key} do projeto para o valor ${value}`);
        obj[key] = value
    }


});


console.log('-----------');
console.log(project.description);
console.log('-----------');
console.log(proxy.id)
console.log('-----------');
console.log(proxy.description)
console.log('-----------');
proxy.description = 'Novo nome do projeto'
console.log('-----------');
console.log(project.description);
console.log('-----------');

/*
    Para testar, vá na console e rode o comando 
        
        node sample-reactivity.js
*/