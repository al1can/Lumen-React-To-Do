import React, { useState } from 'react'
import { render } from 'react-dom'
import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap'
import Index from './Index.js'
import api from '../api.js'

function CreateModal(props) {
    const [loading, setLoading] = useState(false);
    const [title, setTitle ] = useState('');
    const [body, setBody ] = useState('');

    const createNote = async () => {
        setLoading(true);
		if (!title.length || !body.length) {
			alert("You didn't provide enough information!")
		} else {
			try {
				let data = {title: title, body: body};
				await api.createNotes(data);
			} catch(err) {
				console.log("Program encounter the following error: "+ err);
				alert("Failed to create post. Try again later!");
			} finally {
				props.onHide();
			}
		}
		props.parent.onCreate();
		setTitle('');
		setBody('');
		setLoading(false);
    }

	return (
		<Modal
            {...props}
			size="lg"
			aria-labelledby="create-modal"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="create-modal">
					Create Your Note
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<InputGroup className="mb-3">
					<InputGroup.Text id="basic-addon2">Title</InputGroup.Text>
					<FormControl
						placeholder="Title..."
						aria-label="Title"
						aria-describedby="basic-addon2"
                        value={ title }
                        onChange={ e => setTitle(e.target.value) }
						required
					/>
				</InputGroup>
				<InputGroup>
					<InputGroup.Text>Note</InputGroup.Text>
					<FormControl
                        as="textarea"
                        placeholder="Note..."
                        aria-label="Note..."
                        value={ body }
                        onChange={ e => setBody(e.target.value) }
						required
                    />
				</InputGroup>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={props.onHide}>Close</Button>
				<Button
                    className="btn btn-success"
                    onClick={ createNote }
                    disable={ loading.toString() }
                >{ loading ? "Loading..." : "Save" }</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default function Create(props) {
	const [modalShow, setModalShow] = React.useState(false);
	
	return (
		<>
			<Button variant="primary" onClick={() => setModalShow(true)}>
				Create
			</Button>

			<CreateModal
				show={modalShow}
				onHide={() => setModalShow(false)}
				parent={props}
			/>
		</>
	);
}