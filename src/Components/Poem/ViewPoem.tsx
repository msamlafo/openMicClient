import React, { Component } from 'react';
import { Card, Button, Badge, CardTitle, CardText, CardSubtitle } from 'reactstrap';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';
import CreatePoem from './CreatePoem';
// import DeletePoem from './DeletePoem';
import UpdatePoem from './UpdatePoem';
import DeletePoem from './DeletePoem';
import { Poetry, PoetryDefaultObject, poetryFormField, BrowserRouterPropsType } from '../../Common/TypeConfig';

type ViewPoemProps = BrowserRouterPropsType;

type ViewPoemState = {
    poems:  Poetry[],
    poemToEdit: Poetry,
    showUpdateModal: boolean,
    showCreateModal: boolean,
}

class ViewPoem extends Component <ViewPoemProps, ViewPoemState>{
  constructor(props: ViewPoemProps) {
    super(props);
    this.state = {
      poems: [],
      poemToEdit: PoetryDefaultObject,
      showCreateModal: false,
      showUpdateModal:false,
    };
  }

  getPoem = () => {
    const API_URL = `${process.env.REACT_APP_API_URL}/poetry/mine`;
    fetch(`${API_URL}`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'applicaiton/json',
       'Authorization': localStorage.getItem("token") || ''
      }),
    })
      .then((result) => result.json())
      .then((response) => {
        if (response.status === 200) {
          const myPoem:any = [];

          response.data.map((poem:any, i:number) => {
            return myPoem.push({
              id: poem.id,
              title: poem.title,
              author:
                poem.author.user?.profile?.firstName +
                ' ' +
                poem.author.user?.profile?.lastName,
              category: poem.category,
              writeUp: poem.writeUp,
            });
          });
          this.setState({ poems: myPoem });
        }
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {     
    this.getPoem();
  }

  handleUpdateToggle = () => {
    this.setState({showUpdateModal : !this.state.showUpdateModal});
  };

  handleCreateToggle = () => {
    this.setState({showCreateModal : !this.state.showCreateModal});
  };

  handleUpdate = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    
    const updateData = this.state.poemToEdit;
    
    const updatePoem = () => {
        const API_URL = `${process.env.REACT_APP_API_URL}/poetry/${updateData.id}`;
      fetch(`${API_URL}`, {
        method: 'PUT',
        body: JSON.stringify(updateData),
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token') || '',
        }),
      })
        .then((result) => result.json())
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            console.log('hurray component is next');
            this.handleUpdateToggle();
            return this.props.history.push('/ViewPoem');
          }
        });
    };
    updatePoem();
  };

  handleCreate = () =>{
    this.handleCreateToggle();
  }

//   handleDelete = (poem) => {
//     console.log(poem);
//     const poems = this.state.poems.filter((p) => p.id !== poem.id);
//     this.setState({ poems });
//   };  

  handleChange = (event: React.FormEvent<HTMLSelectElement | HTMLInputElement>) => {
    const value = event.currentTarget.value;
    const poemToEdit = { ...this.state.poemToEdit };
    poemToEdit[event.currentTarget.name as poetryFormField] = value;
    this.setState({ poemToEdit });
  };

  renderPoem() {
      const {poems} = this.state;
      const count = poems.length;
    return count === 0 ? (
      <div className="p-3 bg-info my-2 rounded">
        <Toast>
          <ToastHeader>openMic Poems</ToastHeader>
          <ToastBody>You do not have any poems. Create a new poem</ToastBody>
          {/* insert CreatePoem button here */}
          <Button onClick={() => this.handleCreateToggle()} color="dark">Create poem</Button>
        </Toast>
      </div>
    ) : (
        <React.Fragment>
            <h5>You have 
                <span> <Badge color="primary" >
                    {count} 
                     </Badge>{" "}
                 </span> 
                    poems.</h5>


            {poems.map((p:any, i:number) => (
              <Card body outline color="primary" className="m-2">
                <CardTitle tag="h5"> {p.title} </CardTitle>
                <CardSubtitle className="mb-2 text-muted">
                  Category: {p.category}
                </CardSubtitle>
                <CardSubtitle className="mb-2 text-muted">by {p.author}</CardSubtitle>
                <CardText> {p.writeUp} </CardText>
                <Button
                  color="primary"
                  className="mb-2"
                  onClick={() => this.handleUpdateToggle()}
                >
                  Edit Poem
                </Button>
                <DeletePoem poetryId={p.id} />
              </Card>
            ))}
        </React.Fragment>
    );
  }

  render() {
    return (
    <main className="container">
        {this.renderPoem()}
        <UpdatePoem 
            poem={this.state.poemToEdit}
            showModal={this.state.showUpdateModal}
            onToggle={this.handleUpdateToggle}
            onChange={this.handleChange}
            onSubmit={this.handleUpdate}
        />
        {/* <CreatePoem 
          showModal={this.state.showModal}
          onToggle={this.handleToggle}
        /> */}
    </main>
    );
  }
}

export default ViewPoem;
