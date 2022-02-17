import React, { useState } from 'react'
import { render } from 'react-dom'
import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap'
import api from '../api.js'

function EditModal(props) {
	const [loading, setLoading] = useState(false);
    //const [title, setTitle ] = useState('');
    //const [body, setBody ] = useState('');

	const updateNotes = async (id) => {
        setLoading(true);
		let title = props.parent.title;
		let body = props.parent.body;
		if (!title.length || !body.length) {
			alert("You didn't provide enough information!")
		} else {
			try {
				await api.updateNotes(id, {title: title, body: body});
			} catch(err) {
				console.log("Program encounter the following error: "+ err);
				alert("Failed to create post. Try again later!");
			} finally {
				props.onHide();
			}
		}
		setLoading(false);
    }

	const handleTitleChange = (e) => {
		props.parent.onChangeTitle(e.target.value);
	}
	
	const handleBodyChange = (e) => {
		props.parent.onChangeBody(e.target.value);
	}

	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="edit-modal"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="edit-modal">
					Edit Your Note
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
			<InputGroup className="mb-3">
					<InputGroup.Text id="basic-addon2">Title</InputGroup.Text>
					<FormControl
						placeholder="Title..."
						aria-label="Title"
						aria-describedby="basic-addon2"
                        value={ props.parent.title }
                        onChange={ handleTitleChange }
						required
					/>
				</InputGroup>
				<InputGroup>
					<InputGroup.Text>Note</InputGroup.Text>
					<FormControl
                        as="textarea"
                        placeholder="Note..."
                        aria-label="Note..."
                        value={ props.parent.body }
                        onChange={ handleBodyChange }
						required
                    />
				</InputGroup>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={props.onHide}>Close</Button>
				<Button
                    className="btn btn-success"
                    onClick={ () => updateNotes(props.parent.id) }
                    disable={ loading.toString() }
                >{ loading ? "Loading..." : "Save" }</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default function Edit(props) {
	const [modalShow, setModalShow] = React.useState(false);

	const toggleModalShow = (bool) => {
		setModalShow(bool);
		props.toggleModalShow();
	}

	return (
		<>
			<Button variant="primary" onClick={() => toggleModalShow(true)}>
				Edit
			</Button>

			<EditModal
				show={modalShow}
				onHide={() => toggleModalShow(false)}
				parent={props}
			/>
		</>
	);
}