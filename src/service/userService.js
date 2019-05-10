// import GroupButtons from "../component/main";
// import React from "react";

const user = [
    { key:1,lastName: 'Ворона', firstName: 'Майя', middleName: 'Александровна',
    },
    {key:2, lastName: 'Ворона', firstName: 'Александр', middleName: 'Сергеевич',
    },
    {key:3, lastName: 'Цветкова', firstName: 'Ольга', middleName: 'Владимировна',
    }
];

const fields = [
    {field:'Id', key:1},
    {field:'Фамилия',key:2, value: 'Test'},
    {field: 'Имя', key:3, value: 'Test'},
    {field:'Отчество', key:4, value: 'Test'},
    {field:'Действие', key:5, value: 'Test'}]

export default class UserService {
    // async getResource(url){
    //     const res = await fetch(url).catch(()=>{
    //         throw new Error("Ошибка при подключении")
    //     });
    //     if(!res.ok){
    //         throw new Error(`Ошибка при работе с АПИ ${res.status}`);
    //     }
    //     return await res.json();
    // };

    // getAllTransactions = async () => {
    //     const res = await this.getResource("http://localhost:8080/list");
    //     return res[0];
    // }

    getData = async () => {
        return user;
    }

    getFields = async () => {
        return fields;
    }

    // deleteUser = async (people) => {
    //     return user.filter( p=> (p.key !== people.key));
    // }

};