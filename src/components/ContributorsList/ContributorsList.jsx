import React, { Component } from 'react';
import { Button, Table, Grid, Popup, Portal, Checkbox} from 'semantic-ui-react'
import AddContributorForm from '../AddContributorForm/AddContributorForm'
import * as contributorApi from '../../services/contributorService'

class ContributorsList extends Component {
    state = { 
        contributors: [],
        addContributor: false
    }

    renderAddContributor = () => {
        this.setState({addContributor: !this.state.addContributor})
    }

    async componentDidMount(){
        const contributors = await contributorApi.getContributors(this.props.projectId)
        this.setState({contributors})
    }

    handelAddContributor = async contributorData => {
        const contributor = await contributorApi.addContributor(this.props.projectId, contributorData)
        this.setState({contributors: [...this.state.contributors, contributor]},
            ()=>this.props.history.push(`/projectdetails/${this.props.projectId}`))
    }

    handleDeleteContributor = async(contributorId, userId) => {
        await contributorApi.deleteContributor(this.props.projectId, contributorId, userId)
        this.setState({ contributors: this.state.contributors.filter(c=> c._id !== contributorId)},
         ()=> this.props.history.push(`/projectdetails/${this.props.projectId}`))
    }

    render() { 
        const {contributors} = this.state
        return ( 
            <>
            <Table striped selectable collapsing>
                 <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>User</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell>Admin</Table.HeaderCell>
                        <Table.HeaderCell>Remove</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
            <Table.Body>
                {contributors.length ? contributors.map((contributor,idx) =>
                     <Table.Row key={idx} >
                     <Table.Cell >{contributor.user ? contributor.user.name : 'loading'}</Table.Cell>
                     <Table.Cell >{contributor.user ? contributor.user.email: 'notloading'}</Table.Cell>
                     <Table.Cell><Checkbox toggle checked={contributor.isAdmin}/></Table.Cell>
                     <Table.Cell key={`delete-${idx}`}><Button onClick={()=>this.handleDeleteContributor(contributor._id, contributor.user._id)} icon='eraser'/></Table.Cell>
                 </Table.Row>
                    )  : <Table.Row></Table.Row>}
            </Table.Body>
            </Table>
            <div>
                <Grid>
                    <Grid.Column textAlign="center">
                            <Popup content="Click to add a Contributors" 
                            trigger={<Button onClick={this.renderAddContributor} 
                                size='tiny' 
                                color='blue' 
                                icon='plus'
                                content='Contributor'
                                disabled={this.state.addContributor}
                                />} 
                            />
                    </Grid.Column>
                </Grid>       
            </div>
                <Portal onClose={this.renderAddContributor} open={this.state.addContributor} >
                        <AddContributorForm 
                            renderAddContributor={this.renderAddContributor}
                            handelAddContributor={this.handelAddContributor}
                        />
                </Portal>
           </>
         );
    }
}
 
export default ContributorsList;



