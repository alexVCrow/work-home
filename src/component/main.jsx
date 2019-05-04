import React, {Component} from 'react';
import TableHeader from '../elements/tableheader';
import TableBody from "../elements/tablebody";
import GroupButtons from "../elements/groupButtons";
import Search from "../elements/search";
import ModalAdd from "../elements/modalAdd";

const closeAddModal = {addModal: false, people:'',
    typeModal:'',closeModal:'',successModal:'',textTitle:'', textButton:''};

class Main extends Component {
    state = {
        fields: [
            {field:'Id', key:1},
            {field:'Фамилия',key:2, value: 'Test'},
            {field: 'Имя', key:3, value: 'Test'},
            {field:'Отчество', key:4, value: 'Test'},
            {field:'Действие', key:5, value: 'Test'}],
        data: [
            { key:1,
                lastName: 'Ворона',
                firstName: 'Майя',
                middleName: 'Александровна',
                buttons: people => this.generateFunc(people)
            },
            {key:2, lastName: 'Ворона', firstName: 'Александр', middleName: 'Сергеевич',
                buttons: people => this.generateFunc(people)},
            {key:3, lastName: 'Цветкова', firstName: 'Ольга', middleName: 'Владимировна',
                buttons: people => this.generateFunc(people)}
        ], filterData: '',
        delete: {deleteModal: false, people:''},
        add: {addModal: false, people:'', typeModal:'',closeModal:'',
            successModal:'', textTitle:'', textButton:''},
        change: {changeModal: false, people:''}
    };

    generateFunc = people => {
        return <GroupButtons people={people} onDelete={this.onDelete} onChange={this.onChange}/>
    };

    onDelete = people => {
        this.setState({add:
                {addModal: true,
                    people: people,
                    typeModal: 'confirmModal',
                    closeModal: this.modalAddClose,
                    successModal: this.modalDeleteSuccess,
                    textTitle: 'Подтвердите удаление', textButton:''}});
    };

    onChange = people => {
        let user = {};
        user.key = people.key;
        user.lastName = people.lastName;
        user.firstName = people.firstName;
        user.middleName = people.middleName;
        this.setState({add:
                {addModal: true,
                    people: user,
                    typeModal: 'changeModal',
                    closeModal: this.modalAddClose,
                    successModal: this.modalChangeSuccess,
                    textTitle: 'Изменение агента', textButton:'Изменить'}});
    };

    onFiltered = filterData => {
        this.setState({filterData});
    };

    searchData = (data, value) => {
        if(value.length === 0) return data;
        const val = value.toLowerCase().trim().replace(/ /g,'');
        return data.filter(item =>
            (item.lastName + item.firstName + item.middleName).toLowerCase().indexOf(val) > -1)
    };

    modalDeleteSuccess = () => {
        const {people} = this.state.add;
        const copyData = [...this.state.data];
        const data = copyData.filter( p=> (p.key !== people.key));
        this.setState({data, add: closeAddModal});
    };

    modalAdd = () => {
        this.setState({add:
                    {addModal: true,
                    people: '',
                    typeModal: 'addModal',
                    closeModal: this.modalAddClose,
                    successModal: this.modalAddSuccess,
                    textTitle: 'Добавление агента', textButton:'Добавить'}
        });
    };

    modalAddClose = () => {
        this.setState({add: closeAddModal});
    };

    modalAddSuccess = people => {
        const data = [...this.state.data];
        const lastKey = data.length === 0 ? 0 : data[data.length - 1].key;
        const pp = {key: lastKey + 1, ...people, buttons: people => this.generateFunc(people)};
        data.push(pp);
        this.setState({data, add: closeAddModal});
    };

    modalChangeSuccess = people => {
        const data = [...this.state.data];
        const changeData = data.map(dt => {
            if(dt.key === people.key){
                dt = { ...dt, lastName: people.lastName,
                    firstName: people.firstName, middleName: people.middleName};
            }
            return dt;
        });
        this.setState({data: changeData, add: closeAddModal});

    };

    render() {
        const { fields, data, filterData, add} = this.state;
        const { addModal} = add;
        const items = this.searchData(data,filterData);
        return (
            <React.Fragment>
                {addModal && (<ModalAdd show={addModal} modal={add}/>)}
                <div className='row mt-5'>
                    <div className="col-4 pl-0">
                        <Search onFiltered={this.onFiltered} count={items.length}/>
                    </div>
                    <div className="col-8 text-right pr-0">
                        <button className="btn btn-outline-dark" onClick={this.modalAdd}>Добавить агента</button>
                    </div>
                </div>
                {items.length === 0 || (<div className='row'>
                    <table className="table table-hover table-dark mt-2">
                        <TableHeader fields={fields}/>
                        <TableBody data={items}/>
                    </table>
                </div>)}
            </React.Fragment>
        )
    }
}

export default Main;