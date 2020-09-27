import React, { Component } from 'react';
// import ProjectBoard from '../../pages/ProjectBoard/ProjectBoard'
import TaskCard from '../../components/TaskCard/TaskCard'
import TaskCardEM from '../../components/TaskCard(EMode)/TaskCard(EMode)'

import { Grid, Divider,  Button, Popup } from 'semantic-ui-react'
import "./ProjectBoard.css";
import * as projectApi from '../../services/projectService'


class ProjectBoard extends Component {
    state = { 
        tasks: [],
        addTask: true,
        project: {},
        projectId: this.props.match.params.projectId,
        featureId: this.props.match.params.featureId
     }
    
   


    render() { 
        const {featureId, projectId} = this.state
        return ( 
            <>
            <h1>Project Board Page</h1>
            <Divider>
            </Divider>
            <Grid columns={3} divided>
                <Grid.Row>
                    <Grid.Column>
                        <h1>Backlog:</h1>
                            {this.state.tasks? this.state.tasks.map( task => 
                                
                                <>
                                    {task.taskStatus === 'Backlog' ? 

                                        <TaskCard 
                                        key={task._id}
                                        task={task}
                                        projectId={projectId}
                                        featureId={featureId}
                                        handleDeleteTask={this.handleDeleteTask}
                                        handleUpdateTask={this.handleUpdateTask} 
                                        renderAddTask={this.renderAddTask}
                                        handleUpdateTaskStatus={this.handleUpdateTaskStatus}
                                        owner = {this.state.project.owner._id ? this.state.project.owner : 'not loading'}
                                        contributors = {this.state.project.contributors.length? this.state.project.contributors : ''}
                                        />
                                        :
                                        ''                                  
                                    }
                                </>

                            
                            ):
                            ''
                            }
                            {this.state.addTask ?  
                            <>
                                 <div>
                                    <Grid>
                                    <Grid.Column textAlign="center">
                                        <Popup content="Click to add a Task" trigger={<Button 
                                        onClick={this.renderAddTask} 
                                        size='tiny'
                                        content='Add Task' 
                                        color='blue' 
                                        icon="plus"/>} />
                                    </Grid.Column>
                                    </Grid>
                                </div>
                            </>
                            : 
                            <>  
                                <TaskCardEM 
                                handleAddTask={this.handleAddTask} 
                                renderAddTask={this.renderAddTask}
                                owner = {this.state.project.owner._id ? this.state.project.owner : 'not loading'}
                                contributors = {this.state.project.contributors.length? this.state.project.contributors : ''}
                                projectId={projectId} 
                                featureId={featureId}/>
                            
                            </>    
                            }
                            </Grid.Column>
                            <Grid.Column>
                        <h1>In Progress:</h1>
                        {this.state.tasks? this.state.tasks.map( task => 
                                
                                <>
                                    {task.taskStatus === 'In Progress' ? 

                                        <TaskCard 
                                        key={task._id}
                                        task={task}
                                        projectId={projectId}
                                        featureId={featureId}
                                        handleDeleteTask={this.handleDeleteTask}
                                        handleUpdateTask={this.handleUpdateTask} 
                                        renderAddTask={this.renderAddTask}
                                        handleUpdateTaskStatus={this.handleUpdateTaskStatus}
                                        />
                                        :
                                       ''                                  
                                    }
                                </>

                            
                            ):
                            ''
                            }
                    </Grid.Column>
                    <Grid.Column>
                        <h1>Completed:</h1>
                        {this.state.tasks? this.state.tasks.map( task => 
                                
                                <>
                                    {task.taskStatus === 'Completed' ? 

                                        <TaskCard 
                                        key={task._id}
                                        task={task}
                                        projectId={projectId}
                                        featureId={featureId}
                                        handleDeleteTask={this.handleDeleteTask}
                                        handleUpdateTask={this.handleUpdateTask} 
                                        renderAddTask={this.renderAddTask}
                                        handleUpdateTaskStatus={this.handleUpdateTaskStatus}
                                        />
                                        :
                                       ''                                  
                                    }
                                </>

                            
                            ):
                            ''
                            }
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            </>
         );
    }
}
 
export default ProjectBoard;
