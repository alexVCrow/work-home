import React, {Component} from 'react';
import TableHeader from '../elements/tableheader';
import TableBody from "../elements/tablebody";
import GroupButtons from "../elements/groupButtons";
import Search from "../elements/search";
import ModalMy from '../elements/modal'
import ModalAdd from "../elements/modalAdd";
import ModalChange from "../elements/modalChange"

const closeDeleteModal = {deleteModal: false, people: ''};
const closeAddModal = {addModal: false, people:''};
const closeChangeModal = {changeModal: false, people:''};

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
        add: {addModal: false, people:''},
        change: {changeModal: false, people:''}
    }

    generateFunc = people => {
        return <GroupButtons people={people} onDelete={this.onDelete} onChange={this.onChange}/>
    }

    onDelete = people => {
        this.setState({delete: {deleteModal: true, people: people}});
    }

    onChange = people => {
        let user = {};
        user.key = people.key;
        user.lastName = people.lastName;
        user.firstName = people.firstName;
        user.middleName = people.middleName;
        this.setState({ change: {changeModal: true, people:user} });
    }

    onFiltered = filterData => {
        this.setState({filterData});
    }

    searchData = (data, value) => {
        if(value.length === 0) return data;
        const val = value.toLowerCase().trim().replace(/ /g,'')
        return data.filter(item =>
            (item.lastName + item.firstName + item.middleName).toLowerCase().indexOf(val) > -1)
    }

    modalDeleteClose = () =>{
        this.setState({delete: closeDeleteModal});
    }

    modalSuccess = () => {
        const {people} = this.state.delete;
        const copyData = [...this.state.data]
        const data = copyData.filter( p=> (p.key !== people.key));
        this.setState({data, delete:closeDeleteModal});
    }

    modalAdd = () => {
        this.setState({add: {addModal: true, people: ''}});
    }

    modalAddClose = () => {
        this.setState({add: closeAddModal});
    }

    modalChangeClose = () => {
        this.setState({change: closeChangeModal});
    }

    modalAddSuccess = people => {
        const data = [...this.state.data]
        const lastKey = data.length === 0 ? 0 : data[data.length - 1].key;
        const pp = {key: lastKey + 1, ...people, buttons: people => this.generateFunc(people)}
        data.push(pp)
        this.setState({data, add:closeAddModal});
    }

    modalChangeSuccess = people => {
        const data = [...this.state.data]
        const changeData = data.map(dt => {
            if(dt.key === people.key){
                dt = { ...dt, lastName: people.lastName,
                    firstName: people.firstName, middleName: people.middleName};
            }
            return dt;
        })
        this.setState({data: changeData});
        this.setState({change: closeChangeModal});

    }



    render() {
        const { fields, data, filterData, delete:del, add, change} = this.state;
        const { deleteModal} = del;
        const { addModal } = add;
        const { changeModal, people } = change;
        const items = this.searchData(data,filterData);
        return (
            <React.Fragment>
                {deleteModal && (<ModalMy show={deleteModal} modalDeleteClose={this.modalDeleteClose} modalSuccess={this.modalSuccess}/>)}
                {addModal && (<ModalAdd show={addModal} modalAddClose={this.modalAddClose} modalAddSuccess={this.modalAddSuccess}/>)}
                {changeModal && (<ModalChange show={changeModal} people={people} modalChangeClose={this.modalChangeClose} modalChangeSuccess={this.modalChangeSuccess}/>)}
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