import {parse, v4 as uuidv4} from 'uuid'

import styles from './Project.module.css'

import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'

import Loading from '../layout/Loading'
import Container from '../layout/Container'
import Message from '../layout/Message'
import ProjectForm from '../project/ProjectForm'
import ServiceForm from '../service/ServiceForm'
import ServiceCard from '../service/ServiceCard'

function Project(){
    const {id} = useParams()
   
    const [project, setProject] = useState([])
    const [services, setServices] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()

    useEffect(() => {

        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(resp => resp.json())
        .then((data) => {
            setProject(data)
            setServices(data.services)
        })
        .catch((err) => console.log) 
    }, [id])

    function editPost(project){
        setMessage('')
        // budget validation
        if(project.budget < project.cost) {
            setMessage('The budget cannot be higher than the cost of the project')
            setType('error')
            return false
        }

        fetch(`http://localhost:5000/projects/${project.id}`,{
            method: 'PATCH',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        })
        .then(resp => resp.json())
        .then((data)=> {
            setProject(data)
            setShowProjectForm(false)
            setMessage('Uptaded project!')
            setType('success')
        })
        .catch(err => console.log(err))

    }

    function createService(project){
        setMessage('')
        //last service
        const lastService = project.services[project.services.length - 1]

        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost

        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        // maximum value validation
        if(newCost > parseFloat(project.budget)){
            setMessage('Budget exceeded, check the value of the service')
            setType('error')
            project.services.pop()
            return false
        }

        // add service cost to project total cost
         project.cost = newCost

         //uptade project
         fetch(`http://localhost:5000/projects/${project.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
         }).then((resp) => resp.json())
           .then((data) => {
                setShowServiceForm(false)
           })
         .catch(err=> console.log(err))
    }
    
    function removeService (id, cost) {
        
        const serviceUpdated = project.services.filter(
            (service) => service.id !== id
        )

        const projectUpdated = project 

        projectUpdated.services = serviceUpdated
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

        fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
            method: 'PATCH', 
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(projectUpdated)
        }).then((resp)=> resp.json())
        .then((data) => {
            setProject(projectUpdated)
            setServices(serviceUpdated)
            setMessage('Service successfully removed')
        })
        .catch(err => console.log(err))
    } 
    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm(){
        setShowServiceForm(!showServiceForm)
    }

    return (
        <>
            {project.name ? (
                <div className={styles.project_details}>
                    <Container customClass="column">
                        {message && <Message type={type} msg={message}/>}
                        <div className={styles.details_container}>
                            <h1>Project: {project.name}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm}>
                                {!showProjectForm ? 'Edit project' : 'Close'}
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Category</span> {project.category.name}
                                    </p>
                                    <p>
                                        <span>Total Budget:</span> ${project.budget}
                                    </p>
                                    <p>
                                        <span>Total Used:</span> ${project.cost}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <ProjectForm handleSubmit={editPost} btnText="Finish editing" projectData={project}/>
                                </div>
                            )}
                        </div>
                        <div className={styles.service_form_container}>
                                <h2>Add a service:</h2>
                                <button className={styles.btn} onClick={toggleServiceForm}>
                                    {!showServiceForm ? 'Add Service' : 'Close'}
                                </button>
                                <div className={styles.project_info}>
                                    { showServiceForm && 
                                        <ServiceForm
                                        handleSubmit={createService}
                                        btnText="Add Service"
                                        projectData={project}
                                        />
                                    
                                    }
                                </div>
                        </div>
                        <h2>Services</h2>
                        <Container customClass="start">
                            {services.length > 0 && 
                                services.map((service) =>(
                                    <ServiceCard
                                        id={service.id}
                                        name={service.name}
                                        cost={service.cost}
                                        description={service.description}
                                        key={service.id}
                                        handleRemove={removeService}
                                    />
                                ))

                            }
                            {services.length === 0 && <p>There are no services registered.</p>}
                        </Container>
                    </Container>
                </div>
            ) : (   
                <Loading/>
            )}
        </>
    )
}

export default Project