import { Button, Card, Container, Placeholder, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

const PageCategories = () => {

    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState("")

    useEffect(() => {
        setIsLoading(true)
        axios.get('https://fakestoreapi.com/users')
            .then((response) => {
                setUsers(response.data)
                // console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    return (
        <Container>
            <h3 className='text-center my-5'>Users</h3>
            <div className='d-flex justify-content-center gap-5'>
                <div className='w-75'>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                isLoading ?
                                    <tr>
                                        <th><Placeholder xs={8} /></th>
                                        <th><Placeholder xs={12} /></th>
                                        <th><Placeholder xs={12} /></th>
                                        <th><Placeholder xs={12} /></th>
                                        <th><Placeholder xs={12} /></th>
                                    </tr> :
                                    users.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.username}</td>
                                                <td>{item.email}</td>
                                                <td>{item.phone}</td>
                                                <td><Button onClick={() => setUser(item)}>Detail</Button></td>
                                            </tr>
                                        )
                                    })
                            }
                        </tbody>
                    </Table>
                </div>
                <div className='w-25'>
                    {
                        user ?
                            <div>
                                <Card style={{ width: '22rem' }}>
                                    <Card.Body>
                                        <Card.Title className='text-center mb-3'>Detail</Card.Title>
                                        <Card.Text className='d-flex gap-5' >
                                            <div>
                                                <p>Username </p>
                                                <p>First Name </p>
                                                <p>Last Name </p>
                                                <p>Email </p>
                                                <p>Phone </p>
                                            </div>
                                            <div>
                                                <p>: {user.username}</p>
                                                <p>: {user.name.firstname}</p>
                                                <p>: {user.name.lastname}</p>
                                                <p>: {user.email}</p>
                                                <p>: {user.phone}</p>
                                            </div>
                                        </Card.Text>

                                        <h5 className='text-center mb-3'>Adress</h5>

                                        <Card.Text className='d-flex gap-5' >
                                            <div>
                                                <p>City</p>
                                                <p>Geolocation</p>
                                                <p>Number</p>
                                                <p>Street</p>
                                                <p>Zipcode</p>
                                            </div>
                                            <div>
                                                <p>: {user.address.city}</p>
                                                <p>: {user.address.geolocation.lat} {user.address.geolocation.long}</p>
                                                <p>: {user.address.number}</p>
                                                <p>: {user.address.street}</p>
                                                <p>: {user.address.zipcode}</p>
                                            </div>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </div>
                            :
                            <div style={{ height: '100px', width: '22rem' }} className='d-flex justify-content-center align-content-center border flex-wrap'>
                                <p>Click Detail</p>
                            </div>

                    }
                </div>
            </div>
        </Container >
    )
}

export default PageCategories