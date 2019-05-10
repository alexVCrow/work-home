import React, {Component} from 'react';
import TableHeader from '../elements/tableheader';
import TableBody from "../elements/tablebody";
// import GroupButtons from "../elements/groupButtons";
import Search from "../elements/search";
import ModalAdd from "../elements/modalAdd";
import withUserService from "../service/withUserService";
import Spinner from "../spinner/spinner";
// import withData from "../service/withData";

const closeAddModal = {addModal: false, people:'',
    typeModal:'',closeModal:'',successModal:'',textTitle:'', textButton:''};

class Main extends Component {
    state = {
        fields: [],
        data: [], filterData: '',
        add: {addModal: false, people:'', typeModal:'',closeModal:'',
            successModal:'', textTitle:'', textButton:''},
        spinner: true
    };

    componentDidMount() {
        const {userService} = this.props;
        setTimeout(() => {
            Promise.all([
                userService.getData(),
                userService.getFields()
            ]).then(([data, fields]) => {
                this.setState({data, fields, spinner: false});
            })
        }, 1000);
    }

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
        const pp = {key: lastKey + 1, ...people};
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
        const { fields, filterData, add, data, spinner} = this.state;
        const { addModal} = add;
        const items = this.searchData(data,filterData);
        if(spinner)
            return <Spinner/>;
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
                        <TableBody data={items} onDelete={this.onDelete} onChange={this.onChange}/>
                    </table>
                </div>)}
            </React.Fragment>
        )
    }
}

export default withUserService(Main);