const url = "http://localhost:8000/api/";

export default {

    showNotes: () => 
        fetch(url + 'notes/'),

    createNotes (note) {
        let data = { title: note["title"], body: note["body"] };
        fetch(url + 'notes/',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).catch((err) => {
            console.log("The request couldn't get created created because of following error! "+ err)
        });
        console.log("Request with following data created! " + JSON.stringify(data));
    },

    updateNotes: (id, note) => {
        let data = { title: note["title"], body: note["body"] };
        fetch(url + 'notes/'+ id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).catch((err) => {
            console.log("The request couldn't get created created because of following error! "+ err)
        });
        console.log("Request with following data created! " + JSON.stringify(data))
    },

    deleteNotes: (id) => {
        fetch(url + 'notes/' + id, {
            method: 'DELETE'
        }).catch((err) => {
            console.log("The request couldn't get created created because of following error! "+ err)
        });
        console.log("Record deleted!")
    }
}