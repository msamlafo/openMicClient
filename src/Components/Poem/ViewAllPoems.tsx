import React from 'react';
import {
  Card,
  CardTitle,
  CardText,
  CardSubtitle,
  CardBody,
  CardFooter,
  Col,
  Badge,
  Button,
  Row,
  Alert,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import Like from '../../Common/Like';
import PagesPagination from '../../Common/PagesPagination';
import { Paginate } from '../../Common/Paginate';
import {
  BrowserRouterPropsType,
  Poetry,
  PoetryDefaultObject,
  poetryFormField,
} from '../../Common/TypeConfig';
import CreatePoem from './CreatePoem';
import ListGroup from '../../Common/ListGroup';
import { getCategories } from './PoemCategory';
import SearchBox from '../../Common/SearchBox';
import { hasLoginToken } from '../../Common/Utility';
import { BASE_API_URL } from '../../Common/Environment';
// import CreateComment from './CreateComment';

type ViewAllPoemsProps = BrowserRouterPropsType & {};

type ViewAllPoemsState = {
  poems: Poetry[];
  // poetryId: Poetry
  pageSize: number;
  currentPage: number;
  sort: string;
  categories: any[];
  selectedCategory: any;
  showModal: boolean;
  poemObjectForForm: Poetry;
  path: string;
  searchQuery: any;
};

class ViewAllPoems extends React.Component<
  ViewAllPoemsProps,
  ViewAllPoemsState
> {
  constructor(props: ViewAllPoemsProps) {
    super(props);
    this.state = {
      poems: [],
      pageSize: 3,
      currentPage: 1,
      sort: 'name',
      categories: [],
      selectedCategory: { name: 'All Poems' },
      showModal: false,
      poemObjectForForm: PoetryDefaultObject,
      path: this.props.match.path,
      searchQuery: '',
    };
  }

  handlePageChange = (page: number) => {
    this.setState({ currentPage: page });
  };

  setCategories = () => {
    const categories = [{ name: 'All Poems' }, ...getCategories()];
    this.setState({ categories });
  };

  getPoems = () => {
    const path = this.props.match.path;
    const extraPath = path === '/poetry/mine' ? '/mine' : '';
    const API_URL = `${BASE_API_URL}/poetry${extraPath}`;

    fetch(`${API_URL}`, {
      method: 'GET',
      headers: new Headers({
        Authorization: localStorage.getItem('token') || '',
      }),
    })
      .then((result) => result.json())
      .then((response) => {
        const poems: Poetry[] = [];
        console.log(response.data);
        if (response.data.length > 0) {
          response.data.map((p: any) =>
            poems.push({
              id: p.id,
              title: p.title,
              author:
                p.user?.profile.firstName + ' ' + p.user?.profile.lastName,
              category: p.category,
              writeUp: p.writeUp,
              poemWriterComment: p.poemWriterComment,
              authorPic: p.user?.profile.picUrl,
              authorId: p.userId,
            } as Poetry)
          );
        }
        this.setState({ poems });
      })
      .catch((err) => console.log(err));
  };

  fetchData = () => {
    if (!hasLoginToken()) {
      this.props.history.push('/login');
    }

    this.setCategories();
    this.getPoems();
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps: ViewAllPoemsProps) {
    if (this.props.match.path !== prevProps.match.path) {
      this.fetchData();
    }
  }

  handleChange = (
    event: React.FormEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const value = event.currentTarget.value;
    const poemObjectForForm = { ...this.state.poemObjectForForm };
    poemObjectForForm[event.currentTarget.name as poetryFormField] = value;
    this.setState({ poemObjectForForm });
  };

  handleCreateModalToggle = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  handleCreateSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log(this.state);
    const { poemObjectForForm: poemToCreate } = this.state;
    const postData = {
      title: poemToCreate.title,
      category: poemToCreate.category,
      writeUp: poemToCreate.writeUp,
      poemWriterComment: poemToCreate.poemWriterComment,
    };

    const createPoem = () => {
      const API_URL = `${process.env.REACT_APP_API_URL}/poetry`;
      fetch(`${API_URL}`, {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token') || '',
        }),
      })
        .then((result) => result.json())
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            // instead of setting the state, go to a new component that displays either the new record and/or a success message
            const poetryId = response.data.id;
            this.setState({
              showModal: false,
              poemObjectForForm: PoetryDefaultObject,
            });
            this.props.history.push(`/poetry/${poetryId}`);
          } else {
            // let the user know something bad happened
            console.log('Poem was not created. Please try again later.');
          }
        });
    };
    createPoem();
  };

  handleSearch = (query: React.SyntheticEvent) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handleCategorySelect = (selectedCategory: any) => {
    this.setState({ selectedCategory, currentPage: 1 });
  };

  handleCreateClick = () => {
    this.setState({ showModal: true });
  };

  titleDisplay = () => {
    const path = this.props.match.path;
    if (path === '/poetry/mine') return <h3> My openMic Poems Page </h3>;
    else return <h3>openMic Poems Page</h3>;
  };

  handleclick = (poetryId: number) => {
    this.props.history.push(`/poetry/${poetryId}`);
  };

  render() {
    const {
      poems: allPoems,
      currentPage,
      pageSize,
      selectedCategory,
      searchQuery,
    } = this.state;

    let filtered = allPoems;
    if (searchQuery)
      filtered = allPoems.filter((p) =>
        p.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedCategory && selectedCategory.name) {
      //filtered = allPoems.filter((p) => p.category === selectedCategory.name);
      filtered =
        selectedCategory.name && selectedCategory.name !== 'All Poems'
          ? allPoems.filter((p) => p.category === selectedCategory.name)
          : allPoems;
    }

    const poems = Paginate(filtered, currentPage, pageSize);

    return (
      <React.Fragment>
        <div className="container">
          <Row className="my-3">
            <Col xs="3">
              <ListGroup
                items={this.state.categories}
                selectedItem={this.state.selectedCategory}
                onItemSelect={this.handleCategorySelect}
              />
            </Col>
            <Col>
              {this.titleDisplay()}
              {/* <h3 className="mb-3">openMic Poems Page</h3> */}
              <SearchBox
                placeHolder="Search..."
                value={this.state.searchQuery}
                onChange={this.handleSearch}
                name="query"
              />
              <Row className="my-3">
                <Col className="text-left">
                  Showing {poems.length} of {filtered.length} poems.
                </Col>
                <Col className="text-right">
                  <Button color="primary" onClick={this.handleCreateClick}>
                    Add a poem
                  </Button>
                </Col>
              </Row>
              {filtered.length === 0 && (
                <Alert color="info">
                  {' '}
                  <h1>There are no poems avaliable.</h1>{' '}
                </Alert>
              )}
              {poems.map((p: Poetry, i: number) => (
                <Card key={i} body className="poemCard p-0">
                  <CardBody
                    className="clickable text-left"
                    onClick={(e) => this.handleclick(p.id || 0)}
                  >
                    <CardTitle tag="h2" className="text-capitalize">
                      <Link to={`/poetry/${p.id}`}> {p.title} </Link>{' '}
                    </CardTitle>
                    <CardSubtitle
                      tag="h6"
                      className="mb-2 text-muted text-capitalize"
                    >
                      <small>By</small> {p.author}
                    </CardSubtitle>
                    <CardText className="comment-style">
                      {p.poemWriterComment}
                    </CardText>
                    <Badge
                      color="info"
                      pill
                      className="mb-2 p-2 text-uppercase"
                    >
                      {p.category}
                    </Badge>
                  </CardBody>
                  <CardFooter className="text-left bg-dark">
                    <Like poetryId={p.id || 0} />
                  </CardFooter>
                </Card>
              ))}
              <PagesPagination
                itemsCount={filtered.length}
                pageSize={this.state.pageSize}
                currentPage={this.state.currentPage}
                onPageChange={this.handlePageChange}
              />
            </Col>
          </Row>
        </div>
        <CreatePoem
          showModal={this.state.showModal}
          poem={this.state.poemObjectForForm}
          onToggle={this.handleCreateModalToggle}
          onSubmit={this.handleCreateSubmit}
          onChange={this.handleChange}
        />
      </React.Fragment>
    );
  }
}
export default ViewAllPoems;
