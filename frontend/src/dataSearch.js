import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, ButtonGroup, Container, Form, FormGroup, Input, Label, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';

class dataSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {studData: []};
    }
    
    async componentDidMount() {
        const student = await (await fetch(`/vaccinestatus/get?name=${new URLSearchParams(this.props.location.search).get("name")}`)).json();
        this.setState({studData: student});
    }

    async remove(id) {
        await fetch(`/vaccinestatus/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedData = [...this.state.studData].filter(i => i.id !== id);
            this.setState({studData: updatedData});
        });
    }

    render() {
        const {studData, isLoading} = this.state;

        if(isLoading){
            return <p>Loading...</p>
        }
        
        const studentList = studData.map(student => {
            var fvdate = "-", svdate = "-";
            if(student['firstVaccineDate'] != null)
                fvdate = new Date(student['firstVaccineDate']).toISOString().replace(/T.+/, '');
            if(student['secondVaccineDate'] != null)
                svdate = new Date(student['secondVaccineDate']).toISOString().replace(/T.+/, '');

            return <tr key={student.id}>
            <td style={{whiteSpace: 'nowrap'}}>{student.name}</td>
            <td>{student.branch}</td>
            <td>{student.yearOfStudy}</td>
            <td>{student.vaccinationName}</td>
            <td>{fvdate}</td>
            <td>{svdate}</td>
            <td>
                <ButtonGroup>
                <Button size="sm" color="primary" tag={Link} to={"/vaccinestatus/" + student.id}>Edit</Button>
                <Button size="sm" color="danger" onClick={() => this.remove(student.id)}>Delete</Button>
                </ButtonGroup>
            </td>
            </tr>
        });

        const rowise = {
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start"
        }
        
        return (  
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right" style={rowise}>
                        <Button color="success" tag={Link} to="/vaccinestatus/new" style={{margin: "10px 80px 0px 5px"}}>Add student data</Button>
                        <Form>
                            <FormGroup style={rowise}>
                            <Input type="text" name="name" size="65" id="search" placeholder="Search Here" style={{margin: "10px 0px 0px 0px"}}/>
                            <Button color="primary" type="submit" style={{margin: "10px 0px 0px 10px"}}>Submit</Button>
                            </FormGroup>
                        </Form>
                    </div>
                    <br></br>
                    <h3>Student Data</h3>
                    <Table className="mt-7">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Branch</th>
                            <th>Year Of Study</th>
                            <th>vaccination Name</th>
                            <th>First Vaccination Date</th>
                            <th>Second Vaccination Date</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {studentList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}
export default withRouter(dataSearch);