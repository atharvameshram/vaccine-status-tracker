import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class dataEdit extends Component {

    emptyItem = {
        name: '',
        branch: '',
        yearOfStudy: '',
        vaccinationName: '',
        firstVaccinationDate: '',
        secondVaccinationDate: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const student = await (await fetch(`/vaccinestatus/${this.props.match.params.id}`)).json();
            this.setState({item: student});
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;
        // item.firstVaccinationDate = new Date(item.firstVaccinationDate);
        // item.secondVaccinationDate = new Date(item.secondVaccinationDate);

        await fetch('/vaccinestatus' + (item.id ? '/' + item.id : ''), {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/vaccinestatus');
    }

    render() {
        const {item} = this.state;
        const title = <h2>{item.id ? 'Edit Student data' : 'Add Student data'}</h2>;
        
        var fvdate, svdate ;    
        if(item['firstVaccineDate'] != null)
            fvdate = new Date(item['firstVaccineDate']).toISOString().replace(/T.+/, '');
        if(item['secondVaccineDate'] != null)
            svdate = new Date(item['secondVaccineDate']).toISOString().replace(/T.+/, '');
        
        return <div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" value={item.name || ''}
                               onChange={this.handleChange} autoComplete="name"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="branch">Branch</Label>
                        <Input type="text" name="branch" id="branch" value={item.branch || ''}
                               onChange={this.handleChange} autoComplete="branch"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="yearOfStudy">Year of study</Label>
                        <Input type="text" name="yearOfStudy" id="yearOfStudy" value={item.yearOfStudy || ''}
                               onChange={this.handleChange} autoComplete="yearOfStudy"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="vaccinationName">Vaccination Name</Label>
                        <Input type="text" name="vaccinationName" id="vaccinationName" value={item.vaccinationName || ''}
                               onChange={this.handleChange} autoComplete="vaccinationName"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="firstVaccinationDate">First Vaccination Date</Label>
                        <Input type="text" name="firstVaccinationDate" id="firstVaccinationDate" defaultValue={fvdate}
                               onChange={this.handleChange} autoComplete="firstVaccinationDate"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="secondVaccinationDate">Second Vaccination Date</Label>
                        <Input type="text" name="secondVaccinationDate" id="secondVaccinationDate" defaultValue={svdate}
                               onChange={this.handleChange} autoComplete="secondVaccinationDate"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/vaccinestatus">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}
export default withRouter(dataEdit);