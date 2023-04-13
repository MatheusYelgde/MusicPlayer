import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';

class Pages extends Component {
  render() {
    return (
      <Switch>
        <div>
          <Route data-testid="page-login" exact path="/" component={ Login } />
        </div>
        <div>
          <Route data-testid="page-search" exact path="/search" component={ Search } />
        </div>
        <div>
          <Route data-testid="page-album" exact path="/album/:id" component={ Album } />
        </div>
        <div>
          <Route data-testid="page-favorites" exact path="/favorites" component={ Favorites } />
        </div>
        <div>
          <Route data-testid="page-profile" exact path="/profile" component={ Profile } />
        </div>
        <div>
          <Route data-testid="page-profile-edit" exact path="/profile/edit" component={ ProfileEdit } />
        </div>
        <div>
          <Route data-testid="page-not-found" exact path="*" component={ NotFound } />
        </div>
      </Switch>
    );
  }
}

export default Pages;
