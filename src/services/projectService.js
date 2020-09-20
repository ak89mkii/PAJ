import tokenService from './tokenService'
const BASE_URL = '/api/projects'

export function getAllProjects(){
    return fetch(BASE_URL,{
          headers: { Authorization: "Bearer " + tokenService.getToken() },
        },
        { mode: "cors" }
      ).then((res) => res.json());
}

export function createProject(project){
    return fetch(BASE_URL, {
        method: "POST",
        headers: {'content-type': 'application/json','Authorization': 'Bearer ' + tokenService.getToken()},
        body: JSON.stringify(project)
    }, {mode: "cors"})
    .then(res => res.json())
}

export function getOneProject(project_id){
    return fetch(`${BASE_URL}/${project_id}`,{
        headers: { Authorization: "Bearer " + tokenService.getToken() },
    },{mode: 'cors'})
    .then(res => res.json())
}

export function addProjectFeature(project_id, feature){
    return fetch(`${BASE_URL}/${project_id}/features`,{
        method: 'POST',
        headers: {'content-type': 'application/json','Authorization': 'Bearer ' + tokenService.getToken()},
        body: JSON.stringify(feature)
    })
    .then(res => res.json())
}

export function addProjectContributors(project_id, contributor){
    console.log(contributor)
    return fetch(`${BASE_URL}/${project_id}`,{
        method: 'PUT',
        headers: {'content-type': 'application/json','Authorization': 'Bearer ' + tokenService.getToken()},
        body: JSON.stringify(contributor)
    })
    .then(res => res.json())
}

export function addProjectComments(project_id, comment){
    return fetch(`${BASE_URL}/${project_id}/comments`, {
        method: 'POST',
        headers: {'content-type': 'application/json','Authorization': 'Bearer ' + tokenService.getToken()},
        body: JSON.stringify(comment)
    }, {mode: "cors"})
    .then(res => res.json())
    
}

export function deleteFeature(project_id, feature_id){
    return fetch(`${BASE_URL}/${project_id}/features/${feature_id}`,{
        method: 'DELETE',
        headers: {'Authorization': 'Bearer ' + tokenService.getToken()}
    }, {mode: "cors"})
    .then(res => res.json());
}

export function addFeatureTask(project_id, feature_id, task){
    return fetch(`${BASE_URL}/${project_id}/features/${feature_id}/tasks`,{
        method: 'POST',
        headers: {'content-type': 'application/json','Authorization': 'Bearer ' + tokenService.getToken()},
        body: JSON.stringify(task)
    })
    .then(res => res.json())
    
}

export function getALlTasks(project_id, feature_id){
    return fetch(`${BASE_URL}/${project_id}/features/${feature_id}/tasks`,{
        headers: {'content-type': 'application/json','Authorization': 'Bearer ' + tokenService.getToken()},
    })
    .then(res => res.json())
}

export function updateFeatureTask(project_id, feature_id, task_id, task){
    return fetch(`${BASE_URL}/${project_id}/features/${feature_id}/tasks/${task_id}`,{
        method: 'PUT',
        headers: {'content-type': 'application/json','Authorization': 'Bearer ' + tokenService.getToken()},
        body: JSON.stringify(task)
    })
    .then(res => res.json())
}

export function deleteFeatureTask(project_id, feature_id, task_id){
    return fetch(`${BASE_URL}/${project_id}/features/${feature_id}/tasks/${task_id}`,{
        method: 'DELETE',
        headers: {'content-type': 'application/json','Authorization': 'Bearer ' + tokenService.getToken()},
    })
    .then(res => res.json())
}