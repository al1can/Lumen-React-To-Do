import { React, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive';
import { Card, Button } from 'react-bootstrap';
import Template from './Template.js'
import Edit from './Edit.js'
import Create from './Create.js'
import api from '../api.js'

const Index = () => {
    const [notes, setNotes] = useState(null);
    const [state, setState] = useState('');

    const showNotes = () => {
        api.showNotes()
            .then(res => res.json())
            .then(data => {
                let resolve = data.data;
                setNotes(resolve);
            });
    }

    const deleteNotes = (id) => {
        api.deleteNotes(id);
        showNotes();
        setState({});

    }

    useEffect(() => {
        showNotes();
    }, []);

    /*
    setMobileScreen(useMediaQuery({ query: '(max-width: 576px)' }));
    setTabletScreen(useMediaQuery({ query: '(max-width: 768px)' }));
    
    if (mobileScreen) { setResponsive("w-100 d-inline-block") }
    else if (tabletScreen) { setResponsive("w-50 d-inline-block") }
    else { setResponsive("w-25 d-inline-block") }
    */
    /*
    const handleTitleChange = (e) => {
         note.title = e;
    }
 
     const handleBodyChange = (e) => {
         note.body = e;
     }
     */

    const toggleEditModal = () => {
        showNotes();
    }

    const renderNotes = () => {
        if (!notes || notes.length === 0) {
            return (
                <h5 className="d-flex text-align-center justify-content-center"> {!notes ? "Loading..." : "You don't have any notes."}</h5>
            );
        }

        /*
        return notes.map((note) => (
            <div className="col-12 col-sm-6 col-md-3" key={note.id}>
            <Card>
            <Card.Body>
            <Card.Title>{note.title}</Card.Title>
            <Card.Text>{note.body}</Card.Text>
            <div className="d-flex gap-2">
            <Edit id={note.id} titleValue={note.title} bodyValue={note.body} onChangeTitle={handleTitleChange} onChangeBody={handleBodyChange}/>
            <Button
            className="btn btn-danger"
            onClick={() => deleteNotes(note.id)}
            >Delete</Button>
            </div>
            </Card.Body>
            </Card>
            </div>
            ));
            */
        let title = '';
        let body = '';

        //titles = notes.map(({title}) => title)

        return (() => notes.map((note) => {
            title = note.title;
            body = note.body;

            const handleTitleChange = (e) => {
                note.title = e;
                //title = e;
                setState({});
            }

            const handleBodyChange = (e) => {
                note.body = e;
                //body = e;
                setState({});
            }

            return (
                <div className="col-12 col-sm-6 col-md-3" key={note.id}>
                    <Card>
                        <Card.Body>
                            <Card.Title>{note.title}</Card.Title>
                            <Card.Text>{note.body}</Card.Text>
                            <div className="d-flex gap-2">
                                <Edit id={note.id} title={note.title} body={note.body} onChangeTitle={handleTitleChange} onChangeBody={handleBodyChange} toggleModalShow={toggleEditModal} />
                                <Button
                                    className="btn btn-danger"
                                    onClick={() => deleteNotes(note.id)}
                                >Delete</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            )

        }))();
    }

    const onCreate = () => {
        showNotes();
        setState({});
    }

    return (
        <div>
            <Template title="Home">
                <div className="container pt-5">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h5>Notes</h5>
                            <Create onCreate={onCreate} />
                        </div>
                        <div className="card-body row g-2">
                            {renderNotes()}
                        </div>
                    </div>
                </div>
            </Template>

        </div>
    )
}

export default Index