import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Import style
import "./stylesheets/index.css";

//Import all components
const Landing = lazy(() => import("./components/Landing"));

const renderLoader = () => (
    <div className="spinner-container">
        <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    </div>
);

const App = () => (
    <div className="container">
        <Router>

            <Suspense fallback={renderLoader()}>
                <Switch>
                    <Route path="/" exact component={Landing} />
                </Switch>
            </Suspense>
            
        </Router>
    </div>
);

export default App;
