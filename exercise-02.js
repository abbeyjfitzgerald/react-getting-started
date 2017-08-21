
const Card = (props) => {
  return (
    <div className="github-card clearfix">
      <img src={props.avatar_url} />
      <div className="github-profile">
        <div className="github-name"><a href={props.html_url} target="_blank">{props.name}</a></div>
        <div className="github-location">{props.location}</div>
      </div>
    </div>
  )
}

const CardList = (props) => {
  return (
    <div>
      {props.cards.map((card) => <Card key={card.id} {...card} />)}
    </div>
  )
}

class Form extends React.Component {
  state = { 
    userName: "stevemao"
  };
  handleSubmit = (event) => {
    // prevent the default form submit behavior
    event.preventDefault();
    // retrieve the Github user data
    axios.get(`https://api.github.com/users/${this.state.userName}`)
      .then(res => {
        this.props.addNewCard(res.data);
        this.setState({ userName: "" })
      })
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input 
          value={this.state.userName}
          onChange={(event) => {this.setState({userName: event.target.value})}}
          type="text"
          placeholder="Github username"
          required />
        <button type="submit">Add card</button>
      </form>
    );
  }
}

class App extends React.Component {
  state = {
    cards: []
  };
  addNewCard = (cardInfo) => {
    this.setState((prevState) => {
      return {cards: prevState.cards.concat(cardInfo)}
    });
  };
  render() {
    return (
      <div>
        <Form addNewCard={this.addNewCard} />
        <CardList cards={this.state.cards} />
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
