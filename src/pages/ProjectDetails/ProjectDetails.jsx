import React, { Component } from 'react';
import { Message, Form, Button, Divider, Segment, TextArea, } from 'semantic-ui-react'
import * as projectApi from '../../services/projectService'
import "./ProjectDetails.css";
import FeatureDetails from '../../components/FeatureDetails/FeatureDetails'
import ContributorsList from '../../components/ContributorsList/ContributorsList'



class ProjectDetails extends Component {
    state = {
        project: {},
        commentsFormData: {
            comments: ''
            
        },

        featureFormData: {
            feature: '',
            description: '',
        },

        contributorFormData:{
            contributor:''
        }
    }

    async componentDidMount(){
        const project = await projectApi.getOneProject(this.props.match.params.projectId)
        this.setState({project})
    }

    handelAddContributor = async (project_id, contributor) => {
        await projectApi.addProjectContributors(project_id, contributor)
        const project = await projectApi.getOneProject(this.props.match.params.projectId)
        this.setState({project},
            ()=> this.props.history.push(`/projectdetails/${this.state.project._id}`))
    }

    handleAddComment = async (project_id, comment) => {
        await projectApi.addProjectComments(project_id, comment)
        const project = await projectApi.getOneProject(this.props.match.params.projectId)
        this.setState({project},
            () => this.props.hisotry.push(`/projectdetails/${this.state.project._id}`))
    }

    handleAddFeature = async (project_id, feature) => {
        await projectApi.addProjectFeature(project_id, feature)
        const project = await projectApi.getOneProject(this.props.match.params.projectId)
        this.setState({project},
            () => this.props.history.push(`/projectdetails/${this.state.project._id}`))
    }

    
    handleChangeContributors = e => {
        const contributorFormData = {...this.state.contributorFormData, [e.target.name]: e.target.value};
        this.setState({
         contributorFormData
        });
     }
    
     handleChangeFeatures = e => {
        const featureFormData = {...this.state.featureFormData, [e.target.name]: e.target.value};
        this.setState({
         featureFormData
        });
     }

     handleChangeComment = e => {
        const commentsFormData = {...this.state.commentsFormData, [e.target.name]: e.target.value};
        this.setState({
         commentsFormData
        });
     }
    

    handleSubmitFeatures = e =>{
        e.preventDefault();
        this.handleAddFeature(this.props.match.params.projectId, this.state.featureFormData)
    
    }

    handleSubmitContributors = e => {
        e.preventDefault()
        this.handelAddContributor(this.props.match.params.projectId, this.state.contributorFormData)
    }

    handleSubmitComment = e => {
        e.preventDefault()
        this.handleAddComment(this.props.match.params.projectId, this.state.commentsFormData)
    }



    formRef = React.createRef()
    
    render() { 
        const {features} = this.state.project
        return ( 
    <>
  
    <h1>Project Details Page</h1>
    <Segment textAlign='center'>
            <h1>
                {this.state.project.name}
                </h1>
    </Segment>
    
    <Segment>
        <h2>Feature List:</h2>
        {features ? 
        <>
            <FeatureDetails features ={features}/> 
        </> 
        : ''}

    </Segment>

    <Segment  textAlign='left' className='AddProject'>
            <h1>Add Features:</h1>
        <Form ref={this.formRef} onSubmit={this.handleSubmitFeatures}>
          <Form.Group>
            <Form.Input
              placeholder='Feature Name'
              name='feature'
              value={this.state.featureFormData.feature}
              onChange={this.handleChangeFeatures}
            />
            </Form.Group>
            <Form.Group> 
            <Form.Input
              id='form-textarea-control-opinion'
              placeholder='Add a description'
              control={TextArea}
              label='Description'
              name='description'
              value={this.state.featureFormData.description}
              onChange={this.handleChangeFeatures}
            />
            </Form.Group>
            <Form.Group>
            <Form.Button type='submit' content='Submit' 
            />
          </Form.Group>
        </Form>
      </Segment>
      <Segment>   
          <h2> Contributors:</h2>
     
        {this.state.project.contributors ? 
            <>
                {this.state.project.contributors.map(contributor =>
                    <ContributorsList key={contributor._id} contributor={contributor}/>
                    )}
            </>
            :
            <>
                <div>Not loaded</div>
            </>
        }

      </Segment>
      <Segment  textAlign='left' className='AddProject'>
            <h1>Add Contributors:</h1>
        <Form ref={this.formRef} onSubmit={this.handleSubmitContributors}>
          <Form.Group>
            <Form.Input
              placeholder='enter email address'
              name='contributor'
              value={this.state.contributorFormData.contributor}
              onChange={this.handleChangeContributors}
            />
            </Form.Group>
            <Form.Group>
            <Form.Button type='submit' content='Submit' 
            />
          </Form.Group>
        </Form>
      </Segment>
    <Message>
        <Form ref={this.formRef} onSubmit={this.handleSubmitComment}>
            <Form.Field>
                <label>Comments:</label>
                <Form.Input
                    placeholder='Add comments here...'
                    name='comments'
                    value={this.state.commentsFormData.comments}
                    onChange={this.handleChangeComment}
                />
            </Form.Field>
            <Button type='submit'>Submit</Button>
            <Divider horizontal>Comments</Divider>
        </Form>
    </Message>
    </>
        );
    }
}

export default ProjectDetails;