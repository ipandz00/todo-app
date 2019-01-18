import axios from 'axios';
const env = process.env.NODE_ENV || 'development';
let urlPrefix = window.location.origin;
if(env === 'development') {
	urlPrefix = 'http://localhost:8081';
}

export function getTasks() {
	return new Promise((resolve, reject) => {
		axios.get(urlPrefix + '/api/tasks')
		.then((data) => {
			if(data.status === 200) {
				resolve(data.data);
			}
			else {
				reject(data.statusText);
			}
		})
		.catch((err) => {
			reject(err);
		});

	});
}

export function getTask( id ) {
	return new Promise((resolve, reject) => {
		axios.get(urlPrefix + '/api/tasks/' + id)
		.then((data) => {
			if(data.status === 200) {
				resolve(data.data);
			}
			else {
				reject(data.statusText);
			}
		})
		.catch((err) => {
			reject(err);
		});
	});
}

export function updateTask( id, title, description) {
	return new Promise((resolve, reject) => {
		axios.put(urlPrefix + '/api/tasks/' + id,
		{
			title: title,
			description: description
		}).then((response) => {
			resolve(response.data);
		}).catch((err) => {
			reject(err);
		});
	});
}

export function deleteTasks( ids) {
	return new Promise((resolve, reject) => {
		axios.delete(urlPrefix + '/api/tasks',
		{
			data: {
				taskIds: ids
			}
		}).then((response) =>{
			resolve(response.data);
		})
		.catch((err) => {
			reject(err);
		})

	});
}

export function createTask( title, description ) {
	return new Promise((resolve, reject) => {
		axios.post(urlPrefix + '/api/tasks', 
		{
		   title: title,
		   description: description
		})
		.then((response) => {
			resolve(response.data);
		})
		.catch((err) => {
			reject(err)
		})
	});
}