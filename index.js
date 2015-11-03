import React    from 'react'
import ReactDOM from'react-dom'
import Relay from 'react-relay'

class Item extends React.Component {
  render() {
    let item = this.props.store

    return (
      <div>
        <h1><a href={item.url}>{item.title}</a></h1>
        <h2>{item.score} - {item.by.id}</h2>
        <hr />
      </div>
    )
  }
};

Item = Relay.createContainer(Item, {
  fragments: {
    store: () => Relay.QL`
      fragment on HackerNewsItem {
        id,
        title,
        score,
        url,
        by {
          id
        }
      }
    `,
  },
});

class TopItems extends React.Component {
  render() {
    let items = this.props.store.topStories.map(
      (store, idx) => <Item store={store} key={idx} />
    );
    return <div>
      { items }
    </div>;
  }
}

TopItems = Relay.createContainer(TopItems, {
  fragments: {
    store: () => Relay.QL`
      fragment on HackerNewsAPI {
        topStories { ${Item.getFragment('store')} },
      }
    `,
  },
});

class HackerNewsRoute extends Relay.Route {
  static routeName = 'HackerNewsRoute';
  static queries = {
    store: ((Component) => {
      return Relay.QL`
      query root {
        hn { ${Component.getFragment('store')} },
      }
    `}),
  };
}

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('http://www.GraphQLHub.com/graphql')
);

let mountNode = document.getElementById('container');
let rootComponent = <Relay.RootContainer
  Component={TopItems}
  route={new HackerNewsRoute()} />;

ReactDOM.render(rootComponent, mountNode);
